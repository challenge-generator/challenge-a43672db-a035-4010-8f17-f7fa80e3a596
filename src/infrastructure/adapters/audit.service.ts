import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AuditServicePort, AuditEvent, AccountAuditEvent, AccountAuditEventType } from '../../domain/ports/audit.service.port';
import { CircuitBreaker, CircuitBreakerConfig } from 'resilience4j-circuitbreaker';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuditService implements AuditServicePort, OnModuleInit {
  private readonly logger = new Logger(AuditService.name);
  private events: Map<string, AuditEvent> = new Map();
  private entityIndex: Map<string, Set<string>> = new Map();
  private userIndex: Map<string, Set<string>> = new Map();
  private circuitBreaker: CircuitBreaker;
  private auditTimeoutMs = 2000;

  onModuleInit() {
    const config = CircuitBreakerConfig.custom()
      .failureRateThreshold(50)
      .waitDurationInOpenState(30000)
      .slidingWindowSize(10)
      .minimumNumberOfCalls(5)
      .permittedNumberOfCallsInHalfOpenState(3)
      .automaticTransitionFromOpenToHalfOpenEnabled(true)
      .build();

    this.circuitBreaker = CircuitBreaker.of('auditService', config);
    this.circuitBreaker.subscribeToStateChange((state) => {
      this.logger.warn(`Audit Service CircuitBreaker state changed to: ${state.getState()}`);
    });

    this.logger.log('AuditService initialized with CircuitBreaker protection');
  }

  async logEvent(event: AuditEvent): Promise<void> {
    const wrappedLog = this.circuitBreaker.executeSupplier(async () => {
      return this.performLogEvent(event);
    });

    try {
      await wrappedLog;
    } catch (error) {
      this.logger.error(`CircuitBreaker rejected audit log: ${(error as Error).message}`);
      throw error;
    }
  }

  private async performLogEvent(event: AuditEvent): Promise<void> {
    const timeoutPromise = new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`Audit service timeout exceeded ${this.auditTimeoutMs}ms`));
      }, this.auditTimeoutMs);

      this.writeEvent(event)
        .then(() => {
          clearTimeout(timeoutId);
          resolve();
        })
        .catch((err) => {
          clearTimeout(timeoutId);
          reject(err);
        });
    });

    await timeoutPromise;
  }

  private async writeEvent(event: AuditEvent): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const eventWithTimestamp: AuditEvent = {
      ...event,
      timestamp: event.timestamp || new Date(),
      id: event.id || uuidv4(),
    };

    this.events.set(eventWithTimestamp.id, eventWithTimestamp);

    const entityKey = `${event.entityType}:${event.entityId}`;
    const entityEvents = this.entityIndex.get(entityKey) || new Set();
    entityEvents.add(eventWithTimestamp.id);
    this.entityIndex.set(entityKey, entityEvents);

    const userEvents = this.userIndex.get(event.userId) || new Set();
    userEvents.add(eventWithTimestamp.id);
    this.userIndex.set(event.userId, userEvents);

    this.logger.debug(`Audit event logged: ${eventWithTimestamp.id} - ${event.eventType}`);
  }

  async getEventsByEntity(entityType: string, entityId: string): Promise<AuditEvent[]> {
    const entityKey = `${entityType}:${entityId}`;
    const eventIds = this.entityIndex.get(entityKey);

    if (!eventIds) {
      this.logger.debug(`No events found for entity ${entityType}:${entityId}`);
      return [];
    }

    const events: AuditEvent[] = [];
    for (const id of eventIds) {
      const event = this.events.get(id);
      if (event) {
        events.push(event);
      }
    }

    this.logger.debug(`Found ${events.length} events for entity ${entityType}:${entityId}`);
    return events.sort((a, b) => {
      const dateA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
      const dateB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });
  }

  async getEventsByUser(userId: string): Promise<AuditEvent[]> {
    const eventIds = this.userIndex.get(userId);

    if (!eventIds) {
      this.logger.debug(`No events found for user ${userId}`);
      return [];
    }

    const events: AuditEvent[] = [];
    for (const id of eventIds) {
      const event = this.events.get(id);
      if (event) {
        events.push(event);
      }
    }

    this.logger.debug(`Found ${events.length} events for user ${userId}`);
    return events.sort((a, b) => {
      const dateA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp);
      const dateB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp);
      return dateB.getTime() - dateA.getTime();
    });
  }

  createAccountEvent(
    accountId: string,
    accountNumber: string,
    customerId: string,
    userId: string,
    eventType: AccountAuditEventType,
  ): AccountAuditEvent {
    return new AccountAuditEvent(
      uuidv4(),
      eventType,
      'ACCOUNT',
      accountId,
      customerId,
      userId,
      { accountNumber, accountId, customerId },
      new Date(),
    );
  }
}