# 01 · El problema que resuelve el tablero

## La situación

Una persona (o un equipo pequeño) anota sus tareas en cuadernos, mensajes o planillas. Con el tiempo:

- No se ve **qué está pendiente, qué se está haciendo y qué ya terminó**.
- Se empiezan **muchas cosas a la vez** y casi ninguna se termina.
- Tareas terminadas se modifican "por error" y se pierde el historial de lo que se hizo.

## La solución: un tablero Kanban

*Kanban* organiza el trabajo en **columnas** que representan el avance:

| Columna | Significado |
|---|---|
| **Por hacer** | Pendientes, aún sin iniciar |
| **En curso** | Se están trabajando ahora |
| **Hecha** | Terminadas |

Cada tarea es una **tarjeta** que se mueve de izquierda a derecha.

### Las reglas que dan valor al tablero

1. **Límite de trabajo en curso (WIP = 3):** como máximo 3 tareas en *En curso*. Obliga a terminar antes de empezar otra. La cuarta se rechaza con **409**.
2. **Movimiento de a un paso:** `POR_HACER → EN_CURSO → HECHA`, y se puede retroceder un paso. No se salta de *Por hacer* a *Hecha*.
3. **Una tarea hecha no se edita** (se puede devolver a *En curso* si hay que cambiarla).

## Qué construimos

| Pieza | Tecnología | Rol |
|---|---|---|
| Base de datos | PostgreSQL 18 + Flyway | Guarda las tareas |
| Backend | Java 21 + Spring Boot 3.5 (MVC en capas) | API REST y reglas de negocio |
| Frontend | Angular 21 (signals, sin librerías extra) | Tablero con arrastrar y soltar |

## Alcance

**Incluye:** crear, listar, editar, mover y eliminar tareas; límite de 3 en curso; validaciones; errores uniformes (`ApiError`).
**No incluye:** login, usuarios múltiples, etiquetas, orden manual dentro de la columna.

## Datos de una tarea

| Campo | Obligatorio | Regla |
|---|---|---|
| `titulo` | Sí | máx. 100 caracteres |
| `descripcion` | No | máx. 500 |
| `estado` | (lo asigna el sistema) | `POR_HACER`, `EN_CURSO`, `HECHA` |
| `prioridad` | Sí | `BAJA`, `MEDIA`, `ALTA` |
| `fechaLimite` | No | fecha (`LocalDate`) |
| `creadaEn`, `actualizadaEn` | (automáticas) | las maneja JPA |

## Puntos de decisión

- ¿Qué pasa al mover a la **misma** columna? → **409** (no es un movimiento).
- ¿Y al **retroceder** a *En curso* con 3 ya ocupadas? → **409** también: la regla del límite aplica a cualquier ingreso a esa columna.
