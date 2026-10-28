// PARTE II · Aplicación al proyecto Kanban
const { MX, CW, Y0, YEND } = require('./lib');

module.exports = function parte2(d) {
  const { pres, C } = d;
  let s;

  d.seccion('Parte II');
  d.portada('PARTE II', 'El proyecto Kanban',
    'Cada tema de la Parte I aplicado a un producto real:\nun tablero de tareas con reglas de negocio, API REST, PostgreSQL y Angular',
    'A partir de aquí, cada sección toma la teoría de la Parte I y la muestra en el código del proyecto clase-03-crud. Tener abierto el repositorio para seguir los ejemplos.');

  // ---------------------------------------------------------------- 14 EL PROYECTO
  d.seccion('14 · El proyecto');
  d.divisor('14', 'El proyecto y sus reglas', 'Qué problema resuelve el tablero, qué reglas impone y con qué tecnologías está construido.');

  s = d.slide('El proyecto', 'El problema que resuelve el tablero',
    'Usar un ejemplo cercano: estudiar para varias evaluaciones a la vez. El estado describe el avance; la prioridad indica importancia. Una prioridad ALTA no permite saltarse reglas. Alcance: un tablero compartido sin autenticación, adecuado para laboratorio con datos ficticios. Fuera de alcance: login, varios tableros y orden manual de tarjetas.');
  d.cards(s, [
    { t: 'No se ve el avance', d: 'Tareas en cuadernos y mensajes: no se sabe qué falta, qué se hace y qué terminó.' },
    { t: 'Demasiado en curso', d: 'Se empiezan muchas cosas a la vez y casi ninguna se termina.', c: 'accent3' },
    { t: 'Se pierde lo hecho', d: 'Tareas terminadas se modifican por error.', c: 'accent4' },
  ], { cols: 3, h: 2.3 });
  ['Por hacer', 'En curso', 'Hecha'].forEach((t, i) => {
    const x = MX + i * 4.13;
    d.caja(s, t, { x, y: 4.3, w: 3.87, h: 0.6, fill: ['accent4', 'accent3', 'accent2'][i], fontSize: 16 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 5.0, w: 3.87, h: 1.5, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: 'none' } });
    d.texto(s, ['Pendientes, aún sin iniciar', 'Máximo 3 a la vez', 'Terminadas: no se editan'][i], { x: x + 0.25, y: 5.15, w: 3.4, h: 1.2, fontSize: 16, valign: 'middle', align: 'center' });
  });

  s = d.slide('El proyecto', 'Estados y reglas de negocio',
    'Transiciones permitidas: POR_HACER → EN_CURSO, EN_CURSO → POR_HACER o HECHA, HECHA → EN_CURSO. Toda entrada a EN_CURSO verifica el cupo, incluso desde HECHA. Mover a la misma columna o saltar dos columnas devuelve 409. El número 3 es una política de esta aplicación.');
  const st = [['POR_HACER', 'accent4'], ['EN_CURSO', 'accent3'], ['HECHA', 'accent2']];
  st.forEach(([t, c], i) => d.caja(s, t, { x: MX + 0.4 + i * 4.1, y: Y0 + 0.5, w: 2.9, h: 1.0, fill: c, fontSize: 18 }));
  d.flecha(s, MX + 3.35, Y0 + 0.82, 1.1, 0); d.flecha(s, MX + 4.45, Y0 + 1.18, -1.1, 0, { flipH: true });
  d.flecha(s, MX + 7.45, Y0 + 0.82, 1.1, 0); d.flecha(s, MX + 8.55, Y0 + 1.18, -1.1, 0, { flipH: true });
  d.etiqueta(s, '[hay cupo]', { x: MX + 3.2, y: Y0 + 0.3, w: 1.4, h: 0.3, color: C.accent1, bold: true });
  d.etiqueta(s, '[hay cupo]', { x: MX + 7.3, y: Y0 + 1.3, w: 1.4, h: 0.3, color: C.accent1, bold: true });
  d.etiqueta(s, 'crear → nace aquí', { x: MX + 0.4, y: Y0 + 1.6, w: 2.9, h: 0.3 });
  d.cards(s, [
    { t: 'Nace en POR_HACER', d: 'El alta no acepta estado: lo fija el servidor.' },
    { t: 'Máximo 3 en curso', d: 'La cuarta entrada a EN_CURSO devuelve 409.', c: 'accent3' },
    { t: 'Un paso a la vez', d: 'Solo a la columna vecina; saltar devuelve 409.', c: 'accent4' },
    { t: 'HECHA no se edita', d: 'Editar devuelve 409; primero se reabre.', c: 'accent2' },
  ], { cols: 4, y: 4.0, h: 2.5 });

  s = d.slide('El proyecto', 'Arquitectura de contenedores (C4 nivel 2)',
    'Angular se ejecuta en el navegador; en desarrollo, su proxy reenvía /api al backend en el puerto 8083, por eso no depende de CORS. Spring Boot expone la API REST y PostgreSQL persiste. Puertos elegidos para poder tener la clase 02 y la 03 corriendo a la vez. La ubicación productiva todavía no está definida.');
  const cont = [['Angular 21', 'Interfaz en el navegador', 'localhost:4200', 'accent4'], ['Spring Boot 3.5', 'API REST · Java 21', 'localhost:8083', 'text2'], ['PostgreSQL 18', 'Base kanban_db', 'puerto 5432', 'accent1']];
  cont.forEach(([t, sub, port, c], i) => {
    const x = MX + i * 4.25;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: Y0 + 0.5, w: 3.3, h: 2.2, rectRadius: 0.1, fill: { color: C[c] }, line: { type: 'none' } });
    d.texto(s, [{ text: t, options: { fontSize: 22, bold: true, breakLine: true } }, { text: sub, options: { fontSize: 16, breakLine: true } }, { text: port, options: { fontSize: 15, italic: true } }], { x: x + 0.15, y: Y0 + 0.7, w: 3.0, h: 1.8, color: C.background1, align: 'center', valign: 'middle' });
    if (i < 2) {
      d.flecha(s, x + 3.38, Y0 + 1.6, 0.8, 0);
      d.etiqueta(s, ['HTTP\nJSON', 'JDBC\nSQL'][i], { x: x + 3.33, y: Y0 + 1.0, w: 0.9, h: 0.55, fontSize: 11 });
    }
  });
  d.cards(s, [
    { t: 'Proxy de desarrollo', d: 'proxy.conf.json envía /api a 8083.' },
    { t: 'Configuración externa', d: 'DB_HOST, DB_USER, SERVER_PORT, CORS_ORIGINS…', c: 'accent2' },
    { t: 'Esquema con Flyway', d: 'Hibernate solo valida: ddl-auto: validate.', c: 'accent3' },
  ], { cols: 3, y: 4.55, h: 1.95 });

  s = d.slide('El proyecto', 'Estructura del repositorio',
    'kanban-backend-base trae pom.xml, application.yml, migraciones, la clase principal y un package-info.java con TODO por paquete: arranca tal cual con Swagger vacío. La guía paso a paso se genera desde los archivos reales, por lo que sus bloques de código coinciden con el proyecto terminado.');
  d.tabla(s, ['Carpeta', 'Contenido'], [
    ['kanban-backend/', 'Backend terminado: Spring Boot, 20 pruebas, Flyway V1 y V2'],
    ['kanban-backend-base/', 'Esqueleto en blanco con TODO por paquete, para que el alumno lo complete'],
    ['kanban-frontend/', 'Angular 21: tablero con signals, arrastrar y soltar, 8 pruebas'],
    ['docs/', 'Casos de uso, teoría, UML, base de datos, guías paso a paso y presentaciones'],
    ['docs/_build/', 'Generador de las guías desde el código real (--check verifica que coinciden)'],
  ], { colW: [3.2, 8.93], rowH: 0.7 });
  d.destacado(s, 'Sin Lombok ni generadores de código: compila en Eclipse, IntelliJ y VS Code sin plugins.', { y: 6.05 });

  // ---------------------------------------------------------------- 15 DEL REQUISITO AL CÓDIGO
  d.seccion('15 · Del requisito al código');
  d.divisor('15', 'Del requisito al código', 'Casos de uso, historias, criterios de aceptación y trazabilidad aplicados al tablero.');

  s = d.slide('Del requisito al código', 'Casos de uso que se vuelven endpoints',
    'Cinco objetivos del usuario: ver, crear, editar, mover y eliminar. Las validaciones y los rechazos (cupo, salto, tarea hecha) se documentan como flujos alternativos de cada caso, no como óvalos separados. Confirmar la eliminación es una interacción de la interfaz dentro del caso de uso.');
  d.tabla(s, ['Caso de uso', 'Endpoint', 'Método del service', 'Éxito'], [
    ['CU-01 Ver tablero', 'GET /api/tareas', 'listar()', '200'],
    ['CU-02 Crear tarea', 'POST /api/tareas', 'crear()', '201 + Location'],
    ['CU-03 Editar tarea', 'PUT /api/tareas/{id}', 'actualizar()', '200'],
    ['CU-04 Mover tarea', 'PATCH /api/tareas/{id}/estado', 'mover()', '200'],
    ['CU-05 Eliminar tarea', 'DELETE /api/tareas/{id}', 'eliminar()', '204'],
  ], { colW: [3.0, 4.2, 2.8, 2.13], rowH: 0.65 });
  d.destacado(s, 'Flujos alternativos: 400 datos inválidos · 404 no existe · 409 cupo lleno, salto de columna o tarea hecha', { y: 5.7 });

  s = d.slide('Del requisito al código', 'Historia y criterios del límite en curso',
    'Pedir al grupo que transforme una frase vaga ("el tablero debe funcionar") en ejemplos observables. Escenario adicional para trabajar en parejas: editar una tarea HECHA devuelve 409 sin modificar título, prioridad, descripción ni fecha límite.');
  d.caja(s, 'Como estudiante, quiero iniciar una tarea, para reflejar en qué estoy trabajando.', { x: MX, y: Y0, w: CW, h: 0.9, fill: 'text2', fontSize: 20 });
  d.tabla(s, ['Escenario', 'Dado', 'Cuando', 'Entonces'], [
    ['Cupo disponible', 'hay 2 tareas en curso', 'muevo una tarea de Por hacer a En curso', '200: quedan 3 en curso'],
    ['Cupo lleno', 'hay 3 tareas en curso', 'intento iniciar otra', '409 y la tarea sigue en Por hacer'],
    ['Salto de columna', 'una tarea está en Por hacer', 'la muevo directo a Hecha', '409: solo una columna a la vez'],
    ['Reabrir sin cupo', 'una tarea está Hecha y hay 3 en curso', 'la vuelvo a En curso', '409 por cupo'],
  ], { y: 2.85, colW: [2.4, 3.1, 3.4, 3.23], rowH: 0.75 });

  s = d.slide('Del requisito al código', 'Trazabilidad de la regla R-03',
    'Seguir la regla hasta su verificación. El test existente comprueba la regla de forma secuencial usando mocks. La garantía con solicitudes simultáneas sigue pendiente y necesita otra prueba, contra una base real.');
  d.flujo(s, [
    { t: 'R-03', d: 'Máximo 3 tareas en curso' },
    { t: 'Criterio', d: 'Con 3 en curso, la 4.ª devuelve 409 y no cambia' },
    { t: 'Modelo', d: 'Transición con guarda [hay cupo]' },
    { t: 'Código', d: 'TareaServiceImpl.mover + countByEstado' },
    { t: 'Prueba', d: 'Test del service: rechaza la cuarta tarea y nunca llama a save', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.5, dSize: 15 });
  d.destacado(s, 'Pendiente: una prueba concurrente que demuestre la regla con dos solicitudes simultáneas.', { y: 5.4, fill: 'accent1' });

  s = d.slide('Del requisito al código', 'Atributos de calidad del Kanban',
    'En esta clase el riesgo más concreto es la integridad concurrente del cupo. Para uso público falta autorización. Los objetivos de rendimiento no se inventan: se acuerdan con los interesados y se miden en un entorno definido.');
  d.tabla(s, ['Atributo', 'Pregunta', 'Cómo comprobarlo', 'Hoy'], [
    ['Integridad', '¿Se respeta el cupo con accesos simultáneos?', 'Prueba concurrente en PostgreSQL', 'Pendiente'],
    ['Seguridad', '¿Quién puede editar esta tarea?', 'Prueba de autorización por recurso', 'Sin login'],
    ['Usabilidad', '¿Se ve el tablero sin scroll lateral?', 'Revisión a 1366, 1024, 800 y 375 px', 'Verificado'],
    ['Recuperación', '¿Podemos restaurar los datos?', 'Ensayo de restauración', 'Pendiente'],
  ], { colW: [2.3, 4.3, 3.9, 1.63], rowH: 0.75 });

  // ---------------------------------------------------------------- 16 BACKEND
  d.seccion('16 · Backend');
  d.divisor('16', 'Backend en capas', 'Spring Boot con arquitectura por capas: controller, service, repository, entity, DTO, mapper y manejo de errores.');

  s = d.slide('Backend', 'Capas del backend',
    'El controller usa TareaService (interfaz), implementado por TareaServiceImpl. El service coordina repository y mapper y concentra las reglas. La Entity es un objeto persistente, no una capa de ejecución. Es una arquitectura por capas sobre Spring MVC; todavía no es hexagonal porque la lógica depende de JPA y de DTO concretos.');
  [['TareaController', 'HTTP, validación @Valid y códigos de respuesta', 'text2'], ['TareaService / Impl', 'Reglas de negocio y transacciones', 'accent1'], ['TareaRepository', 'Acceso a datos con Spring Data JPA', 'accent4'], ['PostgreSQL', 'Tabla tarea, migrada por Flyway', 'accent5']].forEach(([t, dsc, c], i) => {
    const y = Y0 + i * 1.22;
    d.caja(s, t, { x: MX, y, w: 3.8, h: 0.95, fill: c, fontSize: 17 });
    d.texto(s, dsc, { x: MX + 4.05, y, w: 3.6, h: 0.95, fontSize: 16, valign: 'middle' });
    if (i < 3) d.flecha(s, MX + 1.9, y + 0.97, 0, 0.23);
  });
  d.cards(s, [
    { t: 'DTO (record)', d: 'Contrato HTTP de entrada y salida.' },
    { t: 'TareaMapper', d: 'Convierte DTO ↔ Entity, a mano.', c: 'accent2' },
    { t: 'GlobalExceptionHandler', d: 'Traduce excepciones a ApiError.', c: 'accent3' },
  ], { cols: 1, x: 8.6, w: 4.13, h: 1.45, gap: 0.2, tSize: 16 });

  s = d.slide('Backend', 'Paquetes y responsabilidades',
    'Paquete raíz cl.ipss.kanban. Cada paquete corresponde a un paso de la guía. Java puro: entidades con constructor vacío y getters/setters escritos a mano; el id y las fechas no tienen setter porque las maneja JPA; los logs se declaran con LoggerFactory, sin @Slf4j.');
  d.tabla(s, ['Paquete', 'Clases', 'Responsabilidad'], [
    ['enums', 'EstadoTarea, PrioridadTarea', 'Valores cerrados del dominio'],
    ['entity', 'Tarea', 'Mapeo a la tabla tarea (JPA)'],
    ['repository', 'TareaRepository', 'CRUD heredado + countByEstado'],
    ['dto', 'CrearTareaRequest, ActualizarTareaRequest, MoverTareaRequest, TareaResponse', 'Contrato HTTP con validaciones'],
    ['exception', '4 excepciones, ApiError, GlobalExceptionHandler', 'Errores con nombre y formato único'],
    ['mapper · service · config · controller', 'TareaMapper, TareaService(Impl), CorsConfig, SwaggerConfig, TareaController', 'Conversión, reglas, configuración y HTTP'],
  ], { colW: [3.0, 5.5, 3.63], rowH: 0.72, fontSize: 14 });

  s = d.slide('Backend', 'Validación de entrada frente a regla de negocio',
    '@NotBlank rechaza nulo, vacío y solo espacios; @Size limita la longitud; @NotNull exige la prioridad. Un enum desconocido falla al leer el JSON (400). En cambio, el cupo y el estado actual exigen consultar datos: corresponden al service (409). La fecha límite acepta valores pasados porque no existe @FutureOrPresent: no enseñar esa prohibición como requisito.');
  d.tabla(s, ['Situación', 'Quién la detecta', 'Respuesta'], [
    ['Título vacío o de más de 100 caracteres', 'DTO + @Valid en el controller', '400 con detalles'],
    ['Estado "ARCHIVADA" (no existe en el enum)', 'Lectura del JSON (Jackson)', '400 solicitud mal formada'],
    ['Id inexistente', 'Service → handler', '404'],
    ['Cupo lleno o salto de columna', 'Regla en el service → handler', '409'],
    ['Editar una tarea HECHA', 'Regla en el service → handler', '409'],
    ['Error inesperado', 'Handler genérico + log de error', '500 sin detalles internos'],
  ], { colW: [4.6, 4.3, 3.23], rowH: 0.62 });

  s = d.slide('Backend', 'Mover una tarea: camino exitoso',
    'Vista simplificada: se omite el mapper y el proxy transaccional. El service obtiene la tarea, valida la transición, consulta el cupo, cambia el estado y guarda. La infraestructura transaccional confirma (commit) antes de la respuesta exitosa, aunque save no ejecute el SQL en ese instante.');
  d.secuencia(s, ['Angular', 'TareaController', 'TareaServiceImpl', 'TareaRepository', 'PostgreSQL'], [
    { de: 0, a: 1, t: 'PATCH /api/tareas/7/estado' },
    { de: 1, a: 1, t: '@Valid MoverTareaRequest' },
    { de: 1, a: 2, t: 'mover(7, EN_CURSO)' },
    { de: 2, a: 3, t: 'findById(7)' },
    { de: 3, a: 4, t: 'SELECT' },
    { de: 2, a: 2, t: '¿un paso? sí' },
    { de: 2, a: 3, t: 'countByEstado(EN_CURSO) → 2' },
    { de: 2, a: 3, t: 'save(tarea)' },
    { de: 2, a: 1, t: 'TareaResponse', ret: true },
    { de: 1, a: 0, t: '200 OK + JSON', ret: true },
  ], { dy: 0.47 });

  s = d.slide('Backend', 'Mover una tarea: rechazo con 409',
    'Cuando countByEstado devuelve 3, el service lanza LimiteEnCursoExcedidoException sin llamar a save. Spring MVC resuelve la excepción mediante GlobalExceptionHandler, que construye el ApiError y la respuesta 409: el controller no llama al handler manualmente. El cliente muestra la causa y conserva el estado del servidor.');
  d.secuencia(s, ['Angular', 'Spring MVC', 'TareaServiceImpl', 'TareaRepository', 'GlobalExceptionHandler'], [
    { de: 0, a: 1, t: 'PATCH /api/tareas/9/estado' },
    { de: 1, a: 2, t: 'mover(9, EN_CURSO)' },
    { de: 2, a: 3, t: 'findById(9)' },
    { de: 2, a: 3, t: 'countByEstado(EN_CURSO) → 3' },
    { de: 2, a: 2, t: 'warn: in-progress limit reached', error: true },
    { de: 2, a: 1, t: 'excepción de cupo', error: true, ret: true },
    { de: 1, a: 4, t: 'resolver excepción' },
    { de: 4, a: 0, t: '409 + ApiError', error: true, ret: true },
  ], { dy: 0.55 });

  s = d.slide('Backend', 'La regla en el código',
    'Fragmento de TareaServiceImpl.mover. ordinal() devuelve la posición de la constante en el enum y permite expresar "contigua" de forma breve. Su costo: si alguien reordena las constantes o agrega BLOQUEADA en medio, la regla cambia en silencio. En la sección 19 se propone una versión con transiciones explícitas.');
  d.codigo(s, 'Tarea tarea = buscar(id);\nEstadoTarea origen = tarea.getEstado();\n\n// Regla 2: un paso a la vez\nif (Math.abs(destino.ordinal()\n        - origen.ordinal()) != 1) {\n    throw new MovimientoInvalidoException(\n            origen, destino);\n}\n// Regla 1: máximo 3 en curso\nif (destino == EstadoTarea.EN_CURSO\n        && repository.countByEstado(\n           EstadoTarea.EN_CURSO) >= LIMITE_EN_CURSO) {\n    throw new LimiteEnCursoExcedidoException(\n            LIMITE_EN_CURSO);\n}\ntarea.setEstado(destino);\nreturn mapper.aRespuesta(repository.save(tarea));', { w: 7.0, etiqueta: 'TareaServiceImpl.mover()', fontSize: 13 });
  d.bullets(s, [
    'Primero el movimiento, luego el cupo',
    'Mover a la misma columna también da 409 (diferencia 0)',
    'El cupo se revisa en toda entrada a EN_CURSO, también desde HECHA',
    'LIMITE_EN_CURSO = 3: sin número mágico',
    'Las excepciones tienen nombre y serialVersionUID',
  ], { x: 7.9, y: Y0 + 0.1, w: 4.83, h: 5.0 });

  s = d.slide('Backend', 'Errores uniformes y logs',
    'Los errores (400, 404, 409, 500) se documentan una sola vez con @ResponseStatus en el @RestControllerAdvice; en el controller solo hay @Operation y @ApiResponse para 201 y 204. Logs: formato --- texto: {} ---, en inglés y sin datos sensibles. El controller registra start/response/end; el service info al recibir y terminar, y warn al rechazar. Revisar: el log de la respuesta completa incluye títulos y descripciones.');
  d.codigo(s, '{\n  "fecha": "2026-10-26T10:15:30",\n  "status": 409,\n  "error": "Conflict",\n  "mensaje": "La columna En curso ya tiene\n     el máximo de 3 tareas; termina\n     una antes de iniciar otra",\n  "detalles": []\n}', { w: 5.9, h: 2.75, etiqueta: 'RESPUESTA ApiError', fontSize: 13 });
  d.codigo(s, '--- start process endpoint: PATCH /api/tareas/9/estado ---\n--- command receive to move task: 9 to EN_CURSO ---\n--- in-progress limit reached: task 9 cannot move to EN_CURSO ---', { y: 4.55, w: CW, h: 2.2, etiqueta: 'LOG (sin "end process": hubo error)', fontSize: 13 });
  d.bullets(s, ['Un formato para todos los errores', 'detalles lista los campos inválidos en un 400', '404 y 409 en debug en el handler, porque el service ya registró el warn', '500: log de error con la excepción completa'], { x: 6.8, y: Y0 + 0.1, w: 5.93, h: 2.7, fontSize: 15 });

  // ---------------------------------------------------------------- 17 BASE DE DATOS
  d.seccion('17 · Base de datos');
  d.divisor('17', 'Base de datos y concurrencia', 'La tabla tarea, la evolución del esquema con Flyway y el riesgo del cupo bajo solicitudes simultáneas.');

  s = d.slide('Base de datos', 'La tabla tarea',
    'Una sola tabla de negocio. NOT NULL y CHECK protegen los valores incluso fuera de la API, pero un CHECK no garantiza que el total de filas EN_CURSO sea como máximo 3: eso requiere coordinar filas distintas. Los timestamps no son un historial de cambios: para medir tiempo de ciclo haría falta una tabla de transiciones.');
  d.tabla(s, ['Columna', 'Tipo', 'Restricción'], [
    ['id', 'BIGINT GENERATED ALWAYS AS IDENTITY', 'PRIMARY KEY'],
    ['titulo', 'VARCHAR(100)', 'NOT NULL'],
    ['descripcion', 'VARCHAR(500)', 'opcional'],
    ['estado', 'VARCHAR(15)', "NOT NULL · CHECK IN ('POR_HACER','EN_CURSO','HECHA')"],
    ['prioridad', 'VARCHAR(10)', "NOT NULL · CHECK IN ('BAJA','MEDIA','ALTA')"],
    ['fecha_limite', 'DATE', 'opcional'],
    ['creada_en · actualizada_en', 'TIMESTAMP', 'NOT NULL · @PrePersist / @PreUpdate'],
  ], { colW: [3.2, 4.1, 4.83], rowH: 0.56, fontSize: 14 });
  d.destacado(s, 'Índice idx_tarea_estado: acelera countByEstado, que se consulta en cada movimiento.', { y: 6.2, h: 0.55 });

  s = d.slide('Base de datos', 'Flyway: el esquema evoluciona con el código',
    'Flyway guarda en flyway_schema_history lo aplicado con un checksum de cada archivo. Si se edita una migración ya aplicada, el arranque falla. Los cambios van en archivos nuevos. En producción: expandir primero y retirar después, para que la versión anterior de la app siga funcionando durante el despliegue. No actualizar checksums para ocultar divergencias.');
  d.flujo(s, [
    { t: 'V1', d: 'Crea la tabla tarea, sus CHECK y el índice' },
    { t: 'V2', d: '3 tareas de ejemplo, una por columna' },
    { t: 'V3, V4…', d: 'Cada cambio futuro, en un archivo nuevo', c: 'accent2' },
    { t: 'Hibernate valida', d: 'ddl-auto: validate comprueba que la Entity coincide', c: 'accent1' },
  ], { y: Y0 + 0.3, dh: 1.2, dSize: 15 });
  d.codigo(s, '-- V3__agregar_etiqueta.sql  (ejemplo de cambio futuro)\nALTER TABLE tarea ADD COLUMN etiqueta VARCHAR(30);', { y: 4.6, w: CW, h: 1.3, fontSize: 15 });
  d.destacado(s, 'Una migración ya aplicada nunca se edita.', { y: 6.1, fill: 'accent1' });

  s = d.slide('Base de datos', 'El cupo bajo solicitudes simultáneas',
    'Riesgo inferido del código y del aislamiento por defecto (READ COMMITTED), no reproducido aún en una prueba. A y B cuentan 2 antes de que ninguna confirme; ambas admiten y se llega a 4. @Transactional no convierte las operaciones en una cola. @Version protege conflictos sobre una misma fila, no un máximo entre filas distintas. Fuente: postgresql.org/docs/current/transaction-iso.html');
  [['Solicitud A', 0], ['Solicitud B', 1]].forEach(([t, i]) => {
    const x = MX + i * 3.4;
    d.caja(s, t, { x, y: Y0, w: 3.0, h: 0.6, fill: i ? 'accent4' : 'text2', fontSize: 16 });
    ['cuenta: 2 en curso', 'admite: 2 < 3', 'guarda EN_CURSO'].forEach((p, k) => {
      d.caja(s, p, { x, y: Y0 + 0.85 + k * 0.95, w: 3.0, h: 0.7, fill: 'background2', color: 'text2', fontSize: 15, bold: false });
    });
  });
  d.caja(s, 'Resultado: 4 tareas en curso', { x: MX, y: 5.45, w: 6.4, h: 0.75, fill: 'accent1', fontSize: 18 });
  d.panel(s, 'Soluciones posibles', [
    'Bloquear una fila común del tablero (SELECT … FOR UPDATE) antes de contar y mover',
    'Aislamiento SERIALIZABLE con reintento ante fallos de serialización',
    'Usar el mismo protocolo en todas las entradas a EN_CURSO',
    'Demostrarlo con una prueba concurrente contra PostgreSQL real',
  ], { x: 7.4, w: 5.33, color: 'accent2', fontSize: 15 });

  // ---------------------------------------------------------------- 18 FRONTEND
  d.seccion('18 · Frontend');
  d.divisor('18', 'Frontend Angular', 'Angular 21 standalone y zoneless, estado con signals y arrastrar y soltar con la API nativa de HTML5, sin librerías extra.');

  s = d.slide('Frontend', 'Estructura del frontend',
    'Misma organización que la clase 02: core (lo que conoce la API), shared (componentes reutilizables) y features (pantallas del dominio). Componentes standalone, zoneless, signals y pruebas con Vitest y HttpTestingController.');
  d.tabla(s, ['Carpeta', 'Contenido', 'Rol'], [
    ['core/models', 'tarea.model.ts, api-error.ts', 'Tipos que reflejan los DTO del backend'],
    ['core/api', 'tarea.api.ts', 'Único lugar que conoce las rutas HTTP'],
    ['core/interceptors', 'error.interceptor.ts', 'Convierte ApiError en un mensaje legible'],
    ['shared/ui', 'toast, confirm-dialog', 'Avisos y confirmación reutilizables'],
    ['features/tareas', 'tareas.store.ts, pages/tablero, components/tarea-card y tarea-form', 'Estado, pantalla y componentes'],
  ], { colW: [2.8, 5.3, 4.03], rowH: 0.75 });

  s = d.slide('Frontend', 'Store con signals (patrón Store/Facade)',
    'Las páginas leen signals y llaman métodos; nunca hablan con la API. computed se recalcula solo cuando cambian las tareas. Cada operación devuelve Observable<void> que emite solo si salió bien: así la página cierra el formulario únicamente en caso de éxito. Si el servidor responde 409, el toast muestra el mensaje y el tablero queda como estaba.');
  d.codigo(s, 'readonly tareas = signal<Tarea[]>([]);\n\nreadonly tareasPorEstado = computed(() => {\n  const col = { POR_HACER: [], EN_CURSO: [], HECHA: [] };\n  for (const t of this.tareas()) col[t.estado].push(t);\n  return col;\n});\n\nmover(id: number, estado: EstadoTarea) {\n  return this.api.mover(id, estado).pipe(\n    switchMap(() => this.refrescar()),\n    catchError(this.fallar),  // toast + EMPTY\n  );\n}', { w: 7.0, etiqueta: 'tareas.store.ts (simplificado)', fontSize: 13 });
  d.bullets(s, ['signal: valor reactivo', 'computed: tareas por columna y resumen (enCursoLleno)', 'Escrituras: llaman a la API y refrescan la lista', 'Errores: toast legible y el flujo se corta', '8 pruebas con HttpTestingController'], { x: 7.9, y: Y0 + 0.1, w: 4.83, h: 5.0 });

  s = d.slide('Frontend', 'Arrastrar y soltar con HTML5',
    'Sin Angular CDK ni otra dependencia. La tarjeta es draggable y en dragstart guarda su id en dataTransfer. La columna escucha dragover y llama preventDefault(): sin esto el navegador no permite soltar. En drop se lee el id y se llama al store. Los botones ← → son la alternativa accesible (teclado y celular). La API aplica las reglas aunque se omita Angular.');
  d.flujo(s, [
    { t: 'dragstart', d: 'La tarjeta guarda su id en dataTransfer' },
    { t: 'dragover', d: 'La columna llama preventDefault() y se resalta' },
    { t: 'drop', d: 'Se lee el id y se busca la tarea' },
    { t: 'store.mover()', d: 'PATCH al backend y refresco de la lista' },
    { t: '¿409?', d: 'Toast con el motivo; la tarjeta no se mueve', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.4, dSize: 15 });
  d.destacado(s, 'Accesibilidad: cada tarjeta tiene botones ← → que hacen lo mismo que arrastrar.', { y: 5.4 });

  s = d.slide('Frontend', 'Interfaz responsiva y coherente con el backend',
    'Verificado en el navegador a 1366, 1024, 800 y 375 px sin scroll lateral. El truco: grid-template-columns: repeat(3, minmax(0, 1fr)); el minmax(0, …) permite que las columnas se encojan. Bajo 800 px se apilan en una columna.');
  d.cards(s, [
    { t: 'Sin scroll lateral', d: 'repeat(3, minmax(0, 1fr)); en ≤ 800 px, una columna.' },
    { t: 'Aviso de límite', d: 'En curso muestra "n / 3" y cambia de color al llegar a 3.', c: 'accent3' },
    { t: 'Validaciones espejo', d: 'Validators replica @NotBlank y @Size del DTO.', c: 'accent2' },
    { t: 'Confirmar antes de eliminar', d: 'Diálogo reutilizable ConfirmDialog.', c: 'accent4' },
    { t: 'Errores legibles', d: 'errorInterceptor + toast con aria-live.', c: 'accent6' },
    { t: 'Paleta propia', d: 'Índigo, distinta del rojo de la clase 02.', c: 'accent5' },
  ], { cols: 3 });

  // ---------------------------------------------------------------- 19 CALIDAD
  d.seccion('19 · Calidad');
  d.divisor('19', 'Calidad y pruebas', 'Qué prueba el proyecto hoy, qué falta y cómo mejorar el código sin cambiar su comportamiento.');

  s = d.slide('Calidad', 'Las pruebas que ya tiene el proyecto',
    'Ejecutadas con Java 21.0.10: 20 pruebas del backend sin fallos y 8 del store Angular. Las pruebas web reemplazan el service y las del service reemplazan el repository: por eso no prueban las migraciones, el motor SQL ni las carreras. No presentar este resultado como validación de punta a punta.');
  d.cifra(s, '12', 'pruebas del service con Mockito', { x: MX, color: 'accent1' });
  d.cifra(s, '8', 'pruebas web con MockMvc y @MockitoBean', { x: MX + 3.1, color: 'accent2' });
  d.cifra(s, '8', 'pruebas del store Angular con Vitest', { x: MX + 6.2, color: 'accent4' });
  d.cifra(s, '0', 'pruebas contra PostgreSQL real (pendiente)', { x: MX + 9.3, color: 'accent5' });
  d.tabla(s, ['Nivel', 'Qué prueba', 'Situación'], [
    ['Unitario', 'Transiciones y cupo secuencial', '12 pruebas'],
    ['Web', 'Contrato, validación y errores', '8 pruebas'],
    ['Integración', 'Flyway, JPA y PostgreSQL', 'Pendiente: Testcontainers'],
    ['Concurrencia / E2E', 'Cupo simultáneo y recorrido completo', 'Pendiente'],
  ], { y: 3.95, colW: [2.8, 5.4, 3.93], rowH: 0.56 });

  s = d.slide('Calidad', 'Clean code: transiciones explícitas',
    'La propuesta expresa las transiciones permitidas y no depende del orden del enum. Debe conservar exactamente el comportamiento y venir con pruebas parametrizadas de los 9 pares posibles: 4 válidos y 5 inválidos. El cupo se prueba por separado. Esta refactorización es un ejercicio propuesto; no se aplicó al backend de referencia.');
  d.codigo(s, '// Actual: depende del orden del enum\nMath.abs(destino.ordinal()\n    - origen.ordinal()) != 1', { w: 5.9, h: 2.0, etiqueta: 'ACTUAL', fontSize: 15 });
  d.codigo(s, 'boolean esTransicionValida(\n    EstadoTarea origen,\n    EstadoTarea destino) {\n  return switch (origen) {\n    case POR_HACER, HECHA ->\n        destino == EN_CURSO;\n    case EN_CURSO ->\n        destino == POR_HACER\n        || destino == HECHA;\n  };\n}', { x: MX + 6.23, w: 5.9, etiqueta: 'PROPUESTA', fontSize: 15 });
  d.bullets(s, ['Intención visible en el código', 'Agregar un estado obliga a decidir sus transiciones', 'Mismo resultado: 4 válidas, 5 inválidas', 'Refactor protegido por pruebas'], { x: MX, y: 3.95, w: 5.9, h: 2.7 });

  s = d.slide('Calidad', 'Ejercicio en parejas',
    'Tiempo sugerido: 15 minutos. Uno escribe la prueba y el otro revisa el escenario; luego intercambian. Solución esperada: findById devuelve una tarea HECHA, countByEstado devuelve 3L, assertThrows valida la excepción y verify(repository, never()).save(any()) asegura que no hubo escritura. No hace falta cambiar el código de producción si la prueba confirma la regla.');
  d.flujo(s, [
    { t: 'Caso', d: 'Una tarea HECHA intenta volver a EN_CURSO sin cupo' },
    { t: 'Preparar', d: 'Simular que ya existen 3 tareas en curso' },
    { t: 'Ejecutar', d: 'Llamar a service.mover(id, EN_CURSO)' },
    { t: 'Verificar', d: 'Se lanza la excepción de cupo y nunca se llama a save()', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.3, dSize: 15 });
  d.codigo(s, 'assertThrows(LimiteEnCursoExcedidoException.class,\n    () -> service.mover(1L, EstadoTarea.EN_CURSO));\nverify(repository, never()).save(any());', { y: 4.6, w: CW, h: 1.6, fontSize: 15 });

  // ---------------------------------------------------------------- 20 EQUIPO
  d.seccion('20 · Trabajo en equipo');
  d.divisor('20', 'Trabajo en equipo', 'Cómo organizar al curso con un tablero de equipo, ramas, Pull Requests, una Definition of Done y Sprints cortos.');

  s = d.slide('Trabajo en equipo', 'El tablero del equipo',
    'Es una propuesta de proceso, distinta de los tres estados del producto Kanban. Definir cómo entra y sale una tarea de cada columna, sus límites y cómo se tratan los bloqueos. La columna de revisión necesita capacidad y responsable. Una tarea con código pero sin pruebas o sin revisión no cumple la Definition of Done.');
  [['Por hacer', 'Historia entendida', 'Criterios claros', 'accent5'], ['En desarrollo', 'Código y pruebas', 'Límite acordado', 'accent3'], ['Revisión', 'Feedback y corrección', 'Capacidad de revisión', 'accent4'], ['Terminado', 'Cumple la DoD', 'Evidencia disponible', 'accent2']].forEach(([t, a, b, c], i) => {
    const x = MX + i * 3.08;
    d.caja(s, t, { x, y: Y0, w: 2.8, h: 0.65, fill: c, fontSize: 17 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: Y0 + 0.8, w: 2.8, h: 3.4, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: 'none' } });
    d.texto(s, [{ text: 'Qué ocurre', options: { fontSize: 13, color: C.accent5, breakLine: true } }, { text: a, options: { fontSize: 17, bold: true, color: C.text2, breakLine: true } }, { text: ' ', options: { breakLine: true } }, { text: 'Política para salir', options: { fontSize: 13, color: C.accent5, breakLine: true } }, { text: b, options: { fontSize: 17, bold: true, color: C.text2 } }], { x: x + 0.2, y: Y0 + 1.0, w: 2.4, h: 3.0 });
  });
  d.destacado(s, 'Medir tiempo de ciclo y antigüedad de las tareas, no productividad por líneas de código.', { y: 6.0 });

  s = d.slide('Trabajo en equipo', 'Acuerdo de trabajo y flujo con Git',
    'Equipos de 3 o 4 alumnos. Rotar quién implementa, revisa y demuestra, sin convertirlo en silos permanentes. El PR debe explicar qué cambia y cómo se probó. Los desarrolladores siguen siendo responsables del código generado con IA.');
  d.flujo(s, [
    { t: 'Historia', d: 'Una historia pequeña' }, { t: 'feature/…', d: 'Una rama por historia' },
    { t: 'Commits', d: 'feat:, fix:, test:…' }, { t: 'Pull Request', d: 'Qué cambia y cómo se probó' },
    { t: 'Revisión + CI', d: 'Un compañero y pruebas en verde' }, { t: 'main', d: 'Integrado y desplegable', c: 'accent1' },
  ], { y: Y0 + 0.2, tSize: 15, dh: 1.0 });
  d.panel(s, 'Definition of Done del curso', [
    'Cumple los criterios de aceptación de la historia', 'Compila con Java 21 y pasa las pruebas', 'Revisado por un compañero en un PR',
    'Migración nueva si cambia el esquema', 'Sin secretos en el repositorio',
  ], { x: MX, y: 3.75, w: CW, h: 2.95, fontSize: 15 });

  s = d.slide('Trabajo en equipo', 'Un Sprint en el aula',
    'Propuesta didáctica: Sprint de una semana con un objetivo concreto, por ejemplo "mover tareas con rechazos comprensibles". El docente puede representar al interesado y orientar el rol de Product Owner. Cerrar la sesión con una revisión del producto y luego una retrospectiva del proceso, distinguiendo ambas conversaciones.');
  d.flujo(s, [
    { t: 'Planning', d: 'Objetivo del Sprint y historias elegidas' },
    { t: 'Construcción', d: 'Ramas, PR, revisión e inspección diaria breve' },
    { t: 'Review', d: 'Demostrar el incremento y recibir feedback' },
    { t: 'Retrospectiva', d: 'Una mejora concreta para el próximo Sprint', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.3, dSize: 15 });
  d.destacado(s, 'Sprint de 1 semana · el siguiente Sprint incorpora lo aprendido · adaptación al calendario docente', { y: 5.3 });

  // ---------------------------------------------------------------- 21 PRODUCCIÓN Y RUTA
  d.seccion('21 · Producción y ruta');
  d.divisor('21', 'Producción y ruta del curso', 'Qué falta para publicar el tablero, cómo automatizarlo y una ruta de clases para llegar ahí.');

  s = d.slide('Producción', 'Seguridad antes de publicar',
    'El backend actual no incluye Spring Security. Antes de un uso real: autorización por tablero y no solo login (verificar que el usuario A no acceda al tablero del usuario B). Separar perfil local y de producción; en producción, fallar claramente si falta un secreto en vez de usar las claves de laboratorio. Reducir el log de SQL en DEBUG.');
  d.cards(s, [
    { t: 'Identidad', d: 'Autenticar usuarios y autorizar cada operación sobre su tablero.' },
    { t: 'Secretos', d: 'Variables externas; usuario de base con permisos acotados.', c: 'accent2' },
    { t: 'Exposición', d: 'HTTPS, CORS explícito y errores sin información interna.', c: 'accent3' },
    { t: 'Registro', d: 'Logs con id y resultado, sin el DTO completo.', c: 'accent4' },
  ], { cols: 4, h: 3.0 });
  d.destacado(s, 'Mientras no haya login: solo datos ficticios y uso local de laboratorio.', { y: 5.0, fill: 'accent1' });

  s = d.slide('Producción', 'Integración continua con GitHub Actions',
    'Propuesta, todavía no incluida en el repositorio. Cada push y PR prepara un JDK 21, usa Maven Wrapper y ejecuta verify. En un repositorio con varias carpetas se define working-directory. Verificar el permiso de ejecución de mvnw en Linux. El proyecto no tiene configuradas pruebas de integración con Failsafe: verify no las inventa. Fuente: docs.github.com (Java con Maven).');
  d.codigo(s, 'name: ci\non: [push, pull_request]\njobs:\n  backend:\n    runs-on: ubuntu-latest\n    defaults:\n      run:\n        working-directory: kanban-backend\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-java@v4\n        with:\n          distribution: temurin\n          java-version: \'21\'\n          cache: maven\n      - run: chmod +x mvnw && ./mvnw -B verify', { w: 6.9, etiqueta: '.github/workflows/ci.yml (propuesta)', fontSize: 13 });
  d.bullets(s, ['Se ejecuta en cada push y Pull Request', 'Mismo JDK 21 que en el curso', 'La rama main protegida exige el check en verde', 'Agregar un job igual para el frontend: npm ci y ng test', 'CI prueba, pero no decide si el requisito es correcto'], { x: 7.8, y: Y0 + 0.1, w: 4.93, h: 5.0 });

  s = d.slide('Producción', 'Docker Compose para levantar todo junto',
    'Propuesta para una clase siguiente. Evita instalar PostgreSQL y crear usuarios a mano. Detalle clave: dentro del contenedor del backend, DB_HOST es "db" (el nombre del servicio), no localhost. Requiere además un Dockerfile para el backend (build del JAR con Java 21 y ejecución sin root). Un volumen conserva los datos de la base.');
  d.codigo(s, 'services:\n  db:\n    image: postgres:18\n    environment:\n      POSTGRES_DB: kanban_db\n      POSTGRES_USER: kanban\n      POSTGRES_PASSWORD: kanban   # solo laboratorio\n    volumes: [datos:/var/lib/postgresql]\n  backend:\n    build: ./kanban-backend\n    environment:\n      DB_HOST: db\n    ports: ["8083:8083"]\n    depends_on: [db]\nvolumes:\n  datos:', { w: 6.9, etiqueta: 'docker-compose.yml (propuesta)', fontSize: 13 });
  d.bullets(s, ['docker compose up levanta base y backend', 'DB_HOST: db, no localhost', 'El volumen conserva los datos', 'La clave del ejemplo es solo de laboratorio', 'En producción, los secretos vienen del entorno'], { x: 7.8, y: Y0 + 0.1, w: 4.93, h: 5.0 });

  s = d.slide('Producción', 'Despliegue propuesto',
    'Vista futura, no recursos creados. Angular puede publicarse en Vercel. Spring Boot necesita un host Java, como un Droplet de DigitalOcean: Vercel no ofrece Java entre sus runtimes oficiales de Functions. PostgreSQL puede estar en Supabase, conectado por JDBC con TLS. Supabase Free puede pausar proyectos inactivos; DigitalOcean tiene costo. Revisar precios y condiciones vigentes. Fuentes: vercel.com/docs, supabase.com/docs, digitalocean.com/pricing.');
  [['Navegador', 'Usuario', 'accent5'], ['Vercel', 'Angular compilado', 'accent4'], ['Droplet', 'Spring Boot · Java 21', 'text2'], ['Supabase', 'PostgreSQL gestionado', 'accent1']].forEach(([t, sub, c], i) => {
    const x = MX + i * 3.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: Y0 + 0.3, w: 2.7, h: 1.6, rectRadius: 0.1, fill: { color: C[c] }, line: { type: 'none' } });
    d.texto(s, [{ text: t, options: { fontSize: 20, bold: true, breakLine: true } }, { text: sub, options: { fontSize: 15 } }], { x: x + 0.15, y: Y0 + 0.3, w: 2.4, h: 1.6, color: C.background1, align: 'center', valign: 'middle' });
    if (i < 3) {
      d.flecha(s, x + 2.74, Y0 + 1.1, 0.32, 0);
      d.etiqueta(s, ['HTTPS', 'HTTPS / JSON', 'JDBC / TLS'][i], { x: x + 2.35, y: Y0 + 2.0, w: 1.1, h: 0.3, fontSize: 11 });
    }
  });
  d.cards(s, [
    { t: 'Credenciales solo en el backend', d: 'El navegador nunca recibe la conexión a la base.' },
    { t: 'Backend con alojamiento', d: 'Publicar Angular no publica el backend local.', c: 'accent3' },
    { t: 'Costos y condiciones', d: 'Planes gratuitos con límites; un Droplet tiene costo mensual.', c: 'accent4' },
  ], { cols: 3, y: 4.25, h: 2.3 });

  s = d.slide('Producción', 'Ruta sin costo y ruta con servidor',
    'No prometer un despliegue público completo gratuito solo con Vercel y Supabase: falta alojar el backend Java. Para conectar Java a Supabase: copiar la conexión desde el panel Connect, elegir conexión directa o pooler de sesión según la red (IPv4), configurar JDBC con TLS y un pool de conexiones acotado, y mantener credenciales y migraciones en el backend.');
  d.tabla(s, ['Ruta', 'Frontend', 'Backend', 'Base de datos', 'Alcance'], [
    ['Laboratorio', 'Local (ng serve)', 'Local (8083)', 'PostgreSQL local', 'Clase y desarrollo'],
    ['Demo parcial', 'Vercel', 'Local', 'Supabase Free', 'No es pública completa'],
    ['Demo completa', 'Vercel', 'Droplet (pagado)', 'Supabase', 'Pública: requiere presupuesto'],
  ], { colW: [2.3, 2.3, 2.4, 2.4, 2.73], rowH: 0.8 });
  d.destacado(s, 'Al terminar el curso: apagar y eliminar los recursos pagados para no generar cobros.', { y: 5.2 });

  s = d.slide('Ruta del curso', 'Ruta propuesta de clases',
    'Supuesto: sesiones de 120 minutos con trabajo autónomo entre clases; ajustar al calendario. Clase 3: API con estados. Clase 4: PR revisado. Clase 5: integración SQL. Clase 6: refactorización con pruebas. Clase 7: proteger el acceso. Clase 8: CI y Docker. Clase 9: desplegar y restaurar. Clase 10: demostrar una historia completa. El aprendizaje se evidencia por entregas, no por cantidad de herramientas.');
  d.flujo(s, [
    { t: 'Clases 3–4', d: 'Reglas del Kanban, historias, ramas y Pull Requests' },
    { t: 'Clases 5–6', d: 'Pruebas con PostgreSQL, concurrencia y refactorización' },
    { t: 'Clases 7–8', d: 'Seguridad, integración continua y contenedores' },
    { t: 'Clases 9–10', d: 'Despliegue, operación, restauración y demostración final', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.5, dSize: 15 });
  d.destacado(s, 'No cargar una sola clase con cloud, seguridad y Clean Architecture a la vez.', { y: 5.4 });

  s = d.slide('Ruta del curso', 'Qué sumar al proyecto, en orden',
    'Prioridad según el aprendizaje: primero lo que da más evidencia con menos complejidad. El control de concurrencia se resuelve con un bloqueo de fila común o con SERIALIZABLE y reintentos; @Version por sí solo no protege el máximo global entre tareas distintas.');
  d.cards(s, [
    { t: 'Transiciones explícitas', d: 'Refactor del ordinal con 9 pruebas parametrizadas.' },
    { t: 'GitHub Actions', d: 'mvnw verify y ng test en cada push y PR.', c: 'accent2' },
    { t: 'Docker Compose', d: 'Base y backend con un solo comando.', c: 'accent3' },
    { t: 'Testcontainers', d: 'Pruebas de integración contra PostgreSQL real.', c: 'accent4' },
    { t: 'Concurrencia del cupo', d: 'Bloqueo de fila o SERIALIZABLE, con prueba concurrente.', c: 'accent6' },
    { t: 'Spring Security', d: 'Login y autorización por tablero.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Evaluación', 'Evaluación por evidencias',
    'Rúbrica propuesta, ajustable a la pauta oficial del curso. Solicitar una defensa individual breve para distinguir comprensión de copia: pedir al alumno que cambie una condición pequeña y explique qué pruebas deben variar. Una ayuda de IA debe poder ser explicada, validada y corregida por quien entrega.');
  d.cifra(s, '40%', 'Comportamiento y criterios de aceptación', { x: MX, color: 'accent1' });
  d.cifra(s, '25%', 'Pruebas y calidad del código', { x: MX + 3.1, color: 'accent2' });
  d.cifra(s, '20%', 'Colaboración y revisión de cambios', { x: MX + 6.2, color: 'accent3' });
  d.cifra(s, '15%', 'Demostración y explicación de decisiones', { x: MX + 9.3, color: 'accent4' });
  d.tabla(s, ['Dimensión', 'Evidencia mínima', 'Pregunta al estudiante'], [
    ['Requisito', 'Criterio y caso alternativo', '¿Qué necesidad resuelve?'],
    ['Diseño', 'Diagrama coherente con el código', '¿Por qué esta responsabilidad aquí?'],
    ['Calidad', 'Pruebas de éxito y de rechazo', '¿Qué riesgo todavía no cubres?'],
    ['Entrega', 'README y configuración reproducible', '¿Cómo lo ejecuta otra persona?'],
  ], { y: 3.95, colW: [2.4, 4.6, 5.13], rowH: 0.56 });

  s = d.slide('Cierre', 'Qué debe poder explicar cada estudiante',
    'Ticket de salida: una respuesta de dos frases por tema. Respuestas clave: la validación comprueba forma y restricciones locales, la regla considera el estado del negocio; el service decide; un mock verifica la lógica aislada pero no la base real; el criterio aporta contexto, acción y resultado que guían la preparación, la ejecución y las aserciones de la prueba.');
  d.cards(s, [
    { t: 'Validación frente a regla', d: 'Por qué un 400 y un 409 son problemas distintos.' },
    { t: 'Dónde vive la regla', d: 'Qué capa decide si una tarea puede moverse y por qué la interfaz no basta.', c: 'accent2' },
    { t: 'Qué prueba un mock', d: 'Qué demuestra una prueba con mocks y qué deja pendiente.', c: 'accent3' },
    { t: 'Del criterio a la prueba', d: 'Cómo un Dado-Cuando-Entonces se convierte en un test.', c: 'accent4' },
  ], { cols: 2 });

  // ---------------------------------------------------------------- CIERRE
  d.seccion('Fuentes');
  s = d.slide('Fuentes', 'Referencias',
    'Fuentes verificadas al preparar el material (25-10-2026). Revisar versiones, precios y condiciones de las plataformas antes de cada curso.');
  d.panel(s, 'Ingeniería y diseño', [
    'SWEBOK · swebokwiki.org', 'UML 2.5.1 · omg.org/spec/UML', 'Modelo C4 · c4model.com', 'Hexagonal · alistair.cockburn.us',
    'Patrones · martinfowler.com/eaaCatalog', 'Twelve-Factor App · 12factor.net',
  ], { x: MX, w: 3.9, fontSize: 14 });
  d.panel(s, 'Proceso y equipo', [
    'Manifiesto Ágil · agilemanifesto.org', 'Scrum Guide · scrumguides.org', 'Kanban Guide · kanbanguides.org',
    'Conventional Commits · conventionalcommits.org', 'SemVer · semver.org',
  ], { x: MX + 4.12, w: 3.9, color: 'accent2', fontSize: 14 });
  d.panel(s, 'Tecnología y plataformas', [
    'OWASP Top 10 · owasp.org/Top10', 'PostgreSQL: aislamiento · postgresql.org/docs', 'GitHub Actions · docs.github.com',
    'Spring · docs.spring.io', 'Vercel · Supabase · DigitalOcean (documentación y precios)',
  ], { x: MX + 8.24, w: 3.9, color: 'accent1', fontSize: 14 });

  d.portada('DESARROLLO DE SOFTWARE II', 'Preguntas',
    'El código está en clase-03-crud · Guías en docs/\nPrimero lo general, luego el proyecto: cada tema deja una evidencia',
    'Cierre. Recordar el repositorio, las guías paso a paso (GUIA-COMPLETA-PASO-A-PASO.md y 08-guia-angular-paso-a-paso.md) y la ruta de clases.');
};
