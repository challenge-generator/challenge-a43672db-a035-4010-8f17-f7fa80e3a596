# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de Patrones GRASP en un Sistema de Gestión de Cuentas Bancarias**.

| | |
|---|---|
| Tema | Aplicación de Patrones GRASP en el Desarrollo de Sistemas |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 11 |
| Patron arquitectonico | hexagonal/clean con capas de dominio, aplicación e infraestructura |
| Tiempo estimado | 8 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.0`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @nestjs/core 11.0.0
- @nestjs/common 11.0.0
- @nestjs/platform-express 11.0.0
- typescript 5.7.0
- reflect-metadata 0.2.0
- rxjs 7.8.1
- @nestjs/swagger 7.4.0
- class-validator 0.14.0
- class-transformer 0.5.1
- jest 29.7.0
- @nestjs/testing 11.0.0
- supertest 6.3.3
- @nestjs/config 3.2.0
- resilience4j-circuitbreaker 2.1.0
- uuid 9.0.1

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición de Responsabilidades**: Diagrama de componentes con responsabilidades asignadas.
- **Fase 2 — Implementación del Patrón Creador**: Implementación del patrón 'Creador' para la creación de cuentas.
- **Fase 3 — Integración y Validación**: Sistema integrado y validado con documentación de decisiones y trade-offs.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (11)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/infrastructure/repositories/account.repository.ts` — `Account.get`
      Se invoca `get` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/account.repository.ts` — `Account.set`
      Se invoca `set` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/account.repository.ts` — `Account.push`
      Se invoca `push` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/repositories/account.repository.ts` — `Account.delete`
      Se invoca `delete` sobre `Account`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.set`
      Se invoca `set` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.get`
      Se invoca `get` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.push`
      Se invoca `push` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/adapters/audit.service.ts` — `AuditEvent.sort`
      Se invoca `sort` sobre `AuditEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/infrastructure/controllers/account.controller.ts` — `AuditServicePort.createAccountEvent`
      Se invoca `createAccountEvent` sobre `AuditServicePort`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `package.json` — `resilience4j-circuitbreaker@2.1.0`
      resilience4j-circuitbreaker declara la version 2.1.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- [ ] `package.json` — `typescript@5.7.0`
      typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

### Presentes (15)

- `package.json`
- `tsconfig.json`
- `src/main.ts`
- `src/domain/entities/account.entity.ts`
- `src/domain/ports/account.repository.port.ts`
- `src/domain/ports/audit.service.port.ts`
- `src/infrastructure/repositories/account.repository.ts`
- `src/infrastructure/adapters/audit.service.ts`
- `src/infrastructure/controllers/account.controller.ts`
- `src/infrastructure/config/app.config.ts`
- `src/app.module.ts`
- `src/application/use-cases/create-account.use-case.ts`
- `test/create-account.use-case.spec.ts`
- `test/account.controller.spec.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/domain`
- `src/domain/entities`
- `src/domain/ports`
- `src/application`
- `src/application/use-cases`
- `src/infrastructure`
- `src/infrastructure/repositories`
- `src/infrastructure/controllers`
- `src/infrastructure/adapters`
- `test`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **hexagonal/clean con capas de dominio, aplicación e infraestructura**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced
- Brecha que el reto ataca: Aplica al menos dos patrones GRASP (Patrones de Software para la Asignación de Responsabilidades Generales) en el diseño y desarrollo de un sistema. Entre ellos: Experto en Información, Creador, Controlador, Alta Cohesión y Bajo Acoplamiento, Polimorfismo, Fabricación Pura, Indirección y Variaciones Protegidas.
- Mision: Candidato con experiencia en desarrollo de sistemas backend.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
