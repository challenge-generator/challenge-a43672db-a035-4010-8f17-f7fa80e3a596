import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
  audit: {
    timeoutMs: number;
    circuitBreaker: {
      failureThreshold: number;
      waitDurationInOpenStateMs: number;
      permittedNumberOfCallsInHalfOpenState: number;
    };
  };
  account: {
    idempotencyWindowHours: number;
    defaultInitialBalance: number;
  };
}

export const appConfig = registerAs('app', (): AppConfig => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'bank_user',
    password: process.env.DB_PASSWORD || 'bank_pass',
    name: process.env.DB_NAME || 'bank_accounts',
  },
  audit: {
    timeoutMs: parseInt(process.env.AUDIT_TIMEOUT_MS || '2000', 10),
    circuitBreaker: {
      failureThreshold: parseInt(process.env.CB_FAILURE_THRESHOLD || '5', 10),
      waitDurationInOpenStateMs: parseInt(process.env.CB_WAIT_DURATION_MS || '60000', 10),
      permittedNumberOfCallsInHalfOpenState: parseInt(process.env.CB_HALF_OPEN_CALLS || '3', 10),
    },
  },
  account: {
    idempotencyWindowHours: parseInt(process.env.IDEMPOTENCY_WINDOW_HOURS || '24', 10),
    defaultInitialBalance: parseFloat(process.env.DEFAULT_INITIAL_BALANCE || '0'),
  },
}));

export const AUDIT_TIMEOUT_MS = 2000;
export const IDEMPOTENCY_WINDOW_HOURS = 24;