# Implementación de Patrones GRASP en un Sistema de Gestión de Cuentas Bancarias

El sistema gestiona cuentas bancarias para un banco digital. Los actores involucrados son el 'cliente', el 'gestor de cuentas' y el'sistema de auditoría'. El sistema debe permitir la creación, modificación y consulta de cuentas, asegurando la consistencia de los datos y la trazabilidad de las operaciones. Los patrones GRASP a aplicar son 'Experto en Información' y 'Creador'. La operación de creación de cuenta debe ser idempotente con clave 'número de cuenta', permitiendo dos invocaciones con la misma clave producir un solo registro y devolver la misma respuesta dentro de 24 horas. El modo de falla específico es 'timeout del sistema de auditoría >2s'.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Aplicación de Patrones GRASP en el Desarrollo de Sistemas |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de Responsabilidades

**Objetivo:** Identificar y asignar responsabilidades a los componentes del sistema utilizando el patrón 'Experto en Información'.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el dominio del sistema de gestión de cuentas bancarias.
- Identifica las responsabilidades clave que deben ser asignadas a cada componente.
- Aplica el patrón 'Experto en Información' para asegurar que cada componente maneje la información que conoce mejor.

**Entregable:** Diagrama de componentes con responsabilidades asignadas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la cohesión y el acoplamiento al asignar responsabilidades.
- Piensa en cómo los componentes interactúan entre sí y con los actores del dominio.

</details>

### Fase 2: Implementación del Patrón Creador

**Objetivo:** Implementar el patrón 'Creador' para la gestión de la creación de cuentas bancarias.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Diseña la creación de cuentas utilizando el patrón 'Creador'.
- Asegura que la operación de creación de cuenta sea idempotente con clave 'número de cuenta'.
- Maneja el modo de falla específico 'timeout del sistema de auditoría >2s'.

**Entregable:** Implementación del patrón 'Creador' para la creación de cuentas.

<details>
<summary>Pistas de conocimiento</summary>

- Reflexiona sobre cómo manejar la idempotencia en la creación de cuentas.
- Considera las consecuencias de un timeout del sistema de auditoría en la creación de cuentas.

</details>

### Fase 3: Integración y Validación

**Objetivo:** Integrar los patrones aplicados y validar el sistema completo.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Integra los patrones 'Experto en Información' y 'Creador' en el sistema de gestión de cuentas bancarias.
- Realiza pruebas para validar la correcta aplicación de los patrones y el manejo de los edge cases identificados.
- Documenta las decisiones tomadas y los trade-offs considerados.

**Entregable:** Sistema integrado y validado con documentación de decisiones y trade-offs.

<details>
<summary>Pistas de conocimiento</summary>

- Verifica que los patrones aplicados cumplan con los requisitos del dominio.
- Documenta claramente las decisiones tomadas y los trade-offs considerados.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los patrones GRASP y cómo se aplican en el diseño de sistemas?
- **paraQueSirve**: ¿Para qué sirven los patrones 'Experto en Información' y 'Creador' en el contexto del sistema de gestión de cuentas bancarias?
- **comoSeUsa**: ¿Cómo se utiliza el patrón 'Creador' para manejar la idempotencia en la creación de cuentas?
- **erroresComunes**: ¿Cuáles son los errores comunes al aplicar los patrones GRASP y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la aplicación de los patrones GRASP en el diseño del sistema?

## Criterios de Evaluacion

- Identificación y asignación correcta de responsabilidades utilizando el patrón 'Experto en Información'.
- Implementación correcta del patrón 'Creador' para la gestión de la creación de cuentas.
- Manejo adecuado de la idempotencia y los modos de falla específicos.
- Integración y validación efectiva del sistema con documentación clara de decisiones y trade-offs.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
