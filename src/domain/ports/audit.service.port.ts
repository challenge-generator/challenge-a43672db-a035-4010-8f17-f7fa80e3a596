import { Account } from '../entities/account.entity';

export interface AuditEvent {
    eventId: string;
    eventType: string;
    entityType: string;
    entityId: string;
    timestamp: Date;
    details: Record<string, any>;
    userId?: string;
}

export interface AuditServicePort {
    logEvent(event: AuditEvent): Promise<void>;
    getEventsByEntity(entityType: string, entityId: string): Promise<AuditEvent[]>;
    getEventsByUser(userId: string): Promise<AuditEvent[]>;
}

// Eventos específicos para cuentas

export enum AccountAuditEventType {
    ACCOUNT_CREATED = 'ACCOUNT_CREATED',
    ACCOUNT_UPDATED = 'ACCOUNT_UPDATED',
    ACCOUNT_DEPOSIT = 'ACCOUNT_DEPOSIT',
    ACCOUNT_WITHDRAWAL = 'ACCOUNT_WITHDRAWAL',
    ACCOUNT_FROZEN = 'ACCOUNT_FROZEN',
    ACCOUNT_ACTIVATED = 'ACCOUNT_ACTIVATED',
    ACCOUNT_CLOSED = 'ACCOUNT_CLOSED'
}

export class AccountAuditEvent implements AuditEvent {
    eventId: string;
    eventType: string;
    entityType: string = 'Account';
    entityId: string;
    timestamp: Date;
    details: Record<string, any>;
    userId?: string;

    constructor(
        eventType: AccountAuditEventType,
        account: Account,
        details: Record<string, any> = {},
        userId?: string
    ) {
        this.eventId = uuidv4();
        this.eventType = eventType;
        this.entityId = account.id;
        this.timestamp = new Date();
        this.details = {
            accountNumber: account.accountNumber,
            customerId: account.customerId,
            ...details
        };
        this.userId = userId;
    }
}