// Genera docs/GUIA-COMPLETA-PASO-A-PASO.md leyendo los bloques de código de los archivos REALES de kanban-backend.
// Uso:  node docs/_build/build-guia.js          (genera)
//       node docs/_build/build-guia.js --check  (verifica que la guía coincide con los archivos)
const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..', '..');
const src = path.join(raiz, 'kanban-backend', 'src');
const salida = path.join(raiz, 'docs', 'GUIA-COMPLETA-PASO-A-PASO.md');
const plantilla = fs.readFileSync(path.join(__dirname, 'guia.template.md'), 'utf8');
const salidaNg = path.join(raiz, 'docs', '08-guia-angular-paso-a-paso.md');
const plantillaNg = fs.readFileSync(path.join(__dirname, 'guia-angular.template.md'), 'utf8');

const leer = (ruta) => fs.readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n').replace(/\n$/, '');

const M = 'main/java/cl/ipss/kanban/';
const T = 'test/java/cl/ipss/kanban/';

/* paso -> archivos. Cada uno: n (número), ruta, tipo, teoria, expl */
const archivos = {
  2: [
    { n: '2.1', ruta: M + 'enums/EstadoTarea.java', tipo: 'enum',
      teoria: 'Un **enum** es un conjunto **cerrado** de valores constantes. Evita "strings mágicos" como `"en curso"` o `"EnCurso"`: el compilador solo acepta valores que existen. Además, cada constante tiene un número de orden (`ordinal()`): 0, 1, 2…',
      expl: 'Las tres constantes son las **columnas del tablero**, en orden de izquierda a derecha. Ese orden **importa**: el service calcula si un movimiento es de un solo paso comparando `ordinal()` (`POR_HACER`=0, `EN_CURSO`=1, `HECHA`=2). Si reordenas las constantes, rompes la regla.' },
    { n: '2.2', ruta: M + 'enums/PrioridadTarea.java', tipo: 'enum',
      teoria: 'Otro **enum**: valores cerrados que la API acepta y devuelve como texto (`"ALTA"`).',
      expl: 'Define las prioridades. Angular las muestra como chips de color. Si el cliente envía un valor que no existe (`"URGENTE"`), Jackson falla y el handler responde **400**.' },
    { n: '2.3', ruta: M + 'entity/Tarea.java', tipo: 'class',
      teoria: 'Una **entity** es una clase cuyas instancias se guardan como filas de una tabla (JPA). Debe ser un **JavaBean**: constructor vacío + getters/setters. **Sin Lombok**, los escribimos a mano. Solo ponemos setters de lo que realmente se modifica: el `id` y las fechas de auditoría los maneja JPA.',
      expl: '- `@Entity` y `@Table(name = "tarea")`: la clase es la tabla `tarea`.\n- `@Id @GeneratedValue(strategy = IDENTITY)`: el `id` lo genera la base (la columna es `GENERATED ALWAYS AS IDENTITY`).\n- `@Column(nullable, length)`: refleja las restricciones de la tabla; Hibernate las **valida** al arrancar.\n- `@Enumerated(EnumType.STRING)`: guarda `"EN_CURSO"` y no el número 1 (más seguro si cambia el orden).\n- `@Column(name = "fecha_limite")`: mapea el nombre `camelCase` al `snake_case` de la columna.\n- `updatable = false` en `creadaEn`: la fecha de creación nunca cambia.\n- `@PrePersist` / `@PreUpdate`: métodos que JPA llama justo antes del INSERT / UPDATE para fijar las fechas (y el estado `POR_HACER` por defecto).\n- Constructor vacío: JPA lo exige para crear la entidad al leer de la base.' },
    { n: '2.4', ruta: M + 'repository/TareaRepository.java', tipo: 'interface',
      teoria: 'Un **repository** es la capa de acceso a datos. Es una **interface**: tú declaras qué quieres y **Spring Data genera la implementación** en tiempo de ejecución. Los *métodos derivados* se construyen leyendo el nombre del método.',
      expl: '- `extends JpaRepository<Tarea, Long>`: hereda `save`, `findById`, `findAll`, `deleteById`, `existsById`… (`Tarea` = entity, `Long` = tipo del id).\n- `@Repository`: lo marca como componente de acceso a datos.\n- `long countByEstado(EstadoTarea estado)`: Spring lo traduce a `SELECT COUNT(*) FROM tarea WHERE estado = ?`. Lo usa el service para aplicar el **límite de 3 en curso**.' },
  ],
  3: [
    { n: '3.1', ruta: M + 'dto/CrearTareaRequest.java', tipo: 'record',
      teoria: 'Un **record** es una clase **inmutable** que Java completa por ti (constructor, getters con el nombre del campo, `equals`, `toString`). Ideal para DTO. Las anotaciones de **Bean Validation** (`@NotBlank`, `@Size`…) declaran las reglas que el controller aplica con `@Valid`.',
      expl: '- `@NotBlank`: no nulo, no vacío y no solo espacios.\n- `@Size(max = 100)`: largo máximo (igual que `VARCHAR(100)`).\n- `@NotNull` en `prioridad`: obligatoria.\n- `descripcion` y `fechaLimite` no llevan `@NotNull`: son opcionales.\n- **No hay `estado`**: toda tarea nace `POR_HACER`; el cliente no decide eso.\n- El `message` es el texto que verá el usuario en el 400.' },
    { n: '3.2', ruta: M + 'dto/ActualizarTareaRequest.java', tipo: 'record',
      teoria: 'Un DTO distinto para editar: así cada operación declara **exactamente** los datos que acepta.',
      expl: 'Mismos campos y validaciones que al crear. **No incluye `estado`**: cambiar de columna se hace **solo** con `PATCH /api/tareas/{id}/estado`, donde se aplican las reglas del tablero.' },
    { n: '3.3', ruta: M + 'dto/MoverTareaRequest.java', tipo: 'record',
      teoria: 'Un DTO de **un solo campo**: la columna de destino. Un `PATCH` es una modificación **parcial** (a diferencia de `PUT`, que reemplaza los datos editables).',
      expl: '`@NotNull` evita que llegue `{}`. Si `estado` trae un texto que no es un `EstadoTarea`, Jackson no puede convertirlo y el handler responde **400**.' },
    { n: '3.4', ruta: M + 'dto/TareaResponse.java', tipo: 'record',
      teoria: 'El DTO de **salida**: lo que se serializa a JSON hacia Angular. Es la "Vista" de MVC en una API REST.',
      expl: 'Incluye el `id`, el `estado` y las fechas de auditoría (que el cliente nunca envía). Nunca se devuelve la entity directamente: así la API no queda atada a la tabla.' },
    { n: '3.5', ruta: M + 'exception/TareaNoEncontradaException.java', tipo: 'class',
      teoria: 'Una **excepción propia** representa un error de negocio con nombre. Extiende `RuntimeException` (no obliga a `try/catch`). **Siempre** declara `serialVersionUID`: sin él, Eclipse muestra una advertencia amarilla/roja.',
      expl: 'Se lanza cuando no existe una tarea con ese `id`. El handler la traduce a **404**. El constructor arma el mensaje.' },
    { n: '3.6', ruta: M + 'exception/LimiteEnCursoExcedidoException.java', tipo: 'class',
      teoria: 'Otra excepción de negocio: modela la regla del **límite de trabajo en curso (WIP)**.',
      expl: 'Se lanza al intentar entrar a `EN_CURSO` cuando ya hay 3. Recibe el límite para armar un mensaje claro. El handler la traduce a **409 Conflict**.' },
    { n: '3.7', ruta: M + 'exception/MovimientoInvalidoException.java', tipo: 'class',
      teoria: 'Excepción para un movimiento que viola la secuencia de columnas.',
      expl: 'Recibe origen y destino para que el mensaje diga exactamente qué se intentó (`POR_HACER a HECHA`). Se traduce a **409**.' },
    { n: '3.8', ruta: M + 'exception/TareaHechaNoEditableException.java', tipo: 'class',
      teoria: 'Excepción para la regla "una tarea hecha no se edita".',
      expl: 'Se lanza en `actualizar` si la tarea está `HECHA`. El mensaje sugiere la salida: moverla a *En curso*. Se traduce a **409**.' },
    { n: '3.9', ruta: M + 'exception/ApiError.java', tipo: 'record',
      teoria: 'Un **formato único de error**: así Angular siempre sabe cómo leer una falla, sea cual sea.',
      expl: 'Campos: `fecha`, `status`, `error`, `mensaje` y `detalles` (lista; se usa en los 400 para listar cada campo inválido). `de(...)` es un método estático de ayuda que pone la fecha actual.' },
    { n: '3.10', ruta: M + 'exception/GlobalExceptionHandler.java', tipo: 'class',
      teoria: '`@RestControllerAdvice` es un **Advice**: una clase que "aconseja" a **todos** los controllers sobre qué hacer cuando se lanza una excepción. Centraliza el manejo de errores.',
      expl: '- Cada `@ExceptionHandler` captura un tipo de excepción y devuelve un `ApiError`.\n- `@ResponseStatus` **no cambia** la respuesta (la arma `ResponseEntity`); sirve para que **Swagger documente** cada error **una sola vez** aquí, en lugar de repetirlo en cada endpoint.\n- **404** → `TareaNoEncontradaException`. **409** → las otras tres excepciones de negocio. **400** → validación (`MethodArgumentNotValidException`, con la lista en `detalles`) y JSON mal formado. **500** → cualquier otra (`Exception`), con `log.error` y la excepción completa.\n- 404 y 409 se registran en `debug` porque el service ya los dejó en `warn`.' },
  ],
  4: [
    { n: '4.1', ruta: M + 'mapper/TareaMapper.java', tipo: 'class',
      teoria: 'El patrón **Mapper** convierte entre DTO y Entity en un único lugar. Hay librerías que lo generan (MapStruct); aquí está **escrito a mano**, sin generación de código. `@Component` lo registra como **bean** de Spring.',
      expl: '- `aEntidad`: DTO de creación → `Tarea`. Limpia con `trim()` y **fija `POR_HACER`**.\n- `actualizarEntidad`: copia los datos editables sobre una entidad existente; **no toca el estado**.\n- `aRespuesta`: `Tarea` → `TareaResponse`.\n- `limpiar`: convierte texto vacío en `null` (la descripción en blanco no se guarda).' },
    { n: '4.2', ruta: M + 'service/TareaService.java', tipo: 'interface',
      teoria: 'Una **interface** es un contrato: lista **qué** operaciones existen sin decir **cómo**. El controller dependerá de esta interface (principio de inversión de dependencias).',
      expl: 'Seis operaciones, una por caso de uso (más `obtener`). `mover` recibe el estado de destino, no un DTO: el service no sabe de HTTP.' },
    { n: '4.3', ruta: M + 'service/impl/TareaServiceImpl.java', tipo: 'class',
      teoria: 'El **Service** es donde viven las **reglas de negocio**. `@Service` lo hace un bean (Singleton). Recibe el repository y el mapper por **constructor** (*inyección de dependencias*): Spring los entrega, tú no haces `new`. `@Transactional` ejecuta cada método en una transacción: si algo falla, se revierte.',
      expl: '- `@Transactional(readOnly = true)` en `listar` y `obtener`: solo leen.\n- **`mover` aplica las dos reglas**, en este orden:\n  1. *Un paso a la vez*: `Math.abs(destino.ordinal() - origen.ordinal()) != 1` → `MovimientoInvalidoException`. Esto rechaza saltar `POR_HACER → HECHA` **y** mover a la misma columna.\n  2. *Límite*: si el destino es `EN_CURSO` y `countByEstado(EN_CURSO) >= 3` → `LimiteEnCursoExcedidoException`. Aplica también al retroceder desde `HECHA`.\n- `actualizar`: si la tarea está `HECHA` → `TareaHechaNoEditableException`.\n- `buscar` (privado): `findById(...).orElseThrow(...)` y registra `warn` antes de lanzar el 404.\n- **Logs**: `info` en `command receive to ...` / `finish ...`; `warn` cuando rechaza algo.' },
  ],
  5: [
    { n: '5.1', ruta: M + 'config/SwaggerConfig.java', tipo: 'class',
      teoria: '`@Configuration` marca una clase que **define beans**. `@Bean` indica que el valor devuelto por el método se registra en Spring. springdoc lee el bean `OpenAPI` para dibujar Swagger UI.',
      expl: 'Solo personaliza la cabecera de Swagger: título, descripción y versión. Los endpoints los descubre solo springdoc a partir del controller.' },
    { n: '5.2', ruta: M + 'config/CorsConfig.java', tipo: 'class',
      teoria: '**CORS** es una protección del navegador: una página en `localhost:4200` no puede llamar a `localhost:8083` salvo que el servidor lo permita. (Con el proxy de Angular no hace falta, pero se deja configurado.)',
      expl: '- `@Value("${app.cors.allowed-origins}")`: lee el origen permitido del `application.yml` (variable `CORS_ORIGINS`).\n- Se permite `/api/**` con los verbos `GET, POST, PUT, **PATCH**, DELETE, OPTIONS`. **`PATCH` es imprescindible** aquí: es el verbo de mover tareas.' },
  ],
  6: [
    { n: '6.1', ruta: M + 'controller/TareaController.java', tipo: 'class',
      teoria: 'El **Controller** (la "C" de MVC) recibe la petición HTTP, **delega en el service** y devuelve el código correcto. **No contiene reglas de negocio.** `@RestController` = `@Controller` + `@ResponseBody` (devuelve JSON).',
      expl: '- `@RequestMapping("/api/tareas")`: prefijo común. `@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping`: un verbo HTTP cada uno.\n- `@PathVariable Long id`: toma el `{id}` de la URL. `@RequestBody`: convierte el JSON en el DTO. `@Valid`: ejecuta las validaciones del DTO (si fallan → 400).\n- `HttpServletRequest requestServlet` va **primero** en cada método y sirve para los logs: `start process endpoint: MÉTODO RUTA`, `response ...`, `end process endpoint: ...` (si hay error no llega a "end").\n- `crear` devuelve **201** con la cabecera `Location`; `eliminar` devuelve **204** sin cuerpo (`ResponseEntity.noContent()`).\n- `mover` es el `PATCH /{id}/estado`: pasa `request.estado()` al service.\n- `@Operation` documenta cada endpoint; `@ApiResponse` solo para 201 y 204. Los errores se documentan **una vez** en el handler.' },
  ],
  7: [
    { n: '7.1', ruta: T + 'service/TareaServiceImplTest.java', tipo: 'class',
      teoria: 'Un **test unitario** prueba una sola clase aislada. **Mockito** crea un repository *falso* (`@Mock`) para no necesitar base de datos. `@ExtendWith(MockitoExtension.class)` activa Mockito en JUnit 5. `ReflectionTestUtils.setField(t, "id", 1L)` simula el `id` que asignaría la base (la entity no tiene `setId`).',
      expl: 'Cada `@Test` cubre una regla: creación en `POR_HACER`, 404, edición, **hecha no editable**, movimiento feliz, **cuarta tarea en curso (límite)**, **salto inválido**, misma columna, retroceso con cupo, retroceso sin revisar límite, mover inexistente y eliminar. `when(...).thenReturn(...)` programa al mock; `verify(repository, never()).save(any())` comprueba que **no** se guardó nada al rechazar.' },
    { n: '7.2', ruta: T + 'controller/TareaControllerTest.java', tipo: 'class',
      teoria: '`@WebMvcTest` levanta **solo la capa web** (rutas, validaciones, JSON y códigos HTTP). El service se reemplaza con `@MockitoBean`. `MockMvc` simula peticiones sin abrir un puerto.',
      expl: 'Verifica los códigos: **200** al listar y mover, **201** con `Location` al crear, **400** con título vacío (y con estado desconocido), **404** inexistente y **409** tanto por límite como por movimiento inválido, además del formato `ApiError` (`$.mensaje`, `$.status`, `$.detalles[0]`).' },
  ],
};

const pasoDe = { 2: 'Paso 2', 3: 'Paso 3', 4: 'Paso 4', 5: 'Paso 5', 6: 'Paso 6', 7: 'Paso 7' };

function paquete(ruta) {
  const m = ruta.match(/java\/(cl\/ipss\/kanban(?:\/[a-z]+)*)\//);
  return m[1].replace(/\//g, '.');
}

function bloqueArchivo(a) {
  const codigo = leer(path.join(src, a.ruta));
  const pkg = paquete(a.ruta);
  const carpeta = 'src/' + a.ruta.replace(/^main\//, 'main/').replace(/\/[^/]+$/, '');
  const nombre = path.basename(a.ruta, '.java');
  const tipoIde = { class: 'Class', interface: 'Interface', enum: 'Enum', record: 'Record' }[a.tipo];
  const esTest = a.ruta.startsWith('test/');
  return [
    `### 🧩 Archivo ${a.n} · \`${nombre}\` (${a.tipo})`,
    '',
    `**① Crear el paquete** (si aún no existe): \`${pkg}\``,
    '',
    `- IntelliJ: clic derecho sobre \`${esTest ? 'src/test/java' : 'src/main/java'}\` → *New → Package*.`,
    `- VS Code: en el explorador, clic derecho en \`${esTest ? 'src/test/java' : 'src/main/java'}\` → *New Folder* y escribe la ruta con \`/\` (\`${pkg.replace(/\./g, '/')}\`).`,
    '',
    `**② Crear el archivo** \`${nombre}.java\` en \`${carpeta}\`:`,
    '',
    '| IDE | Cómo |',
    '|---|---|',
    `| **IntelliJ** | Clic derecho en el paquete → *New → Java Class* → nombre \`${nombre}\` → elige **${tipoIde}** |`,
    `| **VS Code** | Clic derecho en la carpeta → *New File* → \`${nombre}.java\` (el servicio de Java sugiere la estructura) |`,
    '',
    '**③ Código completo** (primera línea: `package`):',
    '',
    `<!-- archivo: ${a.ruta} -->`,
    '```java',
    codigo,
    '```',
    '',
    '**④ Teoría**',
    '',
    a.teoria,
    '',
    '**⑤ Explicación del código**',
    '',
    a.expl,
    '',
  ].join('\n');
}

function expandir(texto) {
  texto = texto.replace(/\{\{FILES:(\d)\}\}/g, (_, p) => archivos[p].map(bloqueArchivo).join('\n'));
  texto = texto.replace(/\{\{CODE:([^}]+)\}\}/g, (_, rel) => {
    const ruta = rel.startsWith('../') ? path.join(raiz, 'kanban-backend', rel.slice(3)) : path.join(src, rel);
    const ext = path.extname(ruta).slice(1);
    const lang = { yml: 'yaml', sql: 'sql', java: 'java' }[ext] || '';
    return `<!-- archivo: ${path.relative(path.join(raiz, 'kanban-backend'), ruta).replace(/\\/g, '/')} -->\n\`\`\`${lang}\n${leer(ruta)}\n\`\`\``;
  });
  return texto;
}

function expandirNg(texto) {
  return texto.replace(/\{\{NG:([^}]+)\}\}/g, (_, rel) => {
    const ruta = path.join(raiz, 'kanban-frontend', rel);
    const lang = { ts: 'typescript', html: 'html', css: 'css', json: 'json' }[path.extname(ruta).slice(1)] || '';
    return `<!-- archivo: ${rel} -->\n\`\`\`${lang}\n${leer(ruta)}\n\`\`\``;
  });
}

function bloquesDe(md) {
  const re = /<!-- archivo: ([^\n]+) -->\n```[a-z]*\n([\s\S]*?)\n```/g;
  const out = [];
  let m;
  while ((m = re.exec(md))) out.push({ ruta: m[1], codigo: m[2] });
  return out;
}

if (process.argv.includes('--check')) {
  let mal = 0, total = 0;
  for (const [archivo, esNg] of [[salida, false], [salidaNg, true]]) {
    const bloques = bloquesDe(fs.readFileSync(archivo, 'utf8').replace(/\r\n/g, '\n'));
    for (const b of bloques) {
      const real = esNg ? path.join(raiz, 'kanban-frontend', b.ruta)
        : (b.ruta.startsWith('src/') || b.ruta === 'crear-bd.sql' ? path.join(raiz, 'kanban-backend', b.ruta) : path.join(src, b.ruta));
      const ok = leer(real) === b.codigo;
      total++;
      if (!ok) mal++;
      console.log((ok ? 'IGUAL    ' : 'DISTINTO ') + b.ruta);
    }
  }
  console.log(`\n${total} bloques comprobados, ${mal} distintos`);
  process.exit(mal ? 1 : 0);
} else {
  fs.writeFileSync(salida, expandir(plantilla), 'utf8');
  fs.writeFileSync(salidaNg, expandirNg(plantillaNg), 'utf8');
  console.log('Guías generadas');
}
