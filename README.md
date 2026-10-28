# Kanban · Documentación

Documentación del proyecto **Tablero Kanban** · Java 21 · Spring Boot 3.5 · PostgreSQL 18 · Angular 21
IPSS · Desarrollo de Software II · Clase 03

> **Documento principal:** [GUIA-COMPLETA-PASO-A-PASO.md](GUIA-COMPLETA-PASO-A-PASO.md): el backend paso a paso, desde el proyecto base hasta probarlo todo en Swagger.

## Ruta de estudio

0. [00 · Casos de uso](00-casos-de-uso.md)
1. [01 · El problema](01-problema.md)
2. [02 · Teoría: MVC en capas](02-teoria-mvc.md)
3. [03 · Patrones de diseño](03-patrones-de-diseno.md)
4. [04 · UML de clases](04-uml-clases.md)
5. [05 · UML de secuencia](05-uml-secuencia.md)
6. [06 · Modelo de base de datos](06-modelo-base-de-datos.md)
7. [**Guía completa paso a paso del backend**](GUIA-COMPLETA-PASO-A-PASO.md)
8. [08 · Guía paso a paso de Angular](08-guia-angular-paso-a-paso.md)
9. [09 · Fundamentos de ingeniería de software](09-fundamentos-ingenieria-software.md)
10. [10 · Atlas de diagramas del Kanban](10-atlas-diagramas-kanban.md)
11. [11 · Git: cómo subir tu proyecto a tu repositorio](11-git-subir-proyecto-alumnos.md)

Presentación de la clase: [C3-Desarrollo-de-Software.pptx](C3-Desarrollo-de-Software.pptx).

## Repositorios del proyecto

| Repositorio | Contenido |
|---|---|
| [kanban_backend_base](https://github.com/cbarralesp/kanban_backend_base) | Backend en blanco con `TODO` para completar siguiendo la guía |
| [kanban-frontend](https://github.com/cbarralesp/kanban-frontend) | Frontend Angular 21 terminado |

## Regenerar las guías

Los bloques de código de las guías se generan desde los archivos reales del proyecto (requiere tener `kanban-backend` y `kanban-frontend` junto a esta carpeta):

```bash
node _build/build-guia.js           # genera las guías
node _build/build-guia.js --check   # verifica que coinciden con el código
```

> Los diagramas Mermaid se ven directamente en GitHub y en VS Code (extensión *Markdown Preview Mermaid Support*).
