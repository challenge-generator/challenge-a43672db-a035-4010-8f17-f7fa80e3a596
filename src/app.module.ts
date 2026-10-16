import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './infrastructure/config/app.config';
import { AccountRepositoryPort } from './domain/ports/account.repository.port';
import { AccountRepository } from './infrastructure/repositories/account.repository';
import { AuditServicePort } from './domain/ports/audit.service.port';
import { AuditService } from './infrastructure/adapters/audit.service';
import { CreateAccountUseCase } from './application/use-cases/create-account.use-case';
import { AccountController } from './infrastructure/controllers/account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: AccountRepositoryPort,
      useClass: AccountRepository,
    },
    {
      provide: AuditServicePort,
      useClass: AuditService,
    },
    CreateAccountUseCase,
  ],
  exports: [AccountRepositoryPort, AuditServicePort, CreateAccountUseCase],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const port = this.configService.get<number>('app.port') || 3000;
    console.log(`AppModule initialized - listening on port ${port}`);
  }
}