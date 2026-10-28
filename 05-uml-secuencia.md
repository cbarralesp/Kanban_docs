# 05 · UML de secuencia

Cada diagrama muestra **quién llama a quién y en qué orden**.

## 1. Listar (cargar el tablero)

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant R as TareaRepository
    U->>P: abre /tablero
    P->>ST: cargar()
    ST->>C: GET /api/tareas
    C->>S: listar()
    S->>R: findAll(Sort id ASC)
    R-->>S: List<Tarea>
    S-->>C: List<TareaResponse>
    C-->>ST: 200 + JSON
    ST->>ST: tareas.set(...) → tareasPorEstado se recalcula
    ST-->>P: la vista se actualiza (3 columnas)
```

## 2. Crear

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant M as TareaMapper
    participant R as TareaRepository
    U->>P: "+ Nueva tarea" → completa el formulario
    P->>ST: crear(request)
    ST->>C: POST /api/tareas
    C->>C: @Valid CrearTareaRequest
    C->>S: crear(request)
    S->>M: aEntidad(request) (estado = POR_HACER)
    S->>R: save(tarea)
    R-->>S: Tarea con id
    S-->>C: TareaResponse
    C-->>ST: 201 Created + Location
    ST->>C: GET /api/tareas (refrescar)
    ST-->>P: emite → se cierra el formulario
```

## 3. Editar

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant R as TareaRepository
    U->>P: "Editar" en una tarjeta
    P->>ST: actualizar(id, request)
    ST->>C: PUT /api/tareas/{id}
    C->>S: actualizar(id, request)
    S->>R: findById(id)
    alt la tarea está HECHA
        S-->>C: TareaHechaNoEditableException
        C-->>ST: 409 ApiError
        ST-->>U: toast con el mensaje
    else se puede editar
        S->>R: save(tarea)
        S-->>C: TareaResponse
        C-->>ST: 200
    end
```

## 4. Mover entre columnas — camino feliz

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant R as TareaRepository
    U->>P: arrastra la tarjeta a "En curso" (o pulsa →)
    P->>ST: mover(id, EN_CURSO)
    ST->>C: PATCH /api/tareas/{id}/estado {"estado":"EN_CURSO"}
    C->>C: @Valid MoverTareaRequest
    C->>S: mover(id, EN_CURSO)
    S->>R: findById(id)
    S->>S: ¿|destino − origen| == 1? ✔
    S->>R: countByEstado(EN_CURSO) → 2 (< 3) ✔
    S->>R: save(tarea con estado EN_CURSO)
    S-->>C: TareaResponse
    C-->>ST: 200 OK
    ST->>C: GET /api/tareas (refrescar)
    ST-->>P: la tarjeta aparece en En curso
```

## 5. Mover — rechazo con 409 por límite de 3 en curso

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant R as TareaRepository
    participant H as GlobalExceptionHandler
    U->>P: arrastra una 4ª tarjeta a "En curso"
    P->>ST: mover(id, EN_CURSO)
    ST->>C: PATCH /api/tareas/{id}/estado
    C->>S: mover(id, EN_CURSO)
    S->>R: findById(id)
    S->>R: countByEstado(EN_CURSO) → 3
    S->>S: warn "in-progress limit reached"
    S-->>C: LimiteEnCursoExcedidoException
    C->>H: (Spring deriva la excepción)
    H-->>ST: 409 ApiError {mensaje: "La columna En curso ya tiene el máximo de 3 tareas…"}
    ST-->>U: toast de error; la tarjeta queda donde estaba
```

> El mismo camino (409) ocurre con `MovimientoInvalidoException` si se intenta saltar de `POR_HACER` a `HECHA`.

## 6. Eliminar

```mermaid
sequenceDiagram
    actor U as Usuario
    participant P as TableroPage
    participant D as ConfirmDialog
    participant ST as TareasStore
    participant C as TareaController
    participant S as TareaServiceImpl
    participant R as TareaRepository
    U->>P: "Eliminar"
    P->>D: muestra "¿Seguro…?"
    U->>D: confirma
    P->>ST: eliminar(id)
    ST->>C: DELETE /api/tareas/{id}
    C->>S: eliminar(id)
    S->>R: existsById(id) ✔
    S->>R: deleteById(id)
    C-->>ST: 204 No Content
    ST->>C: GET /api/tareas (refrescar)
```

## 7. Arranque del backend

```mermaid
sequenceDiagram
    participant J as JVM
    participant SB as Spring Boot
    participant F as Flyway
    participant DB as PostgreSQL
    participant H as Hibernate
    J->>SB: main() → KanbanApplication
    SB->>DB: abre conexión (DB_HOST, DB_USER…)
    SB->>F: migrate()
    F->>DB: V1 crear tabla tarea, V2 3 tareas de ejemplo
    SB->>H: ddl-auto: validate (¿la tabla coincide con Tarea?)
    SB->>SB: crea beans (controller, service, repository, mapper)
    SB-->>J: Tomcat escuchando en :8083
```
