# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/infrastructure/repositories/account.repository.ts` — `Account.get`: Se invoca `get` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/account.repository.ts` — `Account.set`: Se invoca `set` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/account.repository.ts` — `Account.push`: Se invoca `push` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/repositories/account.repository.ts` — `Account.delete`: Se invoca `delete` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.set`: Se invoca `set` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.get`: Se invoca `get` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.push`: Se invoca `push` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.sort`: Se invoca `sort` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/infrastructure/controllers/account.controller.ts` — `AuditServicePort.createAccountEvent`: Se invoca `createAccountEvent` sobre `AuditServicePort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `resilience4j-circuitbreaker@2.1.0`: resilience4j-circuitbreaker declara la version 2.1.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced

### Brecha de conocimiento
Aplica al menos dos patrones GRASP (Patrones de Software para la Asignación de Responsabilidades Generales) en el diseño y desarrollo de un sistema. Entre ellos: Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas.

### Misión / candidato
Candidato con experiencia en desarrollo de sistemas backend.

### Reto
- Tema: Aplicación de Patrones GRASP en el Desarrollo de Sistemas
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de Patrones GRASP en un Sistema de Gestión de Cuentas Bancarias
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de Responsabilidades — objetivo: Identificar y asignar responsabilidades a los componentes del sistema utilizando el patrón 'Experto en Información'. — entregable (NO resolver): Diagrama de componentes con responsabilidades asignadas.
- Fase 2: Implementación del Patrón Creador — objetivo: Implementar el patrón 'Creador' para la gestión de la creación de cuentas bancarias. — entregable (NO resolver): Implementación del patrón 'Creador' para la creación de cuentas.
- Fase 3: Integración y Validación — objetivo: Integrar los patrones aplicados y validar el sistema completo. — entregable (NO resolver): Sistema integrado y validado con documentación de decisiones y trade-offs.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "bank-account-management",
  "version": "1.0.0",
  "description": "Sistema de gestión de cuentas bancarias con aplicación de patrones GRASP",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"src/**/*.ts\" \"test/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "11.0.0",
    "@nestjs/core": "11.0.0",
    "@nestjs/platform-express": "11.0.0",
    "@nestjs/config": "3.2.0",
    "@nestjs/swagger": "7.4.0",
    "reflect-metadata": "0.2.0",
    "rxjs": "7.8.1",
    "class-validator": "0.14.0",
    "class-transformer": "0.5.1",
    "resilience4j-circuitbreaker": "2.1.0",
    "uuid": "9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "11.0.0",
    "@types/jest": "29.5.12",
    "@types/node": "20.12.7",
    "@types/supertest": "2.0.16",
    "@typescript-eslint/eslint-plugin": "7.7.0",
    "@typescript-eslint/parser": "7.7.0",
    "eslint": "8.57.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-prettier": "5.1.3",
    "jest": "29.7.0",
    "prettier": "3.2.5",
    "supertest": "6.3.3",
    "ts-jest": "29.1.2",
    "ts-loader": "9.5.1",
    "ts-node": "10.9.2",
    "tsconfig-paths": "4.2.0",
    "typescript": "5.7.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "paths": {
      "@app/*": ["src/*"],
      "@test/*": ["test/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test"],
  "include": ["src/**/*.ts", "test/**/*.ts"]
}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Bank Account Management API')
    .setDescription('API para gestión de cuentas bancarias con patrones GRASP')
    .setVersion('1.0')
    .addTag('accounts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

// === ARCHIVO: src/domain/entities/account.entity.ts ===
import { v4 as uuidv4 } from 'uuid';
import { IsString, IsNumber, IsDate, IsUUID, IsEnum, Min, ValidateIf } from 'class-validator';

export enum AccountStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    FROZEN = 'FROZEN',
    CLOSED = 'CLOSED'
}

export enum AccountType {
    SAVINGS = 'SAVINGS',
    CHECKING = 'CHECKING',
    LOAN = 'LOAN',
    INVESTMENT = 'INVESTMENT'
}

export class Account {
    @IsUUID()
    id: string;

    @IsString()
    accountNumber: string;

    @IsString()
    customerId: string;

    @IsEnum(AccountType)
    type: AccountType;

    @IsNumber()
    @Min(0)
    balance: number;

    @IsEnum(AccountStatus)
    status: AccountStatus;

    @IsDate()
    createdAt: Date;

    @IsDate()
    @ValidateIf(o => o.updatedAt !== undefined)
    updatedAt?: Date;

    @IsString()
    currency: string;

    constructor(
        accountNumber: string,
        customerId: string,
        type: AccountType,
        initialBalance: number,
        status: AccountStatus = AccountStatus.ACTIVE,
        currency: string = 'USD'
    ) {
        this.id = uuidv4();
        this.accountNumber = accountNumber;
        this.customerId = customerId;
        this.type = type;
        this.balance = initialBalance;
        this.status = status;
        this.createdAt = new Date();
        this.currency = currency;
    }

    public deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        if (this.status !== AccountStatus.ACTIVE) {
            throw new Error('Account is not active');
        }
        this.balance += amount;
        this.updatedAt = new Date();
    }

    public withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (this.status !== AccountStatus.ACTIVE) {
            throw new Error('Account is not active');
        }
        if (this.balance < amount) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        this.updatedAt = new Date();
    }

    public freeze(): void {
        if (this.status === AccountStatus.CLOSED) {
            throw new Error('Cannot freeze a closed account');
        }
        this.status = AccountStatus.FROZEN;
        this.updatedAt = new Date();
    }

    public activate(): void {
        if (this.status === AccountStatus.CLOSED) {
            throw new Error('Cannot activate a closed account');
        }
        this.status = AccountStatus.ACTIVE;
        this.updatedAt = new Date();
    }

    public close(): void {
        if (this.balance !== 0) {
            throw new Error('Cannot close an account with non-zero balance');
        }
        this.status = AccountStatus.CLOSED;
        this.updatedAt = new Date();
    }
}

// === ARCHIVO: src/domain/ports/account.repository.port.ts ===
import { Account } from '../entities/account.entity';

export interface AccountRepositoryPort {
    create(account: Account): Promise<Account>;
    findById(id: string): Promise<Account | null>;
    findByAccountNumber(accountNumber: string): Promise<Account | null>;
    findByCustomerId(customerId: string): Promise<Account[]>;
    update(account: Account): Promise<Account>;
    delete(id: string): Promise<void>;
    existsByAccountNumber(accountNumber: string): Promise<boolean>;
}

// === ARCHIVO: src/domain/ports/audit.service.port.ts ===
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

// === ARCHIVO: src/infrastructure/repositories/account.repository.ts ===
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountRepository implements AccountRepositoryPort, OnModuleInit {
  private readonly logger = new Logger(AccountRepository.name);
  private accounts: Map<string, Account> = new Map();
  private accountNumberIndex: Map<string, string> = new Map();
  private customerIdIndex: Map<string, Set<string>> = new Map();

  onModuleInit() {
    this.logger.log('AccountRepository initialized with in-memory storage');
  }

  async create(account: Account): Promise<Account> {
    const existingAccount = this.accounts.get(account.id);
    if (existingAccount) {
      this.logger.warn(`Account with id ${account.id} already exists`);
      return existingAccount;
    }

    this.accounts.set(account.id, account);
    this.accountNumberIndex.set(account.accountNumber, account.id);

    const customerAccounts = this.customerIdIndex.get(account.customerId) || new Set();
    customerAccounts.add(account.id);
    this.customerIdIndex.set(account.customerId, customerAccounts);

    this.logger.log(`Account created: ${account.id} with number ${account.accountNumber}`);
    return account;
  }

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.get(id);
    if (!account) {
      this.logger.debug(`Account not found by id: ${id}`);
      return null;
    }
    return this.cloneAccount(account);
  }

  async findByAccountNumber(accountNumber: string): Promise<Account | null> {
    const accountId = this.accountNumberIndex.get(accountNumber);
    if (!accountId) {
      this.logger.debug(`Account not found by account number: ${accountNumber}`);
      return null;
    }
    const account = this.accounts.get(accountId);
    return account ? this.cloneAccount(account) : null;
  }

  async findByCustomerId(customerId: string): Promise<Account[]> {
    const accountIds = this.customerIdIndex.get(customerId);
    if (!accountIds) {
      this.logger.debug(`No accounts found for customer: ${customerId}`);
      return [];
    }
    const accounts: Account[] = [];
    for (const id of accountIds) {
      const account = this.accounts.get(id);
      if (account) {
        accounts.push(this.cloneAccount(account));
      }
    }
    this.logger.debug(`Found ${accounts.length} accounts for customer ${customerId}`);
    return accounts;
  }

  async update(account: Account): Promise<Account> {
    const existingAccount = this.accounts.get(account.id);
    if (!existingAccount) {
      this.logger.error(`Cannot update non-existent account: ${account.id}`);
      throw new Error(`Account with id ${account.id} not found`);
    }

    if (existingAccount.accountNumber !== account.accountNumber) {
      this.accountNumberIndex.delete(existingAccount.accountNumber);
      this.accountNumberIndex.set(account.accountNumber, account.id);
    }

    this.accounts.set(account.id, account);
    this.logger.log(`Account updated: ${account.id}`);
    return this.cloneAccount(account);
  }

  async delete(id: string): Promise<void> {
    const account = this.accounts.get(id);
    if (!account) {
      this.logger.warn(`Cannot delete non-existent account: ${id}`);
      return;
    }

    this.accountNumberIndex.delete(account.accountNumber);
    const customerAccounts = this.customerIdIndex.get(account.customerId);
    if (customerAccounts) {
      customerAccounts.delete(id);
      if (customerAccounts.size === 0) {
        this.customerIdIndex.delete(account.customerId);
      }
    }

    this.accounts.delete(id);
    this.logger.log(`Account deleted: ${id}`);
  }

  async existsByAccountNumber(accountNumber: string): Promise<boolean> {
    return this.accountNumberIndex.has(accountNumber);
  }

  private cloneAccount(account: Account): Account {
    return new Account(
      account.id,
      account.accountNumber,
      account.customerId,
      account.accountType,
      account.balance,
      account.status,
      account.createdAt,
      account.updatedAt,
    );
  }
}

// === ARCHIVO: src/infrastructure/adapters/audit.service.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/account.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { AuditServicePort, AccountAuditEventType } from '../../domain/ports/audit.service.port';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { CreateAccountDto, UpdateAccountStatusDto, AccountResponseDto } from './account.dto';
import { v4 as uuidv4 } from 'uuid';

@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(
    @Inject('AccountRepositoryPort')
    private readonly accountRepository: AccountRepositoryPort,
    @Inject('AuditServicePort')
    private readonly auditService: AuditServicePort,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new bank account', description: 'Creates a new bank account with idempotency support based on account number' })
  @ApiResponse({ status: 201, description: 'Account created successfully', type: AccountResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 409, description: 'Account with given account number already exists (idempotent)' })
  @ApiBody({ type: CreateAccountDto })
  async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountResponseDto> {
    this.logger.log(`Creating account for customer: ${createAccountDto.customerId}`);

    const existingAccount = await this.accountRepository.findByAccountNumber(createAccountDto.accountNumber);
    if (existingAccount) {
      this.logger.warn(`Account already exists with number: ${createAccountDto.accountNumber}`);
      return this.toResponseDto(existingAccount);
    }

    const now = new Date();
    const account = new Account(
      uuidv4(),
      createAccountDto.accountNumber,
      createAccountDto.customerId,
      createAccountDto.accountType || AccountType.CHECKING,
      createAccountDto.initialBalance || 0,
      AccountStatus.ACTIVE,
      now,
      now,
    );

    const createdAccount = await this.accountRepository.create(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        createdAccount.id,
        createdAccount.accountNumber,
        createdAccount.customerId,
        createAccountDto.userId || 'system',
        AccountAuditEventType.ACCOUNT_CREATED,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    this.logger.log(`Account created successfully: ${createdAccount.id}`);
    return this.toResponseDto(createdAccount);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by ID' })
  @ApiResponse({ status: 200, description: 'Account found', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async getAccountById(@Param('id') id: string): Promise<AccountResponseDto> {
    this.logger.debug(`Fetching account by id: ${id}`);
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return this.toResponseDto(account);
  }

  @Get('number/:accountNumber')
  @ApiOperation({ summary: 'Get account by account number' })
  @ApiResponse({ status: 200, description: 'Account found', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'accountNumber', description: 'Account number' })
  async getAccountByNumber(@Param('accountNumber') accountNumber: string): Promise<AccountResponseDto> {
    this.logger.debug(`Fetching account by number: ${accountNumber}`);
    const account = await this.accountRepository.findByAccountNumber(accountNumber);

    if (!account) {
      throw new NotFoundException(`Account with number ${accountNumber} not found`);
    }

    return this.toResponseDto(account);
  }

  @Get('customer/:customerId')
  @ApiOperation({ summary: 'Get all accounts for a customer' })
  @ApiResponse({ status: 200, description: 'List of accounts', type: [AccountResponseDto] })
  @ApiParam({ name: 'customerId', description: 'Customer UUID' })
  async getAccountsByCustomer(@Param('customerId') customerId: string): Promise<AccountResponseDto[]> {
    this.logger.debug(`Fetching accounts for customer: ${customerId}`);
    const accounts = await this.accountRepository.findByCustomerId(customerId);
    return accounts.map((account) => this.toResponseDto(account));
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update account status' })
  @ApiResponse({ status: 200, description: 'Account status updated', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  @ApiBody({ type: UpdateAccountStatusDto })
  async updateAccountStatus(
    @Param('id') id: string,
    @Body() updateDto: UpdateAccountStatusDto,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Updating status for account: ${id} to ${updateDto.status}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    switch (updateDto.status) {
      case AccountStatus.ACTIVE:
        account.activate();
        break;
      case AccountStatus.FROZEN:
        account.freeze();
        break;
      case AccountStatus.CLOSED:
        account.close();
        break;
      default:
        throw new BadRequestException(`Invalid status: ${updateDto.status}`);
    }

    const updatedAccount = await this.accountRepository.update(account);

    try {
      const eventType =
        updateDto.status === AccountStatus.ACTIVE
          ? AccountAuditEventType.ACCOUNT_ACTIVATED
          : updateDto.status === AccountStatus.FROZEN
            ? AccountAuditEventType.ACCOUNT_FROZEN
            : AccountAuditEventType.ACCOUNT_CLOSED;

      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        updateDto.userId || 'system',
        eventType,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Post(':id/deposit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deposit money into account' })
  @ApiResponse({ status: 200, description: 'Deposit successful', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async deposit(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @Body('userId') userId?: string,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Depositing ${amount} to account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new BadRequestException('Cannot deposit to a non-active account');
    }

    account.deposit(amount);
    const updatedAccount = await this.accountRepository.update(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        userId || 'system',
        AccountAuditEventType.DEPOSIT,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Post(':id/withdraw')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Withdraw money from account' })
  @ApiResponse({ status: 200, description: 'Withdrawal successful', type: AccountResponseDto })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiResponse({ status: 400, description: 'Insufficient funds or account not active' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async withdraw(
    @Param('id') id: string,
    @Body('amount') amount: number,
    @Body('userId') userId?: string,
  ): Promise<AccountResponseDto> {
    this.logger.log(`Withdrawing ${amount} from account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new BadRequestException('Cannot withdraw from a non-active account');
    }

    try {
      account.withdraw(amount);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }

    const updatedAccount = await this.accountRepository.update(account);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        updatedAccount.id,
        updatedAccount.accountNumber,
        updatedAccount.customerId,
        userId || 'system',
        AccountAuditEventType.WITHDRAWAL,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }

    return this.toResponseDto(updatedAccount);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an account' })
  @ApiResponse({ status: 204, description: 'Account deleted successfully' })
  @ApiResponse({ status: 404, description: 'Account not found' })
  @ApiParam({ name: 'id', description: 'Account UUID' })
  async deleteAccount(@Param('id') id: string, @Body('userId') userId?: string): Promise<void> {
    this.logger.log(`Deleting account: ${id}`);

    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    await this.accountRepository.delete(id);

    try {
      const auditEvent = this.auditService.createAccountEvent(
        id,
        account.accountNumber,
        account.customerId,
        userId || 'system',
        AccountAuditEventType.ACCOUNT_DELETED,
      );
      await this.auditService.logEvent(auditEvent);
    } catch (auditError) {
      this.logger.error(`Failed to log audit event: ${(auditError as Error).message}`);
    }
  }

  private toResponseDto(account: Account): AccountResponseDto {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      customerId: account.customerId,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    };
  }
}

// === ARCHIVO: src/infrastructure/config/app.config.ts ===
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

// === ARCHIVO: src/app.module.ts ===
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

// === ARCHIVO: src/application/use-cases/create-account.use-case.ts ===
import { Inject, Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Account, AccountStatus, AccountType } from '../../domain/entities/account.entity';
import { AccountRepositoryPort } from '../../domain/ports/account.repository.port';
import { AuditServicePort, AccountAuditEventType, AccountAuditEvent } from '../../domain/ports/audit.service.port';
import { appConfig, AUDIT_TIMEOUT_MS, IDEMPOTENCY_WINDOW_HOURS } from '../../infrastructure/config/app.config';

interface CreateAccountInput {
  customerId: string;
  accountType: AccountType;
  initialBalance?: number;
}

interface CreateAccountOutput {
  id: string;
  accountNumber: string;
  customerId: string;
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
  createdAt: Date;
}

@Injectable()
export class CreateAccountUseCase {
  private readonly logger = new Logger(CreateAccountUseCase.name);
  private readonly idempotencyCache = new Map<string, { output: CreateAccountOutput; expiresAt: Date }>();

  constructor(
    @Inject(AccountRepositoryPort)
    private readonly accountRepository: AccountRepositoryPort,
    @Inject(AuditServicePort)
    private readonly auditService: AuditServicePort,
    @Inject(appConfig.KEY)
    private readonly config: ConfigType<typeof appConfig>,
  ) {}

  async execute(input: CreateAccountInput, requestId: string): Promise<CreateAccountOutput> {
    const accountNumber = this.generateAccountNumber(input.customerId);
    const idempotencyKey = `${input.customerId}-${accountNumber}`;
    
    const cached = this.checkIdempotencyCache(idempotencyKey);
    if (cached) {
      this.logger.log(`Returning cached response for idempotency key: ${idempotencyKey}`);
      return cached;
    }

    const existingAccount = await this.accountRepository.findByAccountNumber(accountNumber);
    if (existingAccount) {
      this.logger.log(`Account already exists for customer ${input.customerId}, returning existing`);
      const output = this.mapToOutput(existingAccount);
      this.storeInIdempotencyCache(idempotencyKey, output);
      return output;
    }

    const initialBalance = input.initialBalance ?? this.config.account.defaultInitialBalance;
    const account = new Account(
      uuidv4(),
      accountNumber,
      input.customerId,
      input.accountType,
      initialBalance,
      AccountStatus.ACTIVE,
      new Date(),
      new Date(),
    );

    const createdAccount = await this.accountRepository.create(account);
    await this.logAccountCreation(createdAccount, requestId);

    const output = this.mapToOutput(createdAccount);
    this.storeInIdempotencyCache(idempotencyKey, output);
    
    this.logger.log(`Account created successfully: ${createdAccount.id} for customer ${input.customerId}`);
    return output;
  }

  private generateAccountNumber(customerId: string): string {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ACC-${customerId}-${timestamp}-${randomSuffix}`;
  }

  private checkIdempotencyCache(key: string): CreateAccountOutput | null {
    const cached = this.idempotencyCache.get(key);
    if (!cached) return null;
    
    if (new Date() > cached.expiresAt) {
      this.idempotencyCache.delete(key);
      return null;
    }
    return cached.output;
  }

  private storeInIdempotencyCache(key: string, output: CreateAccountOutput): void {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + this.config.account.idempotencyWindowHours);
    this.idempotencyCache.set(key, { output, expiresAt });
  }

  private async logAccountCreation(account: Account, requestId: string): Promise<void> {
    const auditEvent: AccountAuditEvent = {
      entityType: 'Account',
      entityId: account.id,
      eventType: AccountAuditEventType.ACCOUNT_CREATED,
      userId: account.customerId,
      timestamp: new Date(),
      metadata: {
        accountNumber: account.accountNumber,
        accountType: account.accountType,
        requestId,
      },
    };

    try {
      const timeoutPromise = new Promise<void>((_, reject) => 
        setTimeout(() => reject(new Error('Audit timeout')), AUDIT_TIMEOUT_MS)
      );
      await Promise.race([this.auditService.logEvent(auditEvent), timeoutPromise]);
    } catch (error) {
      this.logger.warn(`Failed to log audit event within ${AUDIT_TIMEOUT_MS}ms: ${error.message}`);
    }
  }

  private mapToOutput(account: Account): CreateAccountOutput {
    return {
      id: account.id,
      accountNumber: account.accountNumber,
      customerId: account.customerId,
      accountType: account.accountType,
      balance: account.balance,
      status: account.status,
      createdAt: account.createdAt,
    };
  }
}

// === ARCHIVO: test/create-account.use-case.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAccountUseCase } from '../src/application/use-cases/create-account.use-case';
import { AccountRepositoryPort } from '../src/domain/ports/account.repository.port';
import { AuditServicePort } from '../src/domain/ports/audit.service.port';
import { Account, AccountStatus, AccountType } from '../src/domain/entities/account.entity';
import { AccountAuditEventType } from '../src/domain/ports/audit.service.port';

describe('CreateAccountUseCase', () => {
  let useCase: CreateAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepositoryPort>;
  let auditService: jest.Mocked<AuditServicePort>;

  const mockAccountRepository = (): jest.Mocked<AccountRepositoryPort> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByAccountNumber: jest.fn(),
    findByCustomerId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    existsByAccountNumber: jest.fn(),
  });

  const mockAuditService = (): jest.Mocked<AuditServicePort> => ({
    logEvent: jest.fn(),
    getEventsByEntity: jest.fn(),
    getEventsByUser: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountUseCase,
        {
          provide: 'AccountRepositoryPort',
          useValue: mockAccountRepository(),
        },
        {
          provide: 'AuditServicePort',
          useValue: mockAuditService(),
        },
      ],
    }).compile();

    useCase = module.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = module.get('AccountRepositoryPort');
    auditService = module.get('AuditServicePort');
  });

  it('debe estar definido', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    const createAccountDto = {
      accountNumber: 'ACC-2024-001',
      customerId: 'CUST-123',
      accountType: AccountType.SAVINGS,
      initialBalance: 1000,
      ownerName: 'Juan Pérez',
    };

    it('debe crear una cuenta exitosamente cuando no existe', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockResolvedValue();

      const result = await useCase.execute(createAccountDto);

      expect(accountRepository.existsByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.create).toHaveBeenCalled();
      expect(auditService.logEvent).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.accountNumber).toBe(createAccountDto.accountNumber);
    });

    it('debe retornar cuenta existente cuando el número de cuenta ya existe (idempotencia)', async () => {
      const existingAccount: Account = {
        id: 'uuid-existing',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: 1000,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
        deposit: function(amount: number): void { this.balance += amount; },
        withdraw: function(amount: number): void { this.balance -= amount; },
        freeze: function(): void { this.status = AccountStatus.FROZEN; },
        activate: function(): void { this.status = AccountStatus.ACTIVE; },
        close: function(): void { this.status = AccountStatus.CLOSED; },
      };

      accountRepository.existsByAccountNumber.mockResolvedValue(true);
      accountRepository.findByAccountNumber.mockResolvedValue(existingAccount);

      const result = await useCase.execute(createAccountDto);

      expect(accountRepository.existsByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.findByAccountNumber).toHaveBeenCalledWith(createAccountDto.accountNumber);
      expect(accountRepository.create).not.toHaveBeenCalled();
      expect(result.id).toBe(existingAccount.id);
    });

    it('debe fallar cuando el balance inicial es negativo', async () => {
      const invalidDto = { ...createAccountDto, initialBalance: -100 };

      await expect(useCase.execute(invalidDto)).rejects.toThrow();
      expect(accountRepository.create).not.toHaveBeenCalled();
    });

    it('debe registrar evento de auditoría al crear cuenta', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockResolvedValue();

      await useCase.execute(createAccountDto);

      expect(auditService.logEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: AccountAuditEventType.ACCOUNT_CREATED,
          entityType: 'Account',
        })
      );
    });

    it('debe manejar timeout del sistema de auditoría gracefully', async () => {
      accountRepository.existsByAccountNumber.mockResolvedValue(false);
      accountRepository.create.mockResolvedValue({
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Account);
      auditService.logEvent.mockRejectedValue(new Error('Audit service timeout'));

      const result = await useCase.execute(createAccountDto);

      expect(result).toBeDefined();
    });
  });
});

// === ARCHIVO: test/account.controller.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AccountController } from '../src/infrastructure/controllers/account.controller';
import { CreateAccountUseCase } from '../src/application/use-cases/create-account.use-case';
import { Account, AccountStatus, AccountType } from '../src/domain/entities/account.entity';
import { AccountRepositoryPort } from '../src/domain/ports/account.repository.port';

describe('AccountController (e2e)', () => {
  let app: INestApplication;
  let createAccountUseCase: CreateAccountUseCase;
  let accountRepository: jest.Mocked<AccountRepositoryPort>;

  const mockCreateAccountUseCase = (): jest.Mocked<CreateAccountUseCase> => ({
    execute: jest.fn(),
  } as any);

  const mockAccountRepository = (): jest.Mocked<AccountRepositoryPort> => ({
    create: jest.fn(),
    findById: jest.fn(),
    findByAccountNumber: jest.fn(),
    findByCustomerId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    existsByAccountNumber: jest.fn(),
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: CreateAccountUseCase,
          useValue: mockCreateAccountUseCase(),
        },
        {
          provide: 'AccountRepositoryPort',
          useValue: mockAccountRepository(),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    await app.init();

    createAccountUseCase = moduleFixture.get<CreateAccountUseCase>(CreateAccountUseCase);
    accountRepository = moduleFixture.get<AccountRepositoryPort>('AccountRepositoryPort');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /accounts', () => {
    const createAccountDto = {
      accountNumber: 'ACC-2024-001',
      customerId: 'CUST-123',
      accountType: AccountType.SAVINGS,
      initialBalance: 1000,
      ownerName: 'Juan Pérez',
    };

    it('debe crear una cuenta exitosamente', async () => {
      const mockAccount: Account = {
        id: 'uuid-1',
        accountNumber: createAccountDto.accountNumber,
        customerId: createAccountDto.customerId,
        accountType: createAccountDto.accountType,
        balance: createAccountDto.initialBalance,
        status: AccountStatus.ACTIVE,
        ownerName: createAccountDto.ownerName,
        createdAt: new Date(),
        updatedAt: new Date(),
        deposit: function(amount: number): void { this.balance += amount; },
        withdraw: function(amount: number): void { this.balance -= amount; },
        freeze: function(): void { this.status = AccountStatus.FROZEN; },
        activate: function(): void { this.status = AccountStatus.ACTIVE; },
        close: function(): void { this.status = AccountStatus.CLOSED; },
      };

      (createAccountUseCase.execute as jest.Mock).mockResolvedValue(mockAccount);

      const response = await request(app.getHttpServer())
        .post('/accounts')
        .send(createAccountDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.accountNumber).toBe(createAccountDto.accountNumber);
    });

    it('debe retornar 400 cuando el DTO es inválido', async () => {
      const invalidDto = {
        accountNumber: '',
        customerId: '',
        accountType: 'INVALID_TYPE',
        initialBalance: -100,
        ownerName: '',
      };

      const response = await request(app.getHttpServer())
        .post('/accounts')
        .send(invalidDto)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('debe retornar 409 cuando la cuenta ya existe (idempotencia)', async () => {
      (createAccountUseCase.execute as jest.Mock).mockRejectedValue(
        new Error('Account with this accountNumber already exists')
      );

      await request(app.getHttpServer())
        .post('/accounts')
        .send(createAccountDto)
        .expect(409);
    });
  });

  describe('GET /accounts/:id', () => {
    it('debe obtener una cuenta por ID', async () => {
      const mockAccount: Account = {
        id: 'uuid-1',
        accountNumber: 'ACC-2024-001',
        customerId: 'CUST-123',
        accountType: AccountType.SAVINGS,
        balance: 1000,
        status: AccountStatus.ACTIVE,
        ownerName: 'Juan Pérez',
        createdAt: new Date(),
        updatedAt: new Date(),
        deposit: function(amount: number): void { this.balance += amount; },
        withdraw: function(amount: number): void { this.balance -= amount; },
        freeze: function(): void { this.status = AccountStatus.FROZEN; },
        activate: function(): void { this.status = AccountStatus.ACTIVE; },
        close: function(): void { this.status = AccountStatus.CLOSED; },
      };

      accountRepository.findById.mockResolvedValue(mockAccount);

      const response = await request(app.getHttpServer())
        .get('/accounts/uuid-1')
        .expect(200);

      expect(response.body.id).toBe('uuid-1');
    });

    it('debe retornar 404 cuando la cuenta no existe', async () => {
      accountRepository.findById.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/accounts/non-existent-id')
        .expect(404);
    });
  });

  describe('GET /accounts/customer/:customerId', () => {
    it('debe obtener cuentas por customerId', async () => {
      const mockAccounts: Account[] = [
        {
          id: 'uuid-1',
          accountNumber: 'ACC-2024-001',
          customerId: 'CUST-123',
          accountType: AccountType.SAVINGS,
          balance: 1000,
          status: AccountStatus.ACTIVE,
          ownerName: 'Juan Pérez',
          createdAt: new Date(),
          updatedAt: new Date(),
          deposit: function(amount: number): void { this.balance += amount; },
          withdraw: function(amount: number): void { this.balance -= amount; },
          freeze: function(): void { this.status = AccountStatus.FROZEN; },
          activate: function(): void { this.status = AccountStatus.ACTIVE; },
          close: function(): void { this.status = AccountStatus.CLOSED; },
        },
      ];

      accountRepository.findByCustomerId.mockResolvedValue(mockAccounts);

      const response = await request(app.getHttpServer())
        .get('/accounts/customer/CUST-123')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
    });
  });
});

// === ARCHIVO: README.md ===
# Bank Account Management

Sistema de gestión de cuentas bancarias desarrollado con NestJS aplicando patrones GRASP.

## Descripción

Este proyecto implementa un sistema de gestión de cuentas bancarias para un banco digital, aplicando los patrones GRASP "Experto en Información" y "Creador" para la asignación de responsabilidades.

### Características Principales

- Creación, modificación y consulta de cuentas bancarias
- Idempotencia en la creación de cuentas mediante número de cuenta
- Trazabilidad de operaciones con sistema de auditoría
- Manejo de fallos con Circuit Breaker (Resilience4j)
- API REST con documentación Swagger

## Requisitos Previos

- Node.js 22.x
- npm 10.x

## Instalación

```bash
npm install
```

## Compilación

```bash
npm run build
```

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## Pruebas

### Unitarias

```bash
npm test
```

### Con Coverage

```bash
npm run test:cov
```

### E2E

```bash
npm run test:e2e
```

## Estructura del Proyecto

```
bank-account-management/
├── src/
│   ├── main.ts                      # Punto de entrada
│   ├── app.module.ts                # Módulo raíz
│   ├── domain/
│   │   ├── entities/                # Entidades del dominio
│   │   │   └── account.entity.ts
│   │   └── ports/                   # Contratos (puertos)
│   │       ├── account.repository.port.ts
│   │       └── audit.service.port.ts
│   ├── application/
│   │   └── use-cases/               # Casos de uso
│   │       └── create-account.use-case.ts
│   ├── infrastructure/
│   │   ├── controllers/             # Adaptadores (controladores REST)
│   │   │   └── account.controller.ts
│   │   ├── repositories/            # Implementaciones de repositorio
│   │   │   └── account.repository.ts
│   │   ├── adapters/                # Implementaciones de servicios
│   │   │   └── audit.service.ts
│   │   └── config/                  # Configuración
│   │       └── app.config.ts
│   └── common/                      # Utilidades compartidas
├── test/                            # Pruebas
├── package.json
├── tsconfig.json
└── README.md
```

## API Documentation

Una vez iniciada la aplicación, la documentación Swagger está disponible en:

```
http://localhost:3000/api
```

## Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | /accounts | Crear cuenta bancaria |
| GET | /accounts/:id | Obtener cuenta por ID |
| GET | /accounts/customer/:customerId | Obtener cuentas por cliente |
| PATCH | /accounts/:id/deposit | Depositar fondos |
| PATCH | /accounts/:id/withdraw | Retirar fondos |
| PATCH | /accounts/:id/freeze | Congelar cuenta |
| PATCH | /accounts/:id/activate | Activar cuenta |

## Configuración

Las variables de entorno se configuran en `src/infrastructure/config/app.config.ts`.

### Variables Disponibles

- `PORT`: Puerto de la aplicación (default: 3000)
- `AUDIT_TIMEOUT`: Timeout del sistema de auditoría en ms (default: 2000)

## Patrones GRASP Aplicados

### Experto en Información

La responsabilidad de crear y gestionar la información de una cuenta recae en la clase `Account`, que es la única que conoce todos los detalles de su estado.

### Creador

La clase `CreateAccountUseCase` es responsable de instanciar nuevas cuentas, delegando la creación al repositorio correspondiente.

## Errores Comunes

1. **Timeout de auditoría**: El sistema de auditoría tiene un timeout de 2 segundos. Si se supera, se maneja gracefully sin fallar la operación principal.

2. **Cuentas duplicadas**: La operación de creación es idempotente. Si se intenta crear una cuenta con un número existente, se retorna la cuenta existente.

## Decisiones de Diseño y Trade-offs

- **Arquitectura Hexagonal**: Separación estricta entre dominio, aplicación e infraestructura para facilitar el testing y evolución del sistema.

- **Circuit Breaker**: Protege el sistema de fallos en cascada cuando el servicio de auditoría no responde.

- **Idempotencia**: Implementada mediante clave de número de cuenta, permitiendo reintentos seguros sin duplicados.
```
