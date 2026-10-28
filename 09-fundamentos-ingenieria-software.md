# 09 · Fundamentos de ingeniería de software aplicados al Kanban

Versión ampliada del 26-10-2026. Acompaña `presentaciones/04-Clase-03-Ingenieria-Software-Diagramas.pptx`.

## Cómo usar el material

Esta presentación es un banco docente, no cuarenta diapositivas para leer en una sola sesión. Para clase 3 priorizar 1–6, 11–20, 27, 29–31 y 37–38. Usar metodología, arquitectura futura y cloud en sesiones posteriores. Los diagramas actuales describen el proyecto revisado. Las propuestas están rotuladas. Los objetos de los diagramas son editables en PowerPoint.

## Base y criterio de construcción

Se revisaron las dos PPT originales de clase 2, los documentos 00–06 de clase 3, y la implementación de Controller, Service, Repository, DTOs, Entity y SQL del Kanban. Se contrastaron conceptos con referencias primarias de UML/OMG, C4, Scrum, Kanban, Spring, PostgreSQL y patrones de aplicación. El criterio es trazabilidad: necesidad, aceptación, modelo, implementación y evidencia. Las simplificaciones que podían confundir se aclaran expresamente.

## 1. Ingeniería de software aplicada

Esta presentación amplía la clase 3 usando la secuencia didáctica de las dos PPT originales de clase 2. El objetivo es explicar qué decisiones preceden al código y qué evidencias permiten confiar en el resultado. Los diagramas de estado actual corresponden al Kanban revisado. Los de arquitectura futura, despliegue y organización del equipo son propuestas, no funciones instaladas. Usar las notas como guion y abrir el código para seguir los ejemplos.

Fuente: https://swebokwiki.org/Main_Page

## 2. Qué significa un buen resultado

- **Valor**: Resuelve una necesidad verificable del usuario.
- **Corrección**: Cumple reglas incluso cuando una entrada falla.
- **Mantenibilidad**: Permite cambiar una regla con impacto controlado.
- **Operación**: Puede desplegarse, observarse y recuperarse.

El software no se evalúa solo porque compila. Separar calidad funcional y atributos de calidad. En Kanban, impedir la cuarta tarea es una regla, explicar un 409 es una cualidad del contrato y recuperar la base es una capacidad operativa. Pedir al grupo una evidencia por dimensión. No inventar objetivos de disponibilidad o rendimiento: se acuerdan con los interesados y se miden en un entorno definido.

Fuente: https://swebokwiki.org/Main_Page

## 3. Cómo se construye con evidencia

- Problema
- Criterios
- Modelos
- Código
- Pruebas

Este flujo es iterativo. El problema define quién necesita qué. Los criterios concretan comportamientos. Los modelos permiten revisar decisiones antes de programar. El código implementa y las pruebas buscan diferencias con lo esperado. La operación y la retroalimentación originan nuevos cambios. No es una cascada rígida ni exige completar todos los diagramas antes de empezar. Ejemplo: una carrera detectada en pruebas obliga a revisar la transacción y el diseño de persistencia.

Fuente: https://swebokwiki.org/Main_Page

## 4. Requisitos y alcance del Kanban

- **Tipo**: Ejemplo — Evidencia
- **Funcional**: Crear y mover una tarea — Petición y respuesta HTTP
- **Regla**: Máximo tres en curso — Rechazo de la cuarta
- **Restricción**: Java 21 y PostgreSQL — Entorno reproducible
- **Fuera de alcance actual**: Login y múltiples tableros — Declaración explícita

Distinguir una necesidad de una solución técnica. Java 21 es una restricción del curso, no una necesidad del usuario del tablero. El alcance original excluye login, múltiples usuarios y orden manual de las tarjetas. Cambiar esas fronteras exige historias nuevas. La aplicación muestra tareas, pero no conserva un historial completo de transiciones. No confundir creadaEn y actualizadaEn con una bitácora de cambios. Base: docs/01-problema.md y código del backend.

Fuente: https://swebokwiki.org/Main_Page

## 5. Atributos de calidad medibles

- **Atributo**: Pregunta de diseño — Cómo comprobarlo
- **Integridad**: ¿Se respeta el cupo simultáneo? — Prueba concurrente en PostgreSQL
- **Seguridad**: ¿Quién puede editar esta tarea? — Prueba de autorización por recurso
- **Rendimiento**: ¿Qué carga debe soportar? — Carga y percentiles acordados
- **Recuperación**: ¿Podemos restaurar los datos? — Ensayo de restauración

La frase debe ser rápido es insuficiente. Definir escenario, carga, entorno, medida y umbral con el interesado. Los objetivos numéricos se acuerdan, no se deducen del framework. En esta clase el riesgo más concreto es integridad concurrente. Para uso público también falta autorización. Enseñar que un atributo de calidad influye en arquitectura: una regla global puede requerir coordinación entre transacciones, aunque el endpoint sea pequeño.

Fuente: https://swebokwiki.org/Main_Page

## 6. Trazabilidad de una regla

Seguir un requisito hasta la verificación evita que el diseño quede desconectado. Regla R-03: no admitir la cuarta tarea. Criterio: con tres en curso, un ingreso devuelve 409 y no modifica estado. Modelo: transición con guarda. Código: TareaServiceImpl.mover y countByEstado. Prueba: rechazaLaCuartaTareaEnCurso. El test existente comprueba la regla secuencial mediante mocks. La garantía concurrente sigue pendiente y debe tener otra prueba.

## 7. Agile, Scrum y Kanban

- **Concepto**: Aporta — Aplicación al curso
- **Agile**: Valores de colaboración y adaptación — Entregas pequeñas con feedback
- **Scrum**: Objetivo y ciclo de inspección — Simulación de un Sprint
- **Kanban**: Gestión del flujo y del WIP — Políticas de columnas y límites
- **Prácticas técnicas**: Calidad de implementación — PR, pruebas y CI

No son alternativas equivalentes: Agile expresa valores, Scrum un marco y Kanban una estrategia de gestión de flujo. Pueden combinarse con prácticas técnicas. El tablero visual por sí solo no demuestra agilidad. Ejercicio: elegir una historia que pueda terminarse y mostrarse. Aceptar cambios informados sin perder el objetivo. Si el calendario obliga a omitir partes de Scrum, llamar a la práctica adaptación didáctica.

Fuente: https://agilemanifesto.org/iso/es/manifesto.html

## 8. Un Sprint en el aula

Propuesta didáctica: Sprint de una semana con objetivo concreto, por ejemplo mover tareas con rechazos comprensibles. Planning acuerda objetivo y trabajo, los Developers inspeccionan avance, Review obtiene feedback del incremento y Retrospectiva propone una mejora. Product Owner ordena valor y Scrum Master ayuda a la efectividad del marco. No usar al Scrum Master como jefe de tareas. Product Backlog, Sprint Backlog e Increment tienen compromisos asociados.

Fuente: https://scrumguides.org/scrum-guide.html

## 9. Políticas de trabajo del equipo

El tablero del equipo puede tener Por hacer, En desarrollo, Revisión y Terminado. Es una propuesta de proceso, distinta de los tres estados del producto Kanban. Definir cómo entra y sale una tarea, límites de trabajo y tratamiento de bloqueos. La columna de revisión debe tener capacidad y responsable. Una tarea con código escrito pero sin pruebas o revisión no satisface la Definition of Done. Medir tiempo de ciclo y antigüedad, no productividad por líneas de código.

Fuente: https://kanbanguides.org/the-kanban-guide/2025.5/

## 10. Colaboración y Definition of Done

- Historia
- Rama
- Pull Request
- Revisión
- Integración

Propuesta: una historia pequeña por rama, commits descriptivos y PR con motivo y verificación. DoD del curso: criterios satisfechos, pruebas verdes, revisión de un compañero, migración nueva si cambia esquema y configuración sin secretos. Los criterios pertenecen a la historia, mientras la DoD es transversal. Una aprobación automática no reemplaza revisar reglas ni seguridad. Los desarrolladores siguen siendo responsables de código generado con IA.

## 11. Qué diagrama responde cada pregunta

- **Pregunta**: Diagrama — Decisión que permite revisar
- **¿Quién usa qué?**: Casos de uso y contexto — Alcance y actores
- **¿Qué piezas colaboran?**: Contenedores y clases — Responsabilidades y dependencias
- **¿Qué ocurre y en qué orden?**: Secuencia y estados — Mensajes, reglas y excepciones
- **¿Qué se guarda y dónde corre?**: Modelo de datos y despliegue — Integridad y operación

No se trata de dibujar por cumplir. Escoger el mínimo modelo que aclare una decisión. UML ofrece notaciones de comportamiento y estructura. C4 permite distintos niveles de zoom arquitectónico. El diagrama de datos representa persistencia y el de despliegue ubica unidades ejecutables. Un contenedor C4 no significa necesariamente Docker. Para clase 3 son centrales capas, estados, secuencia y tabla tarea.

Fuente: https://c4model.com/diagrams

## 12. Casos de uso del tablero

Estado actual. El actor Usuario interactúa con objetivos de listar, crear, editar, mover y eliminar. Las líneas expresan participación, no orden temporal. El rectángulo delimita el sistema. Las validaciones y rechazos se documentan como pasos o flujos alternativos en este nivel. include y extend tienen semántica UML precisa: no toda validación merece otro óvalo y no todo error es una extensión. Confirmar borrado puede ser una interacción de interfaz dentro del caso de uso.

Fuente: https://www.omg.org/spec/UML/2.5.1

## 13. Contexto del sistema

Vista de contexto inspirada en C4. El sistema en alcance es el Tablero Kanban completo y el usuario está fuera. No incluir clases Java ni PostgreSQL como sistema externo si la base forma parte de este producto. La vista responde quién obtiene valor y cuál es la frontera. En el estado actual no hay servicios externos obligatorios para el negocio. Swagger es una herramienta cliente de prueba, no un actor de negocio adicional.

Fuente: https://c4model.com/diagrams

## 14. Contenedores del sistema actual

Vista de contenedores inspirada en C4: Angular ejecuta la interfaz en el navegador, Spring Boot ofrece API REST y PostgreSQL persiste. Las conexiones llevan tecnología y propósito. El proxy de desarrollo sirve /api hacia el puerto 8083. No mezclar un componente como TareaService con estos contenedores, porque pertenece al siguiente nivel de zoom. La ubicación productiva aún no está definida por tener estos proyectos locales.

Fuente: https://c4model.com/diagrams

## 15. Arquitectura por capas del Kanban

Estado actual validado en los paquetes. Controller usa TareaService, implementado por TareaServiceImpl. El service coordina repository y mapper. Repository opera sobre entidades mediante JPA y PostgreSQL. DTO representa contrato y Entity persistencia. La Entity no es un proceso colocado entre repository y base: es un objeto que participa en el mapeo. El diseño puede permitir reglas dentro de entidades en un modelo rico, aunque este ejercicio las concentra en el service.

## 16. UML de clases: colaboraciones principales

Diagrama parcial del código actual. Una asociación indica una referencia mantenida a un colaborador. Una realización une TareaServiceImpl con el contrato TareaService. TareaRepository extiende JpaRepository y el framework aporta la implementación. TareaMapper transforma entidades y DTOs. Las flechas no representan secuencia temporal. Se omiten getters, setters y operaciones que no ayudan a entender mover. El triángulo hueco convencional se explica en la leyenda y los vínculos se etiquetan para evitar ambigüedad.

Fuente: https://www.omg.org/spec/UML/2.5.1

## 17. Modelo persistente actual

La base actual tiene una tabla de negocio: tarea. Se muestran todos sus campos. id es clave primaria autogenerada, estado y prioridad tienen CHECK, titulo no admite nulo y existe índice sobre estado. fecha_limite es opcional. Los timestamps no almacenan historia de cambios. Un CHECK de valores permitidos no garantiza que el total en EN_CURSO sea tres. No inventar relaciones con usuario o tablero inexistentes.

## 18. Estados y guardas de transición

Estado actual. Una transición representa un cambio permitido y la guarda una condición adicional. Todo ingreso a EN_CURSO exige cupo, incluso desde HECHA. Las cuatro transiciones son POR_HACER a EN_CURSO, EN_CURSO a POR_HACER, EN_CURSO a HECHA y HECHA a EN_CURSO. Crear asigna POR_HACER. Misma columna y salto de dos columnas se rechazan. Una tarea HECHA puede reabrirse y después editarse. El cupo concurrente requiere protección adicional.

Fuente: https://www.omg.org/spec/UML/2.5.1

## 19. Secuencia: movimiento aceptado

Camino exitoso simplificado para un ingreso a EN_CURSO. Controller valida y llama al service. Service obtiene tarea, valida transición, consulta cupo, cambia estado y guarda. Mapper prepara respuesta. La infraestructura transaccional coordina flush y commit antes del retorno exitoso al cliente, aunque save no necesariamente ejecute SQL en ese instante. Se agrupan JPA y PostgreSQL como persistencia para mantener legibilidad. Precondición: cupo disponible y tarea existente.

Fuente: https://www.omg.org/spec/UML/2.5.1

## 20. Secuencia: rechazo y respuesta 409

Cuando countByEstado devuelve tres, service lanza LimiteEnCursoExcedidoException sin llamar a save. Spring MVC resuelve la excepción mediante GlobalExceptionHandler, que construye ApiError y respuesta 409. El controller no llama manualmente al handler. Esta distinción corrige una simplificación frecuente en diagramas. El cliente muestra la causa y mantiene o recupera el estado del servidor. Los tests comprueban que la escritura no ocurre.

Fuente: https://www.omg.org/spec/UML/2.5.1

## 21. Arquitecturas y criterios de elección

- **Diseño**: Cuándo aporta — Costo o límite
- **Capas**: CRUD y reglas acotadas — Puede acoplar negocio a JPA
- **Monolito modular**: Varias funciones con límites claros — Exige disciplina entre módulos
- **Puertos y adaptadores**: Aislar dominio e integraciones — Más contratos y mapeos
- **Microservicios**: Autonomía de equipos y despliegue — Red, observabilidad y consistencia

Arquitectura no se elige por prestigio ni por una plantilla universal. El Kanban actual puede seguir como monolito en capas. Si aparecen integraciones reemplazables y reglas complejas, estudiar puertos y adaptadores. Monolito modular y hexagonal pueden combinarse. Microservicios no son el paso obligatorio siguiente: introducen costos operativos y distribuyen transacciones. La elección se argumenta con requisitos, riesgos, capacidad del equipo y reversibilidad.

Fuente: https://alistair.cockburn.us/hexagonal-architecture

## 22. Puertos y adaptadores: evolución posible

Propuesta, no estructura presente. El núcleo contiene caso de uso y política de transiciones. El adaptador HTTP invoca un puerto de entrada. El caso de uso depende de un puerto de repositorio definido hacia el núcleo y un adaptador JPA lo implementa. Las dependencias de código se orientan hacia contratos internos, mientras el flujo de ejecución puede salir hacia infraestructura. Una figura hexagonal no demuestra desacoplamiento: importaciones y pruebas deben confirmarlo.

Fuente: https://alistair.cockburn.us/hexagonal-architecture

## 23. Una decisión de arquitectura documentada

- **Contexto**: Una API pequeña, un equipo y PostgreSQL.
- **Decisión**: Mantener capas y aislar la política de transición.
- **Alternativas**: Hexagonal completa o servicios separados.
- **Consecuencia**: Menor costo inicial y un límite claro para evolucionar.

Ejemplo de ADR propuesto. Registrar fecha, estado, contexto, decisión, alternativas y consecuencias. No se debe escribir un documento largo para cada detalle. La decisión importante aquí es evitar complejidad sin renunciar a separar la regla volátil. Condición para revisarla: varias entradas o integraciones que dupliquen lógica y dificulten probar. Pedir al estudiante defender una alternativa y reconocer al menos una desventaja de la elegida.

## 24. Patrones presentes en el código

- **Patrón**: Ubicación — Problema que resuelve
- **Service Layer**: TareaServiceImpl — Coordinar operaciones y reglas
- **Repository**: TareaRepository — Concentrar acceso a datos
- **DTO**: Requests y TareaResponse — Definir datos intercambiados
- **Mapper**: TareaMapper — Transformar representaciones

Distinguir patrones de arquitectura, patrones de aplicación y mecanismos del framework. Service Layer define una frontera de operaciones. Repository centraliza persistencia. DTO define datos transportados, aquí también estabiliza el contrato. Mapper evita repetir conversiones. No confundir el mapper manual DTO-Entity con toda la implementación del patrón Data Mapper del ORM. Un patrón se justifica por el problema que resuelve, no por contar cuántos aparecen.

Fuente: https://martinfowler.com/eaaCatalog/index.html

## 25. Patrones que podrían aportar después

- **Patrón**: Escenario futuro — Evitar aplicarlo cuando…
- **Strategy**: Políticas de cupo por tipo de tablero — Solo hay una regla estable
- **State**: Estados con comportamiento complejo — Un enum y switch son suficientes
- **Adapter**: Notificaciones o persistencia externa — La integración ya es simple
- **Observer / eventos**: Reacciones desacopladas al movimiento — Se requiere consistencia inmediata

Estos son candidatos, no patrones que ya implemente el proyecto. Una política pequeña no necesita una clase por estado. Strategy sirve cuando hay algoritmos intercambiables por una razón real. Adapter traduce un contrato externo. Eventos desacoplan reacciones, pero obligan a pensar en fallos, duplicados y momento de publicación. Actividad: escoger una necesidad futura y argumentar un patrón o justificar no usarlo.

## 26. Inyección de dependencias y contrato

Spring crea y conecta objetos administrados. El constructor hace visibles las dependencias. Controller depende del contrato TareaService y recibe la implementación. El alcance singleton de Spring es por definición de bean y contenedor, no necesariamente uno por toda la JVM ni garantía de thread safety. Mantener services sin estado mutable de cada solicitud. Los mocks son útiles, pero una interfaz no es obligatoria para Mockito ni un mock prueba automáticamente Liskov.

Fuente: https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html

## 27. Clean code: intención antes que brevedad

El fragmento actual usa ordinal para deducir vecindad. Es breve pero acopla la regla al orden de declaración. La propuesta expresa explícitamente las transiciones. Debe conservar comportamiento y venir acompañada por los nueve pares de estados. Clean code también incluye nombres del dominio, errores útiles y dependencia clara. No imponer números arbitrarios de líneas ni extraer métodos que oculten la lógica. La refactorización propuesta no se aplicó al backend.

## 28. SOLID como preguntas de revisión

- **Principio**: Pregunta útil — Aplicación
- **S**: ¿Por qué razones cambia esta clase? — HTTP separado de negocio
- **O**: ¿Una regla nueva exige editar todo? — Política aislada si varía
- **L**: ¿La sustitución conserva el contrato? — Mismos resultados y errores
- **I / D**: ¿Qué necesita y de qué depende? — Contratos acotados al uso

SRP trata de razones de cambio, no de que una clase tenga un solo método. OCP se evalúa respecto a cambios previsibles, no significa nunca modificar código. LSP exige contratos de comportamiento, no basta compilar un mock. ISP evita forzar dependencias innecesarias. DIP orienta dependencias hacia abstracciones adecuadas; inyección por constructor es un mecanismo que ayuda, pero no demuestra todo el principio. Pedir un contraejemplo por equipo.

## 29. Validación, dominio y errores HTTP

- **Situación**: Responsable — Respuesta
- **Título vacío o JSON ilegible**: DTO y capa web — 400
- **Id inexistente**: Service y handler — 404
- **Columna llena o transición inválida**: Regla de negocio y handler — 409
- **Fallo inesperado**: Handler y observabilidad — 500 sin detalles internos

Validar también en servidor. Angular puede mejorar experiencia, pero un cliente directo puede omitirlo. CrearTareaRequest no acepta estado y el mapper fija POR_HACER. Una Entity podría llevar restricciones y comportamiento, aunque el ejemplo use DTOs para entrada. El record tiene accesores como titulo(), no getters getTitulo(), y su inmutabilidad es superficial. Mantener los errores del framework con su semántica, por ejemplo 405 o 415, al diseñar handlers.

## 30. El cupo bajo solicitudes simultáneas

Riesgo inferido del código actual y del aislamiento habitual. A y B cuentan dos tareas antes de que ninguna confirme su ingreso, ambas admiten y el resultado llega a cuatro. @Transactional no convierte todas las operaciones en una cola. Propuesta: bloquear una fila común del tablero antes de contar o usar aislamiento SERIALIZABLE con reintentos. @Version en tareas distintas no garantiza el máximo global. Validar solución con prueba concurrente real.

Fuente: https://www.postgresql.org/docs/current/transaction-iso.html

## 31. Estrategia de pruebas por riesgo

- **Nivel**: Qué prueba — Situación actual
- **Unitario**: Transiciones y cupo secuencial — 12 tests con Mockito
- **Web**: Contrato, validación y errores — 8 tests con MockMvc
- **Integración**: Flyway, JPA y PostgreSQL — Pendiente
- **Concurrencia / E2E**: Cupo simultáneo y recorrido completo — Pendiente

Se ejecutaron veinte pruebas con Java 21.0.10 durante la preparación anterior, sin fallos. Eso no certifica base real ni recorrido Angular. Proponer Testcontainers con PostgreSQL si está disponible Docker. Elegir pruebas por riesgo: casos límite, errores, persistencia y carreras. Cobertura de líneas es un indicador parcial y no demuestra aserciones útiles. Mantener datos y pruebas independientes. Una prueba automatizada es evidencia repetible, no prueba absoluta de ausencia de defectos.

## 32. Base de datos y evolución del esquema

- Modelo
- V3 SQL
- Prueba BD
- Aplicación
- Verificación

Las migraciones aplicadas son historial. Un cambio se añade en una versión nueva. Probar migración sobre estado esperado y validar el mapeo Hibernate. Para producción evaluar compatibilidad entre aplicación anterior y esquema nuevo: expandir primero y retirar después cuando corresponda. No actualizar checksums para ocultar divergencias ni borrar datos fuera de bases desechables. Un respaldo solo es útil si se ha ensayado restaurar. Timestamps de auditoría no reemplazan una tabla de eventos.

## 33. Seguridad y configuración

- **Identidad**: Autenticar y autorizar cada operación sobre su recurso.
- **Secretos**: Variables externas y roles de base con permisos acotados.
- **Exposición**: HTTPS, CORS explícito y errores sin información interna.
- **Registro**: Logs con id y resultado, sin DTOs sensibles completos.

El proyecto actual no implementa autenticación. Para uso local docente emplear datos ficticios y acceso acotado. Antes de publicación real agregar autorización por tablero, no solo login. CORS es una política del navegador y no protege contra todos los clientes. Revisar logs que registran TareaResponse completo y claves por defecto. Un perfil de producción debe fallar claramente si falta un secreto requerido, sin asumir credenciales de laboratorio.

## 34. Despliegue propuesto

Vista futura. Angular puede publicarse en Vercel, Spring Boot requiere un host Java como un Droplet y PostgreSQL puede estar en Supabase. Vercel Functions no incluye Java entre runtimes oficiales. Supabase Free tiene límites y pausas. DigitalOcean tiene costo y necesita dimensionamiento. El navegador no debe recibir credenciales JDBC. HTTPS protege el canal y el backend usa conexión TLS apropiada a PostgreSQL. Esta vista no describe recursos creados.

Fuente: https://vercel.com/docs/functions/runtimes ; https://supabase.com/docs/guides/database/connecting-to-postgres ; https://www.digitalocean.com/pricing/droplets

## 35. CI/CD con una puerta de calidad

- Pull Request
- JDK 21
- verify
- Imagen
- Despliegue

Pipeline propuesto: checkout, setup-java 21, Maven Wrapper y verify. Publicar una imagen versionada después de pasar verificaciones. Para primer despliegue docente, aprobación manual y comprobación de salud. CI ejecuta pruebas pero no decide si el requisito es correcto. CD debe contemplar secretos, entornos y reversión. El repositorio actual requiere configurar explícitamente integración SQL si se quiere ejecutar en verify. No usar runners como alojamiento permanente de una API.

Fuente: https://docs.github.com/en/actions/tutorials/build-and-test-code/java-with-maven

## 36. Operación y retroalimentación

- **Logs**: ¿Qué operación falló y cómo correlacionarla?
- **Métricas**: ¿Cambian errores, latencia o saturación?
- **Salud**: ¿La aplicación puede atender solicitudes?
- **Recuperación**: ¿Podemos restaurar y volver a operar?

Agregar observabilidad cuando responda preguntas útiles. Actuator puede ayudar con salud, pero sus endpoints deben exponerse y protegerse de forma intencional. Diferenciar disponibilidad del proceso y capacidad real de acceder a dependencias. Proponer correlación por request id, logs sin secretos y métricas de error. Ensayar una restauración en laboratorio. Los incidentes generan requisitos y pruebas nuevas, cerrando el ciclo de ingeniería.

## 37. Laboratorio de clase 3

- **Analizar**: Escribir historia y criterio para reabrir una tarea.
- **Modelar**: Marcar la guarda de cupo en el diagrama de estados.
- **Verificar**: Probar éxito y rechazo con estado persistido coherente.
- **Revisar**: Explicar el código y obtener feedback de un compañero.

Actividad de 25 minutos dentro de una sesión adaptada. Caso: HECHA vuelve a EN_CURSO con columna llena. Escribir criterio, seguir diagrama y añadir test. La implementación ya rechaza, por lo que no hace falta modificarla si la prueba lo confirma. Usar id real al demostrar en Swagger. Salida: criterio, captura o respuesta HTTP, prueba y explicación de qué queda fuera del alcance. Para una sesión de 120 minutos seleccionar diapositivas esenciales indicadas en la guía.

## 38. Criterios para revisar una entrega

- **Dimensión**: Evidencia mínima — Pregunta al estudiante
- **Requisito**: Criterio y caso alternativo — ¿Qué necesidad resuelve?
- **Diseño**: Diagrama consistente con el código — ¿Por qué esta responsabilidad aquí?
- **Calidad**: Pruebas de éxito y rechazo — ¿Qué riesgo todavía no cubres?
- **Entrega**: README y configuración reproducible — ¿Cómo lo ejecuta otra persona?

Revisar trazabilidad y coherencia, no cantidad de diagramas. El diagrama debe actualizarse si cambia una regla. Una entrega con muchos patrones y poca evidencia puede ser menos mantenible que una simple. Evaluar comprensión individual, incluyendo código asistido por IA. Pedir que el alumno cambie una condición pequeña y explique qué pruebas deben variar. Definir la ponderación según la pauta oficial del curso.

## 39. Ruta posterior a esta clase

- **Etapa**: Trabajo — Resultado esperado
- **Próxima**: PR y transiciones explícitas — Regla legible y revisada
- **Después**: Pruebas SQL y concurrencia — Integridad comprobada
- **Antes de publicar**: Seguridad, CI y configuración — Entrega reproducible
- **Evolución**: Cloud y operación — Demo y recuperación

No impartir cuarenta diapositivas con la misma profundidad en una sesión. Esta es una presentación de apoyo para clase 3 y siguientes. Primero resolver el dominio, luego colaboración y pruebas, después arquitectura como respuesta a dificultades y finalmente publicación. La ruta responde a dependencias de aprendizaje. Mantener Java 21 como base y revisar versiones exactas antes de nuevos laboratorios.

## 40. Fundamentos y fuentes de la propuesta

- **Material del curso**: PPT originales de clase 2 y documentos 00–06 de clase 3.
- **Código real**: Controller, Service, DTOs, Repository, SQL y pruebas del Kanban.
- **Referencias**: SWEBOK, UML/OMG, C4, Scrum Guide y Kanban Guide.
- **Decisión docente**: Aplicar cada concepto a una regla, un modelo y una evidencia.

Las fuentes completas están en notas por diapositiva y en 09-fundamentos-ingenieria-software.md. La estructura visual toma como referencia el contraste blanco, azul oscuro y acento rojo de las PPT originales. Se reconstruyen diagramas editables para el dominio Kanban. Las vistas propuestas se rotulan para no confundirlas con implementación. La calidad se revisa por exactitud semántica, correspondencia con código, legibilidad y verificación de los comportamientos.

Fuente: https://swebokwiki.org/Main_Page

## Evidencia de pruebas y límites

La revisión previa ejecutó 20 pruebas con Java 21.0.10: 12 unitarias y 8 web, sin fallos. No valida PostgreSQL real, concurrencia ni compilación en Eclipse. Esta ampliación modifica documentación y presentación, no el backend.
