// PARTE I · Desarrollo de software en general
const { MX, CW, Y0, YEND } = require('./lib');

module.exports = function parte1(d) {
  const { pres, C } = d;

  // ---------------------------------------------------------------- PORTADA
  d.seccion('Inicio');
  d.portada('IPSS · DESARROLLO DE SOFTWARE II',
    'Desarrollo de software',
    'Teoría, buenas prácticas y su aplicación al proyecto Kanban\nJava 21 · Spring Boot 3.5 · PostgreSQL 18 · Angular 21',
    'Presentación única que reúne la ruta docente, la clase 3 del Kanban y la ingeniería de software con diagramas. Parte I: el desarrollo de software en general, sección por sección. Parte II: cómo cada tema se aplica al proyecto Kanban que construimos. No es necesario dictarla completa en una sesión: cada sección funciona como bloque independiente.');

  let s = d.slide('Cómo leer esta presentación', 'Primero lo general, luego el proyecto',
    'La Parte I explica la teoría de cada área del desarrollo de software. La Parte II aplica esa misma teoría al tablero Kanban (backend Spring Boot, base PostgreSQL y frontend Angular). Cada sección abre con una diapositiva oscura con su número.');
  d.panel(s, 'Parte I · General', [
    '1 · Fundamentos y ciclo de vida', '2 · Requisitos', '3 · Metodologías de trabajo', '4 · Modelado y diagramas',
    '5 · Arquitectura', '6 · Diseño y clean code', '7 · Pruebas', '8 · Git y control de versiones',
    '9 · DevOps', '10 · Servidores y despliegue', '11 · Seguridad', '12 · Datos y operación', '13 · Lo que suele olvidarse',
  ], { x: MX, w: 5.9, fontSize: 14, paraSpaceAfter: 2 });
  d.panel(s, 'Parte II · Proyecto Kanban', [
    '14 · El proyecto y sus reglas', '15 · Del requisito al código', '16 · Backend en capas', '17 · Base de datos y concurrencia',
    '18 · Frontend Angular', '19 · Calidad y pruebas', '20 · Trabajo en equipo', '21 · Producción y ruta del curso',
  ], { x: MX + 6.23, w: 5.9, color: 'accent1', fontSize: 14, paraSpaceAfter: 2 });

  // ---------------------------------------------------------------- 1 FUNDAMENTOS
  d.seccion('1 · Fundamentos');
  d.divisor('01', 'Fundamentos', 'Qué es un buen resultado en software y cuál es el ciclo que siguen todos los proyectos, sin importar la metodología.');

  s = d.slide('Fundamentos', 'Qué significa un buen resultado',
    'El software no se evalúa solo porque compila. Separar la calidad funcional (hace lo pedido) de los atributos de calidad (cómo lo hace). Ejemplo del Kanban: impedir la cuarta tarea en curso es una regla (corrección); explicar el 409 con un mensaje claro es una cualidad del contrato; poder restaurar la base es una capacidad operativa.');
  d.cards(s, [
    { t: 'Valor', d: 'Resuelve una necesidad real y verificable de un usuario. Si nadie lo usa, no importa lo bien escrito que esté.', c: 'accent1' },
    { t: 'Corrección', d: 'Cumple las reglas del negocio, también cuando la entrada es inválida o algo falla.', c: 'accent2' },
    { t: 'Mantenibilidad', d: 'Se puede cambiar una regla con impacto acotado y con pruebas que avisan si algo se rompe.', c: 'accent3' },
    { t: 'Operación', d: 'Se puede desplegar, observar, escalar y recuperar cuando ocurre un incidente.', c: 'accent4' },
  ], { cols: 4, h: 3.2 });
  d.destacado(s, 'Un proyecto profesional se juzga por las cuatro dimensiones, no solo por "funciona en mi máquina".', { y: 5.3 });

  s = d.slide('Fundamentos', 'El ciclo de vida del software',
    'Todas las metodologías recorren estas fases. Lo que cambia es cuántas veces se da la vuelta: una sola vez y larga (cascada) o muchas vueltas cortas (ágil). El ciclo es iterativo: lo aprendido en operación genera nuevos requisitos.');
  d.flujo(s, [
    { t: 'Requisitos', d: 'Qué se construye y para quién' },
    { t: 'Análisis y diseño', d: 'Modelos, arquitectura y decisiones' },
    { t: 'Construcción', d: 'Código, revisiones y control de versiones' },
    { t: 'Pruebas', d: 'Evidencia de que funciona' },
    { t: 'Despliegue', d: 'Llevarlo a los usuarios' },
    { t: 'Operación', d: 'Monitorear, corregir y mejorar', c: 'accent1' },
  ], { y: Y0 + 0.4, tSize: 15, dh: 1.2 });
  d.flecha(s, 12.0, 4.55, -10.6, 0, { flipH: true, color: 'accent1', dash: true });
  d.etiqueta(s, 'Retroalimentación: la operación y los usuarios generan nuevos requisitos', { x: MX, y: 4.7, w: CW, h: 0.35, fontSize: 14, color: C.accent1, bold: true });
  d.destacado(s, 'No es una cascada rígida: un hallazgo en pruebas puede obligar a volver al diseño.', { y: 5.6 });

  s = d.slide('Fundamentos', 'Las áreas de la ingeniería de software',
    'Basado en las áreas de conocimiento de SWEBOK (IEEE Computer Society). Sirve como mapa: un desarrollador profesional necesita al menos nociones de todas, aunque se especialice en una o dos.');
  d.cards(s, [
    { t: 'Requisitos', d: 'Descubrir, acordar y documentar qué se necesita.' },
    { t: 'Arquitectura y diseño', d: 'Estructura, responsabilidades y dependencias.', c: 'accent2' },
    { t: 'Construcción', d: 'Programar con calidad: clean code, revisiones.', c: 'accent3' },
    { t: 'Pruebas', d: 'Buscar diferencias entre lo esperado y lo obtenido.', c: 'accent4' },
    { t: 'Configuración', d: 'Versiones, ramas, builds y entregas (Git, CI).', c: 'accent4' },
    { t: 'Operación y mantenimiento', d: 'Desplegar, observar, corregir y evolucionar.', c: 'accent3' },
    { t: 'Gestión del proceso', d: 'Metodología, planificación, riesgos y equipo.', c: 'accent2' },
    { t: 'Calidad y seguridad', d: 'Atributos medibles y protección de datos.' },
  ], { cols: 4, tSize: 15, dSize: 14 });

  // ---------------------------------------------------------------- 2 REQUISITOS
  d.seccion('2 · Requisitos');
  d.divisor('02', 'Requisitos', 'Antes de la arquitectura hay que saber qué se construye y para quién. Los requisitos no funcionales son los que deciden la arquitectura.');

  s = d.slide('Requisitos', 'Tipos de requisitos',
    'Distinguir la necesidad de la solución técnica. "Usar Java 21" es una restricción del curso, no una necesidad del usuario. Declarar explícitamente lo que queda fuera de alcance evita malentendidos: cambiar esas fronteras exige historias nuevas.');
  d.tabla(s, ['Tipo', 'Qué es', 'Ejemplo'], [
    ['Funcional', 'Lo que el sistema hace', 'Crear y mover una tarea'],
    ['No funcional (atributo de calidad)', 'Cómo lo hace: rendimiento, seguridad, disponibilidad, usabilidad', 'Responder en menos de 300 ms con 100 usuarios'],
    ['Regla de negocio', 'Política que restringe lo permitido', 'Máximo 3 tareas en curso'],
    ['Restricción', 'Condición impuesta al proyecto', 'Java 21 y PostgreSQL'],
    ['Fuera de alcance', 'Lo que explícitamente no se hará ahora', 'Login y múltiples tableros'],
  ], { colW: [3.2, 5.0, 3.93], rowH: 0.62 });
  d.destacado(s, 'Un requisito vale cuando se puede verificar: si no sabes cómo probarlo, todavía no está claro.', { y: 5.95 });

  s = d.slide('Requisitos', 'Historias de usuario y criterios de aceptación',
    'La historia comunica la necesidad y el beneficio. El criterio de aceptación la convierte en un comportamiento verificable. El formato Dado-Cuando-Entonces (Gherkin) precisa contexto, acción y resultado y se traduce casi directo a una prueba automatizada. No todas las historias necesitan ese formato.');
  d.caja(s, 'HISTORIA DE USUARIO', { x: MX, y: Y0, w: 5.6, h: 0.55, fill: 'accent1', fontSize: 14 });
  const rojo = { bold: true, color: C.accent1 };
  d.texto(s, [
    { text: 'Como ' }, { text: '<rol>', options: rojo }, { text: ',', options: { breakLine: true } },
    { text: 'quiero ' }, { text: '<acción>', options: rojo }, { text: ',', options: { breakLine: true } },
    { text: 'para ' }, { text: '<beneficio>', options: rojo }, { text: '.' },
  ], { x: MX, y: Y0 + 0.75, w: 5.6, h: 1.5, fontSize: 22 });
  d.bullets(s, ['Pequeña: se termina en un Sprint', 'Independiente y negociable', 'Escrita desde el usuario, no desde la tecnología', 'Lleva sus criterios de aceptación'], { x: MX, y: 4.55, w: 5.6, h: 2.1 });
  [['DADO', 'el contexto inicial', 'que hay 3 tareas en curso'], ['CUANDO', 'la acción del usuario', 'intento iniciar otra tarea'], ['ENTONCES', 'el resultado observable', 'recibo 409 y la tarea no cambia']].forEach(([k, q, ej], i) => {
    const y = Y0 + i * 1.65;
    d.caja(s, k, { x: 6.8, y, w: 1.9, h: 1.35, fill: ['text2', 'accent4', 'accent2'][i], fontSize: 16 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.85, y, w: 3.88, h: 1.35, rectRadius: 0.08, fill: { color: C.background2 }, line: { type: 'none' } });
    d.texto(s, [{ text: q, options: { fontSize: 13, color: C.accent5, breakLine: true } }, { text: ej, options: { fontSize: 16, bold: true, color: C.text2 } }], { x: 9.05, y: y + 0.15, w: 3.5, h: 1.1, valign: 'middle' });
  });

  s = d.slide('Requisitos', 'Atributos de calidad medibles',
    '"Debe ser rápido" no es un requisito. Hay que definir escenario, carga, entorno, medida y umbral, y acordarlos con los interesados: no se deducen del framework. Un atributo de calidad puede cambiar la arquitectura: una regla global (como un cupo) bajo concurrencia exige coordinar transacciones aunque el endpoint sea pequeño.');
  d.tabla(s, ['Atributo', 'Pregunta de diseño', 'Cómo comprobarlo'], [
    ['Rendimiento', '¿Qué carga debe soportar y con qué tiempo de respuesta?', 'Prueba de carga y percentil 95 acordado'],
    ['Disponibilidad', '¿Cuánto tiempo puede estar caído?', 'Monitoreo y objetivo (ej. 99,5 %)'],
    ['Seguridad', '¿Quién puede ver o cambiar cada dato?', 'Pruebas de autorización por recurso'],
    ['Integridad', '¿Se respetan las reglas con accesos simultáneos?', 'Prueba concurrente contra la base real'],
    ['Usabilidad y accesibilidad', '¿Lo puede usar cualquier persona?', 'Pruebas con usuarios y pautas WCAG'],
    ['Recuperación', '¿Podemos restaurar los datos y volver a operar?', 'Ensayo de restauración del respaldo'],
  ], { colW: [3.0, 5.0, 4.13], rowH: 0.62 });

  s = d.slide('Requisitos', 'Trazabilidad: del requisito a la prueba',
    'Seguir un requisito hasta su verificación evita que el diseño quede desconectado y permite saber qué pruebas cambiar cuando cambia una regla. En la Parte II aplicamos esta cadena a la regla del límite de 3 tareas en curso.');
  d.flujo(s, [
    { t: 'Requisito', d: 'La regla o necesidad, con un identificador (R-01, R-02…)' },
    { t: 'Criterio', d: 'Dado-Cuando-Entonces verificable' },
    { t: 'Modelo', d: 'Diagrama que muestra la regla (estado, secuencia)' },
    { t: 'Código', d: 'El método que la implementa' },
    { t: 'Prueba', d: 'El test que la demuestra', c: 'accent1' },
  ], { y: Y0 + 0.5, dh: 1.4 });
  d.destacado(s, 'Si un requisito no tiene prueba, nadie sabe si sigue cumpliéndose después del próximo cambio.', { y: 5.4 });

  // ---------------------------------------------------------------- 3 METODOLOGÍAS
  d.seccion('3 · Metodologías');
  d.divisor('03', 'Metodologías de trabajo', 'Cómo se organiza el equipo para entregar: cascada, ágil, Scrum, Kanban y prácticas técnicas que las acompañan.');

  s = d.slide('Metodologías', 'Cascada frente a ágil',
    'Cascada recorre las fases una vez, en orden, con requisitos fijos. Funciona cuando el problema es estable y conocido (por ejemplo, obras con normas). Ágil trabaja en iteraciones cortas y entrega incrementos usables para descubrir errores temprano. La agilidad no equivale a improvisar ni a eliminar la documentación.');
  d.tabla(s, ['Aspecto', 'Cascada (tradicional)', 'Ágil'], [
    ['Requisitos', 'Fijos y completos al inicio', 'Cambian y se priorizan continuamente'],
    ['Entregas', 'Una sola, al final', 'Frecuentes, cada 1 a 4 semanas'],
    ['Riesgo', 'Se descubre tarde', 'Se descubre temprano'],
    ['Cliente', 'Participa al inicio y al final', 'Participa en cada iteración'],
    ['Documentación', 'Extensa y previa', 'La necesaria para mantener el producto'],
    ['Cuándo conviene', 'Problema estable y conocido', 'Incertidumbre y cambio frecuente'],
  ], { colW: [2.6, 4.75, 4.78], rowH: 0.6 });

  s = d.slide('Metodologías', 'El Manifiesto Ágil',
    'Publicado en 2001. Valora más lo de la izquierda, sin negar el valor de lo de la derecha. Además define 12 principios, como entregar software funcionando frecuentemente, aceptar cambios y mantener un ritmo sostenible. Fuente: agilemanifesto.org/iso/es/manifesto.html');
  d.cards(s, [
    { t: 'Individuos e interacciones', d: 'sobre procesos y herramientas' },
    { t: 'Software funcionando', d: 'sobre documentación extensiva', c: 'accent2' },
    { t: 'Colaboración con el cliente', d: 'sobre negociación contractual', c: 'accent3' },
    { t: 'Respuesta ante el cambio', d: 'sobre seguir un plan', c: 'accent4' },
  ], { cols: 4, h: 2.2, dSize: 16 });
  d.bullets(s, [
    'Entregar una función pequeña que alguien pueda usar.',
    'Obtener retroalimentación antes de ampliar el alcance.',
    'Cambiar el plan cuando aparecen datos nuevos.',
    'Documentar las decisiones que ayudan a mantener el producto.',
  ], { x: MX, y: 4.2, w: CW, h: 2.4, fontSize: 17 });

  s = d.slide('Metodologías', 'Scrum: roles y artefactos',
    'Scrum es un marco ligero para problemas complejos (Scrum Guide 2020). El Scrum Master no es un jefe que asigna tareas: ayuda al equipo a ser efectivo. Cada artefacto tiene un compromiso: Product Backlog → Product Goal; Sprint Backlog → Sprint Goal; Incremento → Definition of Done. Fuente: scrumguides.org');
  d.cards(s, [
    { t: 'Product Owner', d: 'Maximiza el valor: ordena el Product Backlog según prioridad.' },
    { t: 'Scrum Master', d: 'Ayuda al equipo a mejorar su forma de trabajar y quita obstáculos.' },
    { t: 'Developers', d: 'Construyen un incremento utilizable en cada Sprint.' },
    { t: 'Product Backlog', d: 'Lista ordenada de todo lo que podría hacerse en el producto.', c: 'accent2' },
    { t: 'Sprint Backlog', d: 'Objetivo del Sprint y el trabajo elegido para lograrlo.', c: 'accent2' },
    { t: 'Incremento', d: 'Resultado usable que cumple la Definition of Done.', c: 'accent2' },
  ], { cols: 3 });

  s = d.slide('Metodologías', 'Scrum: el Sprint y sus eventos',
    'El Sprint dura un mes o menos y contiene todos los eventos. La Daily dura 15 minutos y la hacen los Developers para inspeccionar el avance hacia el objetivo. La Review mira el producto con los interesados; la Retrospectiva mira el proceso. En el curso se puede simular un Sprint de una semana: si se omiten eventos, llamarlo adaptación didáctica.');
  d.flujo(s, [
    { t: 'Sprint Planning', d: 'Acordar el objetivo del Sprint y el trabajo para lograrlo.' },
    { t: 'Daily Scrum', d: '15 minutos diarios: ¿cómo vamos hacia el objetivo?' },
    { t: 'Sprint Review', d: 'Mostrar el incremento y recibir retroalimentación.' },
    { t: 'Retrospectiva', d: 'Acordar una mejora concreta del proceso.', c: 'accent1' },
  ], { y: Y0 + 0.4, dh: 1.3, dSize: 15 });
  d.destacado(s, 'Sprint ≤ 1 mes · Lo aprendido entra en el siguiente Sprint · Review = producto · Retro = proceso', { y: 5.4 });

  s = d.slide('Metodologías', 'Kanban: gestionar el flujo de trabajo',
    'Kanban (Kanban Guide 2025) gestiona el flujo de valor. WIP = trabajo en progreso. Tiempo de ciclo: desde que se inicia hasta que termina una tarea. Throughput: tareas terminadas por unidad de tiempo. Antigüedad: cuánto lleva abierta una tarea iniciada. El límite de 3 del proyecto es una política del ejercicio, no una regla universal de Kanban.');
  d.cards(s, [
    { t: 'Visualizar', d: 'Un tablero con columnas que muestran el estado de cada trabajo y las políticas para avanzar.' },
    { t: 'Limitar el WIP', d: 'Poner un máximo de trabajo iniciado: obliga a terminar antes de empezar otra cosa.', c: 'accent2' },
    { t: 'Medir', d: 'Tiempo de ciclo, throughput y antigüedad del trabajo en curso.', c: 'accent3' },
    { t: 'Mejorar', d: 'Ajustar las políticas a partir de los datos, en pasos pequeños.', c: 'accent4' },
  ], { cols: 4, h: 3.0 });
  d.destacado(s, 'Nuestro proyecto modela justamente esto: columnas Por hacer → En curso → Hecha con un límite de 3 en curso.', { y: 5.1 });

  s = d.slide('Metodologías', 'Agile, Scrum, Kanban, XP y Lean no son lo mismo',
    'No son alternativas equivalentes: Agile expresa valores, Scrum es un marco, Kanban una estrategia de flujo y XP un conjunto de prácticas técnicas. Se combinan: muchos equipos usan Scrum con un tablero Kanban y prácticas de XP. Un tablero visual por sí solo no demuestra agilidad.');
  d.tabla(s, ['Enfoque', 'Qué es', 'Qué aporta'], [
    ['Agile', 'Valores y principios', 'Entregas pequeñas con retroalimentación'],
    ['Scrum', 'Marco con roles, eventos y artefactos', 'Ritmo de Sprints, objetivo e inspección'],
    ['Kanban', 'Estrategia de gestión del flujo', 'Visualizar, limitar WIP y medir'],
    ['XP (Extreme Programming)', 'Prácticas técnicas', 'TDD, pair programming, integración continua'],
    ['Lean', 'Filosofía de eliminar desperdicio', 'Foco en valor y flujo'],
  ], { colW: [3.2, 4.4, 4.53], rowH: 0.65 });

  s = d.slide('Metodologías', 'Definition of Done y estimación',
    'La Definition of Done es un estándar de calidad común a todas las historias; los criterios de aceptación son específicos de cada historia. Para estimar se usan puntos de historia (esfuerzo relativo) y Planning Poker. La velocidad sirve para planificar, no para comparar equipos. Nunca medir productividad por líneas de código o cantidad de commits.');
  d.panel(s, 'Definition of Done (ejemplo)', [
    'Cumple los criterios de aceptación', 'Compila y pasa todas las pruebas', 'Revisado por un compañero (PR)',
    'Migración nueva si cambió el esquema', 'Sin secretos en el repositorio', 'Documentación actualizada',
  ], { x: MX, w: 5.9 });
  d.panel(s, 'Estimación', [
    'Puntos de historia: esfuerzo relativo, no horas', 'Planning Poker: estimar en equipo y discutir diferencias',
    'Velocidad: puntos terminados por Sprint', 'Dividir historias grandes en pequeñas', 'No medir por líneas de código ni commits',
  ], { x: MX + 6.23, w: 5.9, color: 'accent2' });

  // ---------------------------------------------------------------- 4 MODELADO
  d.seccion('4 · Modelado');
  d.divisor('04', 'Modelado y diagramas', 'Un diagrama sirve para revisar una decisión antes de programarla. Se dibuja el mínimo modelo que aclare la pregunta.');

  s = d.slide('Modelado', 'Qué diagrama responde cada pregunta',
    'No se trata de dibujar por cumplir. UML ofrece notaciones de estructura y comportamiento; C4 ofrece niveles de zoom para la arquitectura. Escoger el mínimo modelo que aclare una decisión y mantenerlo coherente con el código.');
  d.tabla(s, ['Pregunta', 'Diagrama', 'Decisión que permite revisar'], [
    ['¿Quién usa qué?', 'Casos de uso · Contexto C4', 'Alcance y actores'],
    ['¿Qué piezas colaboran?', 'Contenedores C4 · Clases UML', 'Responsabilidades y dependencias'],
    ['¿Qué ocurre y en qué orden?', 'Secuencia UML', 'Mensajes y manejo de errores'],
    ['¿Qué estados atraviesa algo?', 'Estados UML', 'Transiciones y condiciones (guardas)'],
    ['¿Qué se guarda?', 'Modelo entidad-relación', 'Integridad de los datos'],
    ['¿Dónde corre?', 'Despliegue', 'Servidores, red y operación'],
  ], { colW: [3.6, 4.0, 4.53], rowH: 0.6 });

  s = d.slide('Modelado', 'UML: diagrama de casos de uso',
    'Responde qué necesita poder hacer el usuario. El actor es un rol externo. Cada óvalo es un objetivo, nombrado con un verbo. «include» incorpora el comportamiento de otro caso; «extend» añade comportamiento bajo una condición en un punto de extensión definido. Frecuencia u opcionalidad por sí solas no deciden la relación, y un error no es automáticamente una extensión: suele documentarse como flujo alternativo. Fuente: OMG UML 2.5.1.');
  d.cards(s, [
    { t: 'Actor', d: 'El "monito". Un rol que usa el sistema desde afuera (persona u otro sistema).' },
    { t: 'Caso de uso', d: 'Un óvalo: un objetivo del usuario con un verbo, como "Mover tarea".', c: 'accent2' },
    { t: 'Límite del sistema', d: 'Rectángulo que separa lo que construimos de lo externo.', c: 'accent3' },
    { t: 'Relaciones', d: 'Asociación (participa), «include» (incorpora) y «extend» (agrega bajo condición).', c: 'accent4' },
  ], { cols: 4, h: 2.8 });
  d.destacado(s, 'Cada caso de uso principal suele terminar como un endpoint y un método del service.', { y: 4.85 });

  s = d.slide('Modelado', 'Modelo C4: niveles de zoom de la arquitectura',
    'C4 (Simon Brown) describe la arquitectura con cuatro niveles, como un mapa con zoom. Un "contenedor" C4 es una unidad ejecutable o un almacén de datos (una app web, una API, una base de datos); no significa necesariamente Docker. Fuente: c4model.com');
  d.cards(s, [
    { t: '1 · Contexto', n: 'C1', d: 'El sistema completo, sus usuarios y los sistemas externos. Sin tecnología.' },
    { t: '2 · Contenedores', n: 'C2', d: 'Aplicaciones y almacenes: frontend, API, base de datos y cómo se comunican.', c: 'accent2' },
    { t: '3 · Componentes', n: 'C3', d: 'Piezas dentro de un contenedor: controller, service, repository.', c: 'accent3' },
    { t: '4 · Código', n: 'C4', d: 'Clases e interfaces. Normalmente se genera desde el código o se omite.', c: 'accent4' },
  ], { cols: 4, h: 2.9 });
  d.destacado(s, 'Empieza por contexto y contenedores: son los diagramas que más se consultan.', { y: 4.95 });

  s = d.slide('Modelado', 'UML: clases, secuencia y estados',
    'Clases: estructura estática; atributos, métodos y relaciones (asociación, herencia, realización de interfaces). Secuencia: mensajes entre participantes en orden temporal; muestra también los caminos de error. Estados: los estados de un objeto y las transiciones permitidas, con guardas entre corchetes, por ejemplo [hay cupo].');
  d.cards(s, [
    { t: 'Clases', d: 'Qué clases existen y cómo se relacionan.\n\nFlecha con triángulo hueco: herencia o realización.\nLínea simple: asociación (una clase conoce a otra).' },
    { t: 'Secuencia', d: 'Quién llama a quién y en qué orden.\n\nLíneas verticales: tiempo de vida.\nFlecha continua: llamada; punteada: respuesta.', c: 'accent2' },
    { t: 'Estados', d: 'Qué estados atraviesa un objeto.\n\nFlecha: transición permitida.\n[guarda]: condición para que ocurra.', c: 'accent3' },
  ], { cols: 3, h: 3.6 });

  // ---------------------------------------------------------------- 5 ARQUITECTURA
  d.seccion('5 · Arquitectura');
  d.divisor('05', 'Arquitectura', 'Las decisiones difíciles de cambiar después: cómo se divide el sistema, cómo se comunican sus partes y dónde viven los datos.');

  s = d.slide('Arquitectura', 'Qué es la arquitectura de software',
    'La arquitectura es el conjunto de decisiones estructurales que son costosas de revertir. Se elige por requisitos, riesgos, capacidad del equipo y reversibilidad, no por prestigio ni por plantilla universal.');
  d.cards(s, [
    { t: 'Decisiones difíciles de cambiar', d: 'Lenguaje, división en partes, forma de persistir, forma de comunicarse.' },
    { t: 'Responsabilidades y dependencias', d: 'Qué hace cada parte y de quién depende. El objetivo: bajo acoplamiento, alta cohesión.', c: 'accent2' },
    { t: 'Guiada por atributos de calidad', d: 'Rendimiento, seguridad o disponibilidad cambian la solución más que las funciones.', c: 'accent3' },
  ], { cols: 3, h: 2.6 });
  d.destacado(s, 'Una figura en un diagrama no demuestra la arquitectura: las dependencias reales del código sí.', { y: 4.7 });

  s = d.slide('Arquitectura', 'Estilos de organización interna',
    'Capas (MVC): el punto de partida correcto para CRUD y negocio simple o mediano. Hexagonal (Alistair Cockburn): el dominio en el centro; HTTP y base de datos son adaptadores intercambiables. Clean Architecture (Robert C. Martin): círculos concéntricos con dependencias hacia adentro. DDD (Eric Evans): modelar con el lenguaje del negocio y dividir en contextos delimitados.');
  d.tabla(s, ['Estilo', 'Idea central', 'Cuándo conviene', 'Costo'], [
    ['Capas / MVC', 'controller → service → repository', 'CRUD y reglas acotadas', 'Puede acoplar negocio a JPA'],
    ['Hexagonal (puertos y adaptadores)', 'El dominio no depende de la infraestructura', 'Varias entradas o integraciones', 'Más contratos y mapeos'],
    ['Clean Architecture', 'Dependencias apuntan hacia el núcleo', 'Sistemas grandes y de vida larga', 'Más estructura inicial'],
    ['DDD', 'Lenguaje del negocio y contextos delimitados', 'Dominios complejos (banca, logística)', 'Requiere expertos del negocio'],
  ], { colW: [3.1, 3.4, 3.0, 2.63], rowH: 0.78 });

  s = d.slide('Arquitectura', 'Capas frente a puertos y adaptadores',
    'En capas, el service depende directamente del repository JPA. En hexagonal, el núcleo define un puerto (interfaz) y la infraestructura lo implementa: las dependencias de código apuntan hacia el núcleo, aunque la ejecución vaya hacia afuera. Una figura hexagonal no demuestra desacoplamiento: las importaciones y las pruebas sí.');
  // capas
  d.etiqueta(s, 'CAPAS', { x: MX, y: Y0, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: C.text2 });
  [['Controller', 'HTTP'], ['Service', 'reglas'], ['Repository', 'datos'], ['Base de datos', '']].forEach(([t, sub], i) => {
    d.caja(s, sub ? `${t}  ·  ${sub}` : t, { x: MX + 0.4, y: Y0 + 0.5 + i * 1.12, w: 4.6, h: 0.8, fill: i === 3 ? 'accent5' : 'text2' });
    if (i < 3) d.flecha(s, MX + 2.7, Y0 + 1.3 + i * 1.12, 0, 0.32);
  });
  // hexagonal
  d.etiqueta(s, 'PUERTOS Y ADAPTADORES', { x: 6.6, y: Y0, w: 6.1, h: 0.35, fontSize: 14, bold: true, color: C.text2 });
  s.addShape(pres.shapes.HEXAGON, { x: 8.15, y: 2.55, w: 3.0, h: 2.6, fill: { color: C.accent1 }, line: { type: 'none' } });
  d.texto(s, 'Núcleo\ncasos de uso y reglas', { x: 8.25, y: 3.25, w: 2.8, h: 1.2, fontSize: 16, bold: true, color: C.background1, align: 'center', valign: 'middle' });
  d.caja(s, 'Adaptador HTTP', { x: 6.6, y: 2.2, w: 1.95, h: 0.75, fill: 'accent4', fontSize: 14 });
  d.caja(s, 'Adaptador JPA', { x: 10.75, y: 4.85, w: 1.95, h: 0.75, fill: 'accent4', fontSize: 14 });
  d.flecha(s, 8.5, 2.95, 0.5, 0.45);
  d.flecha(s, 10.75, 5.0, -0.5, -0.45, { flipH: true, flipV: true });
  d.etiqueta(s, 'las dependencias apuntan hacia el núcleo', { x: 6.6, y: 5.8, w: 6.1, h: 0.35, fontSize: 13, italic: true });
  d.etiqueta(s, 'cada capa usa a la de abajo', { x: MX, y: 6.38, w: 5.4, h: 0.3, fontSize: 13, italic: true });

  s = d.slide('Arquitectura', 'Estilos de despliegue',
    'Empieza con un monolito bien modularizado. Separa en microservicios solo con un motivo medible: un equipo grande que necesita desplegar de forma independiente o una parte que debe escalar sola. Los microservicios distribuyen las transacciones y exigen observabilidad madura.');
  d.tabla(s, ['Estilo', 'Ventaja', 'Costo o límite'], [
    ['Monolito', 'Simple de desarrollar, probar y desplegar', 'Escala y se despliega como un todo'],
    ['Monolito modular', 'Límites internos claros sin costo de red', 'Exige disciplina entre módulos'],
    ['Microservicios', 'Despliegue y escalado independientes por equipo', 'Red, consistencia de datos y observabilidad'],
    ['Serverless (funciones)', 'Pagas por ejecución, sin administrar servidores', 'Arranque en frío y dependencia del proveedor'],
  ], { colW: [3.0, 4.6, 4.53], rowH: 0.72 });
  d.destacado(s, 'Los microservicios no son el paso obligatorio siguiente: son una respuesta a problemas de escala organizacional.', { y: 5.55 });

  s = d.slide('Arquitectura', 'Diseño de APIs REST',
    'REST modela recursos (sustantivos) manipulados con verbos HTTP. Un buen contrato es predecible: mismos formatos, códigos correctos y errores uniformes. Versionar evita romper a los clientes existentes. Alternativas a REST: GraphQL (el cliente elige campos) y gRPC (binario y rápido entre servicios).');
  d.panel(s, 'Principios', [
    'Recursos como sustantivos: /api/tareas', 'Verbos: GET leer, POST crear, PUT reemplazar, PATCH modificar parte, DELETE eliminar',
    'Errores con formato único y mensaje útil', 'Versionado: /api/v1/...', 'Paginación en listas grandes', 'Documentación viva (OpenAPI / Swagger)',
  ], { x: MX, w: 6.6 });
  d.tabla(s, ['Código', 'Significado'], [
    ['200 / 201 / 204', 'OK · Creado · Sin contenido'], ['400', 'Datos inválidos'], ['401 / 403', 'No autenticado · Sin permiso'],
    ['404', 'No existe'], ['409', 'Conflicto con el estado actual'], ['500', 'Error inesperado del servidor'],
  ], { x: 7.5, w: 5.23, colW: [1.9, 3.33], rowH: 0.62 });

  s = d.slide('Arquitectura', 'Documentar decisiones con ADR',
    'Un Architecture Decision Record es un documento breve (una página) que registra por qué se tomó una decisión: fecha, estado, contexto, decisión, alternativas y consecuencias. Se guarda en el repositorio (docs/adr/0001-...md). No hace falta uno por cada detalle: solo para decisiones costosas de revertir.');
  d.cards(s, [
    { t: 'Contexto', d: 'La situación y las fuerzas en juego: requisitos, restricciones, equipo.' },
    { t: 'Decisión', d: 'Qué se decidió, en una o dos frases claras.', c: 'accent2' },
    { t: 'Alternativas', d: 'Qué otras opciones se evaluaron y por qué se descartaron.', c: 'accent3' },
    { t: 'Consecuencias', d: 'Qué se gana, qué se pierde y cuándo revisar la decisión.', c: 'accent4' },
  ], { cols: 4, h: 2.8 });
  d.destacado(s, 'Dentro de seis meses nadie recordará por qué se eligió algo; el ADR sí.', { y: 4.85 });

  // ---------------------------------------------------------------- 6 DISEÑO Y CLEAN CODE
  d.seccion('6 · Diseño y clean code');
  d.divisor('06', 'Diseño y clean code', 'Principios para escribir código que otra persona (o tú en seis meses) pueda entender, cambiar y probar.');

  s = d.slide('Diseño', 'Principios de diseño',
    'DRY no significa eliminar toda repetición de código parecido: significa no duplicar conocimiento (una regla en un solo lugar). KISS y YAGNI combaten la sobreingeniería. Cohesión: lo que cambia junto, vive junto. Acoplamiento: cuánto depende un módulo de otro.');
  d.cards(s, [
    { t: 'DRY', d: 'No repetir conocimiento: cada regla vive en un solo lugar.' },
    { t: 'KISS', d: 'La solución más simple que funcione.', c: 'accent2' },
    { t: 'YAGNI', d: 'No construir "por si acaso"; agregar cuando haga falta.', c: 'accent3' },
    { t: 'Alta cohesión, bajo acoplamiento', d: 'Cada módulo hace una cosa y depende poco de los demás.', c: 'accent4' },
    { t: 'Ley de Demeter', d: 'Hablar solo con colaboradores directos: evitar a.getB().getC().hacer().', c: 'accent6' },
    { t: 'Composición sobre herencia', d: 'Combinar objetos suele ser más flexible que heredar.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Diseño', 'SOLID como preguntas de revisión',
    'SRP trata de razones de cambio, no de que una clase tenga un solo método. OCP se evalúa ante cambios previsibles, no significa nunca modificar código. LSP exige respetar el contrato de comportamiento. ISP evita depender de métodos innecesarios. DIP orienta dependencias hacia abstracciones adecuadas; la inyección por constructor es un mecanismo, no la prueba del principio.');
  d.tabla(s, ['Principio', 'Pregunta útil', 'Ejemplo'], [
    ['S · Responsabilidad única', '¿Por qué razones cambia esta clase?', 'Separar HTTP de las reglas de negocio'],
    ['O · Abierto/cerrado', '¿Una regla nueva obliga a editar todo?', 'Aislar una política que varía'],
    ['L · Sustitución de Liskov', '¿La sustitución conserva el contrato?', 'Mismos resultados y mismos errores'],
    ['I · Segregación de interfaces', '¿El cliente depende de lo que no usa?', 'Interfaces pequeñas orientadas al uso'],
    ['D · Inversión de dependencias', '¿Lo importante depende de detalles?', 'El negocio depende de contratos'],
  ], { colW: [3.4, 4.4, 4.33], rowH: 0.7 });

  s = d.slide('Diseño', 'Clean code en concreto',
    'Basado en Clean Code (Robert C. Martin) y Refactoring (Martin Fowler). Lo importante es la intención visible, no reglas absolutas de longitud: no extraer métodos que escondan la lógica ni imponer números arbitrarios de líneas.');
  d.cards(s, [
    { t: 'Nombres que explican', d: 'tareasEnCurso, permiteMoverA… no lista2 ni flag.' },
    { t: 'Funciones pequeñas', d: 'Una sola tarea y pocos parámetros; el nombre dice lo que hace.', c: 'accent2' },
    { t: 'Comentarios del porqué', d: 'El código dice qué hace; el comentario explica por qué.', c: 'accent3' },
    { t: 'Sin números mágicos', d: 'LIMITE_EN_CURSO = 3 en vez de un 3 suelto.', c: 'accent4' },
    { t: 'Errores explícitos', d: 'Excepciones con nombre; evitar devolver null o códigos ocultos.', c: 'accent6' },
    { t: 'Formato automático', d: 'Un formateador y un linter para todo el equipo.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Diseño', 'Code smells y refactorización',
    'Un code smell es una señal de un problema de diseño, no un error. Refactorizar es cambiar la estructura sin cambiar el comportamiento, en pasos pequeños y siempre protegido por pruebas. Sin pruebas, refactorizar es adivinar.');
  d.panel(s, 'Señales de alerta (smells)', [
    'Clases gigantes que hacen de todo', 'Métodos largos y anidados', 'Listas de parámetros eternas',
    'Cadenas de if/else o switch repetidas', 'Código duplicado o muerto', 'Nombres que no dicen nada',
  ], { x: MX, w: 5.9, color: 'accent1' });
  d.panel(s, 'Cómo refactorizar', [
    'Primero tener pruebas que pasen', 'Un cambio pequeño a la vez', 'Ejecutar pruebas después de cada paso',
    'Extraer métodos y renombrar', 'No mezclar refactor con funciones nuevas', 'Commit por cada paso estable',
  ], { x: MX + 6.23, w: 5.9, color: 'accent2' });

  s = d.slide('Diseño', 'Patrones de diseño',
    'Los patrones GoF (Gamma, Helm, Johnson, Vlissides, 1994) son soluciones probadas a problemas recurrentes. Un patrón se justifica por el problema que resuelve, no por cuántos aparecen. Antes de agregar Strategy o State, preguntar qué variación concreta resuelven. Además existen patrones de aplicación empresarial (Fowler): Service Layer, Repository, DTO, Data Mapper.');
  d.cards(s, [
    { t: 'Creacionales', d: 'Cómo se crean objetos.\nFactory, Builder, Singleton.' },
    { t: 'Estructurales', d: 'Cómo se combinan.\nAdapter, Facade, Decorator, Proxy.', c: 'accent2' },
    { t: 'De comportamiento', d: 'Cómo colaboran.\nStrategy, Observer, State, Template Method.', c: 'accent3' },
  ], { cols: 3, h: 2.5, dSize: 16 });
  d.destacado(s, 'Regla: aplica un patrón cuando aparece el problema que resuelve, no antes.', { y: 4.5 });
  d.texto(s, 'Patrones de aplicación que usaremos en el proyecto: Service Layer, Repository, DTO, Mapper, Inyección de dependencias, Front Controller y Advice.', { x: MX, y: 5.4, w: CW, h: 0.8, fontSize: 16 });

  // ---------------------------------------------------------------- 7 PRUEBAS
  d.seccion('7 · Pruebas');
  d.divisor('07', 'Pruebas', 'La evidencia repetible de que el software hace lo que se espera. No prueba la ausencia total de defectos, pero reduce el riesgo.');

  s = d.slide('Pruebas', 'La pirámide de pruebas',
    'Muchas pruebas unitarias (rápidas, aisladas), algunas de integración (con base de datos y HTTP reales) y pocas de extremo a extremo (lentas y frágiles). La forma de pirámide equilibra velocidad, costo y confianza.');
  const niveles = [['E2E', 'Simula al usuario en el navegador · Playwright, Cypress', 'accent1', 3.2], ['Integración', 'Varias piezas juntas, base real · Testcontainers', 'accent3', 4.6], ['Unitarias', 'Una clase aislada con mocks · JUnit, Mockito, Vitest', 'accent2', 6.0]];
  niveles.forEach(([t, dsc, col, w], i) => {
    const y = Y0 + 0.2 + i * 1.5;
    d.caja(s, t, { x: MX + (6.0 - w) / 2, y, w, h: 1.25, fill: col, fontSize: 20 });
    d.texto(s, dsc, { x: 7.0, y: y + 0.25, w: 5.7, h: 0.8, fontSize: 16, valign: 'middle' });
  });
  d.etiqueta(s, '▲ más lentas y costosas · ▼ más rápidas y numerosas', { x: 7.0, y: 6.3, w: 5.7, h: 0.35, align: 'left', fontSize: 13 });

  s = d.slide('Pruebas', 'Tipos de pruebas',
    'La prueba de contrato o web verifica rutas, JSON, validaciones y códigos HTTP sin lógica real (en Spring: @WebMvcTest). Las de regresión aseguran que lo que funcionaba siga funcionando: normalmente es la suite automática completa ejecutada en CI.');
  d.tabla(s, ['Tipo', 'Qué verifica', 'Herramientas'], [
    ['Unitaria', 'Una regla o clase aislada', 'JUnit 5, Mockito, Vitest'],
    ['Web / contrato', 'Rutas, JSON, validación y códigos HTTP', 'MockMvc, @WebMvcTest'],
    ['Integración', 'Base real, migraciones, JPA', '@SpringBootTest, Testcontainers'],
    ['Extremo a extremo', 'Recorrido completo como usuario', 'Playwright, Cypress'],
    ['Carga y rendimiento', 'Cuánto aguanta y con qué latencia', 'k6, JMeter'],
    ['Seguridad', 'Vulnerabilidades conocidas', 'OWASP ZAP, análisis de dependencias'],
  ], { colW: [3.0, 5.0, 4.13], rowH: 0.6 });

  s = d.slide('Pruebas', 'Cómo se escribe una buena prueba',
    'TDD: escribir primero una prueba que falla (rojo), luego el código mínimo que la pasa (verde) y después refactorizar. La cobertura (JaCoCo) es un indicador parcial: 100 % de líneas ejecutadas con aserciones débiles no demuestra nada.');
  d.cards(s, [
    { t: 'Patrón AAA', d: 'Arrange (preparar), Act (ejecutar), Assert (verificar).' },
    { t: 'TDD', d: 'Rojo → verde → refactorizar, en ciclos cortos.', c: 'accent2' },
    { t: 'Independientes', d: 'Cada prueba prepara sus datos y no depende del orden.', c: 'accent3' },
    { t: 'Por riesgo', d: 'Casos límite, errores, persistencia y concurrencia primero.', c: 'accent4' },
    { t: 'Nombres que describen', d: 'rechazaLaCuartaTareaEnCurso dice qué se espera.', c: 'accent6' },
    { t: 'Cobertura como guía', d: 'Útil para ver lo no probado; no es la meta.', c: 'accent5' },
  ], { cols: 3 });

  // ---------------------------------------------------------------- 8 GIT
  d.seccion('8 · Git');
  d.divisor('08', 'Git y control de versiones', 'Historial completo del proyecto, trabajo en paralelo y revisión de cambios antes de integrarlos.');

  s = d.slide('Git', 'Conceptos básicos de Git',
    'Git es un control de versiones distribuido: cada copia tiene la historia completa. Merge conserva la historia real con un commit de unión; rebase reescribe los commits para dejar una historia lineal. Regla: nunca hacer rebase de commits ya compartidos con otras personas.');
  d.cards(s, [
    { t: 'Repositorio', d: 'La carpeta con todo el historial (.git).' },
    { t: 'Commit', d: 'Una foto del proyecto: pequeña, atómica y con mensaje claro.', c: 'accent2' },
    { t: 'Rama (branch)', d: 'Una línea de trabajo paralela, como feature/mover-tarea.', c: 'accent3' },
    { t: 'Merge y rebase', d: 'Integrar ramas. Merge conserva historia; rebase la alinea.', c: 'accent4' },
    { t: 'Remoto', d: 'push sube, pull/fetch traen cambios de GitHub o GitLab.', c: 'accent6' },
    { t: 'Pull Request', d: 'Propuesta de cambio que otros revisan antes de integrarla.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Git', 'Estrategias de ramas',
    'GitHub Flow es la más usada y la recomendada para el curso: main siempre desplegable, ramas cortas y PR. Git Flow sirve para productos con versiones formales, pero es más pesada. Trunk-based exige mucha automatización y feature flags para esconder lo incompleto.');
  d.tabla(s, ['Estrategia', 'Cómo funciona', 'Para quién'], [
    ['GitHub Flow', 'main siempre desplegable; ramas cortas feature/x con Pull Request', 'La mayoría de los equipos (recomendada)'],
    ['Git Flow', 'main, develop, feature/*, release/* y hotfix/*', 'Productos con versiones formales'],
    ['Trunk-based', 'Todos integran a main varias veces al día con feature flags', 'Equipos maduros con mucha automatización'],
  ], { colW: [2.6, 5.9, 3.63], rowH: 0.9 });
  d.destacado(s, 'Ramas protegidas: nadie empuja directo a main; se entra por PR aprobado y con CI en verde.', { y: 5.7 });

  s = d.slide('Git', 'Flujo de trabajo con Pull Requests',
    'El code review es una de las prácticas que más mejora la calidad: detecta errores, difunde el conocimiento y mantiene un estilo común. Un buen PR es pequeño y explica qué cambia, por qué y cómo se probó. Una aprobación automática no reemplaza revisar reglas ni seguridad.');
  d.flujo(s, [
    { t: 'Historia', d: 'Una historia pequeña y clara' },
    { t: 'Rama', d: 'feature/nombre-corto desde main' },
    { t: 'Commits', d: 'Pequeños y con mensajes convencionales' },
    { t: 'Pull Request', d: 'Qué cambia, por qué y cómo se probó' },
    { t: 'Revisión + CI', d: 'Un compañero revisa; las pruebas pasan' },
    { t: 'Merge', d: 'Se integra a main y se borra la rama', c: 'accent1' },
  ], { y: Y0 + 0.4, tSize: 15, dh: 1.4 });
  d.destacado(s, 'Revisar código ajeno también es trabajo: se planifica y se valora.', { y: 5.4 });

  s = d.slide('Git', 'Convenciones que ordenan el repositorio',
    'Conventional Commits (conventionalcommits.org) da un formato que permite generar changelogs y versiones automáticamente. SemVer (semver.org): subir MAYOR al romper compatibilidad, MENOR al agregar funciones compatibles y PARCHE al corregir errores.');
  d.codigo(s, 'feat: mover tareas entre columnas\nfix: rechazar la cuarta tarea en curso\ntest: casos de transición inválida\ndocs: guía de despliegue\nrefactor: transiciones explícitas\nci: workflow de GitHub Actions\n\n# Versionado semántico\n1.4.2  →  MAYOR.MENOR.PARCHE\n2.0.0  rompe compatibilidad\n1.5.0  agrega una función\n1.4.3  corrige un error', { w: 6.3, etiqueta: 'CONVENTIONAL COMMITS Y SEMVER', fontSize: 14 });
  d.bullets(s, [
    'Un commit = un cambio lógico',
    'Mensaje en imperativo y con tipo',
    '.gitignore desde el primer día: target/, node_modules/, logs/, .env',
    'Nunca subir secretos: si ocurre, rotar la clave aunque se borre el commit',
    'Etiquetar versiones (git tag v1.0.0)',
  ], { x: 7.3, y: Y0 + 0.1, w: 5.43, h: 5.0 });

  // ---------------------------------------------------------------- 9 DEVOPS
  d.seccion('9 · DevOps');
  d.divisor('09', 'DevOps', 'Una cultura que une desarrollo y operación, y automatiza todo lo repetitivo: compilar, probar, empaquetar y desplegar.');

  s = d.slide('DevOps', 'DevOps es cultura antes que herramientas',
    'DevOps busca derribar el muro entre quien desarrolla y quien opera. El modelo CALMS resume sus pilares. Comprar herramientas no hace DevOps si el equipo sigue trabajando en silos. Métricas DORA para medir la entrega: frecuencia de despliegue, tiempo de entrega de cambios, tasa de fallos de cambios y tiempo de recuperación.');
  d.cards(s, [
    { t: 'Cultura', n: 'C', d: 'Responsabilidad compartida del producto en producción.' },
    { t: 'Automatizar', n: 'A', d: 'Build, pruebas, despliegue e infraestructura sin pasos manuales.', c: 'accent2' },
    { t: 'Lean', n: 'L', d: 'Lotes pequeños y flujo continuo; eliminar esperas.', c: 'accent3' },
    { t: 'Medición', n: 'M', d: 'Métricas DORA y de operación para decidir.', c: 'accent4' },
    { t: 'Compartir', n: 'S', d: 'Conocimiento, herramientas y aprendizajes de incidentes.', c: 'accent6' },
  ], { cols: 5, h: 3.0, tSize: 15 });
  d.destacado(s, 'Métricas DORA: frecuencia de despliegue · tiempo de entrega · tasa de fallos · tiempo de recuperación', { y: 5.05 });

  s = d.slide('DevOps', 'Integración y entrega continuas (CI/CD)',
    'CI: integrar cambios con frecuencia y verificar cada uno automáticamente. Entrega continua: cada versión que pasa queda lista para desplegar con un clic (aprobación manual). Despliegue continuo: se publica sola a producción si pasa todo. Para una primera experiencia docente conviene la entrega continua con aprobación manual.');
  d.flujo(s, [
    { t: 'push / PR' }, { t: 'Compilar' }, { t: 'Pruebas' }, { t: 'Análisis estático' },
    { t: 'Imagen Docker' }, { t: 'Staging' }, { t: 'Producción', c: 'accent1' },
  ], { y: Y0 + 0.1, tSize: 14, gap: 0.32 });
  d.tabla(s, ['Práctica', 'Qué automatiza', 'Herramientas'], [
    ['Integración continua (CI)', 'Compilar y probar cada cambio', 'GitHub Actions, GitLab CI, Jenkins'],
    ['Entrega continua', 'Dejar una versión lista para desplegar', 'Pipelines con aprobación manual'],
    ['Despliegue continuo', 'Publicar automáticamente si todo pasa', 'Argo CD, pipelines sin aprobación'],
  ], { y: 3.3, colW: [3.4, 4.5, 4.23], rowH: 0.7 });

  s = d.slide('DevOps', 'Contenedores: Docker, Compose y Kubernetes',
    'Una imagen empaqueta la aplicación con su entorno (por ejemplo, el JDK 21 y el JAR). Un contenedor es una imagen en ejecución. Detalle clave: dentro de un contenedor, localhost apunta al propio contenedor, no a la base del host; en Compose se usa el nombre del servicio (db). Ejecutar sin root y pasar la configuración por variables.');
  d.cards(s, [
    { t: 'Imagen', d: 'Plantilla inmutable: aplicación + entorno. Se construye con un Dockerfile.' },
    { t: 'Contenedor', d: 'Una imagen en ejecución, aislada, configurada por variables.', c: 'accent2' },
    { t: 'Volumen', d: 'Almacenamiento que sobrevive al contenedor (datos de PostgreSQL).', c: 'accent3' },
    { t: 'Registro', d: 'Donde se publican las imágenes versionadas: Docker Hub, GHCR.', c: 'accent4' },
    { t: 'Docker Compose', d: 'Levanta varios contenedores juntos con un archivo YAML.', c: 'accent6' },
    { t: 'Kubernetes', d: 'Orquesta muchos contenedores: escalado, reinicio y balanceo.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('DevOps', 'Ambientes, configuración e IaC',
    'The Twelve-Factor App (12factor.net): la configuración vive en el entorno, no en el código; la misma imagen pasa por todos los ambientes. Infraestructura como código (Terraform, Ansible): servidores, redes y bases definidos en archivos versionados y revisables, en vez de configurarlos a mano.');
  d.flujo(s, [
    { t: 'Desarrollo', d: 'Tu máquina' }, { t: 'Pruebas / QA', d: 'Verificación del equipo' },
    { t: 'Staging', d: 'Copia fiel de producción' }, { t: 'Producción', d: 'Usuarios reales', c: 'accent1' },
  ], { y: Y0, dh: 0.5, bh: 0.8 });
  d.cards(s, [
    { t: 'Configuración externa', d: 'Variables de entorno por ambiente: DB_HOST, DB_USER, perfiles de Spring.', c: 'accent2' },
    { t: 'Infraestructura como código', d: 'Terraform o Ansible: la infraestructura se revisa en un PR.', c: 'accent3' },
    { t: 'Secretos fuera del código', d: 'Gestores de secretos del proveedor o del pipeline.', c: 'accent4' },
  ], { cols: 3, y: 3.35, h: 2.4 });

  // ---------------------------------------------------------------- 10 DESPLIEGUE
  d.seccion('10 · Despliegue');
  d.divisor('10', 'Servidores y despliegue', 'Dónde se ejecuta el software, qué piezas necesita un despliegue real y cómo publicar sin cortar el servicio.');

  s = d.slide('Despliegue', 'Dónde se ejecuta el software',
    'IaaS: tú administras el sistema operativo. PaaS: subes el código y ellos lo ejecutan. Contenedores gestionados: subes una imagen. Para el frontend compilado basta un hosting estático con CDN. Una base de datos gestionada (respaldos, actualizaciones) casi siempre conviene más que instalarla en un servidor propio. Revisar precios y límites vigentes antes de cada curso.');
  d.tabla(s, ['Opción', 'Qué es', 'Ejemplos'], [
    ['On-premise', 'Servidores propios de la organización', 'Data center de la empresa'],
    ['VPS / IaaS', 'Máquina virtual que tú administras', 'DigitalOcean Droplet, AWS EC2, Azure VM'],
    ['PaaS', 'Subes el código y ellos lo ejecutan', 'Render, Railway, Heroku, Azure App Service'],
    ['Contenedores gestionados', 'Ejecutan tu imagen Docker', 'Google Cloud Run, AWS Fargate, Azure Container Apps'],
    ['Kubernetes gestionado', 'Clúster administrado por el proveedor', 'EKS, GKE, AKS'],
    ['Hosting estático + CDN', 'Archivos del frontend compilado', 'Vercel, Netlify, Cloudflare Pages'],
    ['Base de datos gestionada', 'PostgreSQL administrado con respaldos', 'Supabase, Neon, AWS RDS, Azure Database'],
  ], { colW: [3.1, 4.3, 4.73], rowH: 0.6, fontSize: 14 });

  s = d.slide('Despliegue', 'Piezas de un despliegue real',
    'El DNS traduce el dominio a una IP. El proxy inverso (Nginx, Traefik o el del proveedor) termina HTTPS y reparte el tráfico. El balanceador permite varias instancias, lo que exige que la aplicación no guarde estado en memoria (stateless). La base de datos queda en red privada: el navegador nunca recibe credenciales de la base.');
  const piezas = [['Usuario', 'accent5'], ['DNS', 'accent4'], ['Proxy HTTPS', 'accent4'], ['Balanceador', 'accent4'], ['Instancias de la app', 'text2'], ['Base de datos', 'accent1']];
  const pw = 1.72, pg = 0.36;
  piezas.forEach(([t, c], i) => {
    const x = MX + i * (pw + pg);
    d.caja(s, t, { x, y: Y0 + 0.4, w: pw, h: 1.0, fill: c, fontSize: 15 });
    if (i < piezas.length - 1) d.flecha(s, x + pw + 0.04, Y0 + 0.9, pg - 0.08, 0);
  });
  d.cards(s, [
    { t: 'HTTPS en todo', d: 'Certificados gratuitos con Let\'s Encrypt o los del proveedor.' },
    { t: 'Stateless', d: 'Sin sesiones en memoria para poder escalar horizontalmente.', c: 'accent2' },
    { t: 'Red privada', d: 'La base solo acepta conexiones del backend.', c: 'accent3' },
    { t: 'Salud', d: 'Un endpoint /health que el balanceador consulta.', c: 'accent4' },
  ], { cols: 4, y: 3.65, h: 2.4 });

  s = d.slide('Despliegue', 'Estrategias de despliegue',
    'Desplegar sin cortar el servicio requiere una estrategia. Siempre conservar la imagen anterior para volver atrás. Ojo: revertir la aplicación no revierte una migración destructiva de datos; por eso los cambios de esquema se hacen en dos fases (expandir primero, retirar después).');
  d.cards(s, [
    { t: 'Rolling', d: 'Se reemplazan las instancias de a poco; siempre hay alguna atendiendo.' },
    { t: 'Blue-green', d: 'Dos ambientes idénticos; se cambia todo el tráfico de uno al otro.', c: 'accent2' },
    { t: 'Canary', d: 'La versión nueva recibe primero un porcentaje pequeño de usuarios.', c: 'accent3' },
    { t: 'Feature flags', d: 'El código se despliega apagado y se activa cuando está listo.', c: 'accent4' },
    { t: 'Rollback', d: 'Volver rápido a la versión anterior si algo falla.', c: 'accent6' },
    { t: 'Migraciones en dos fases', d: 'Expandir el esquema, migrar y luego retirar lo viejo.', c: 'accent5' },
  ], { cols: 3 });

  // ---------------------------------------------------------------- 11 SEGURIDAD
  d.seccion('11 · Seguridad');
  d.divisor('11', 'Seguridad', 'Lo que más suele faltar en un proyecto de estudiante y lo primero que importa antes de publicar.');

  s = d.slide('Seguridad', 'OWASP Top 10: los riesgos más comunes en la web',
    'Lista del proyecto OWASP (owasp.org/Top10), edición 2021. Revisar la edición vigente al dictar la clase. Los dos más frecuentes en proyectos reales: control de acceso roto (un usuario ve datos de otro) e inyección (concatenar entradas en SQL).');
  d.tabla(s, ['Código', 'Riesgo'], [
    ['A01', 'Control de acceso roto'], ['A02', 'Fallas criptográficas'], ['A03', 'Inyección (SQL, XSS)'],
    ['A04', 'Diseño inseguro'], ['A05', 'Configuración insegura'],
  ], { w: 5.9, colW: [1.2, 4.7], rowH: 0.62 });
  d.tabla(s, ['Código', 'Riesgo'], [
    ['A06', 'Componentes vulnerables o desactualizados'], ['A07', 'Fallas de identificación y autenticación'],
    ['A08', 'Fallas de integridad de software y datos'], ['A09', 'Fallas de registro y monitoreo'],
    ['A10', 'Falsificación de peticiones del servidor (SSRF)'],
  ], { x: MX + 6.23, w: 5.9, colW: [1.2, 4.7], rowH: 0.62 });
  d.destacado(s, 'Validar siempre en el servidor: el frontend se puede saltar con cualquier cliente HTTP.', { y: 5.6 });

  s = d.slide('Seguridad', 'Autenticación y autorización',
    'Autenticación: quién eres. Autorización: qué puedes hacer. Un login no basta: hay que verificar en cada operación que el usuario A no accede a los recursos del usuario B (propiedad del recurso). Contraseñas siempre con hash lento (bcrypt, Argon2), nunca en texto plano. En Spring: Spring Security.');
  d.panel(s, 'Autenticación: ¿quién eres?', [
    'Login con contraseña con hash (bcrypt, Argon2)', 'Sesión o token (JWT) con expiración', 'OAuth2 / OpenID Connect: "entrar con Google"',
    'MFA: segundo factor', 'Bloqueo ante intentos repetidos',
  ], { x: MX, w: 5.9 });
  d.panel(s, 'Autorización: ¿qué puedes hacer?', [
    'Roles y permisos (administrador, usuario)', 'Propiedad: solo tus recursos', 'Mínimo privilegio en usuarios y bases',
    'Verificar en el servidor, en cada operación', 'Responder 401 sin sesión y 403 sin permiso',
  ], { x: MX + 6.23, w: 5.9, color: 'accent1' });

  s = d.slide('Seguridad', 'Prácticas de seguridad del día a día',
    'CORS es una política del navegador: no impide que otro cliente (curl, Postman, un script) llame a una API pública, así que no reemplaza la autenticación. Si un secreto llega al repositorio, hay que rotarlo: borrar el commit no basta porque el historial y las copias lo conservan.');
  d.cards(s, [
    { t: 'Secretos fuera del código', d: 'Variables de entorno o gestor de secretos; nunca en Git.' },
    { t: 'HTTPS y TLS', d: 'Cifrar todo el tráfico, también hacia la base de datos.', c: 'accent2' },
    { t: 'Validar en el servidor', d: 'Toda entrada es sospechosa; consultas parametrizadas.', c: 'accent3' },
    { t: 'Dependencias al día', d: 'Dependabot, OWASP Dependency-Check, npm audit.', c: 'accent4' },
    { t: 'Logs sin datos sensibles', d: 'Registrar ids y resultados, no contraseñas ni datos personales.', c: 'accent6' },
    { t: 'CORS no es seguridad', d: 'Solo controla al navegador; la API debe autenticar.', c: 'accent5' },
  ], { cols: 3 });

  // ---------------------------------------------------------------- 12 DATOS Y OPERACIÓN
  d.seccion('12 · Datos y operación');
  d.divisor('12', 'Datos y operación', 'Cuidar los datos, saber qué pasa en producción y crecer cuando aumentan los usuarios.');

  s = d.slide('Datos', 'Cuidar los datos',
    'Las restricciones (NOT NULL, CHECK, UNIQUE, claves foráneas) protegen los datos incluso fuera de la API. Una transacción agrupa cambios que se confirman juntos; el nivel de aislamiento determina qué ve cada transacción de las demás. Un respaldo que nunca se restauró no es un respaldo. En Chile, los datos personales se rigen por la Ley 19.628 y la Ley 21.719, que la moderniza.');
  d.cards(s, [
    { t: 'Integridad', d: 'Claves, NOT NULL, CHECK y UNIQUE en la propia base.' },
    { t: 'Migraciones versionadas', d: 'Flyway o Liquibase: el esquema evoluciona con el código.', c: 'accent2' },
    { t: 'Transacciones', d: 'Todo o nada; el aislamiento define la concurrencia.', c: 'accent3' },
    { t: 'Respaldos probados', d: 'Respaldar y ensayar la restauración periódicamente.', c: 'accent4' },
    { t: 'Índices', d: 'Aceleran búsquedas frecuentes; medir antes de agregar.', c: 'accent6' },
    { t: 'Datos personales', d: 'Ley 19.628 y Ley 21.719 en Chile; GDPR en Europa.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Operación', 'Observabilidad: saber qué pasa en producción',
    'Logs estructurados y centralizados (ELK, Grafana Loki), métricas (Prometheus, Grafana; en Spring Boot: Actuator con Micrometer), trazas distribuidas (OpenTelemetry) y alertas que avisan antes que el usuario. Los endpoints de salud deben exponerse y protegerse de forma intencional. Cada incidente genera requisitos y pruebas nuevas.');
  d.cards(s, [
    { t: 'Logs', d: '¿Qué operación falló? Con id de petición para correlacionar.' },
    { t: 'Métricas', d: '¿Cambian errores, latencia o saturación?', c: 'accent2' },
    { t: 'Trazas', d: '¿Por dónde pasó una petición entre servicios?', c: 'accent3' },
    { t: 'Salud', d: '¿Puede la aplicación atender? /actuator/health', c: 'accent4' },
    { t: 'Alertas', d: 'Avisar al equipo antes de que reclame el usuario.', c: 'accent6' },
  ], { cols: 5, h: 3.0, tSize: 16 });
  d.destacado(s, 'Sin observabilidad, un error en producción se descubre por el reclamo de un usuario.', { y: 5.05 });

  s = d.slide('Operación', 'Rendimiento y escalabilidad',
    'Medir antes de optimizar: usar percentiles (p95, p99) y no solo promedios. Escalar verticalmente es usar una máquina más grande (simple pero con techo). Escalar horizontalmente es agregar instancias, lo que exige que la app sea stateless y que la base soporte la carga.');
  d.panel(s, 'Técnicas', [
    'Paginación: no devolver miles de filas', 'Caché: Redis o caché HTTP', 'Índices en consultas frecuentes',
    'Compresión de respuestas', 'Trabajo pesado en segundo plano (colas)', 'Pool de conexiones acotado',
  ], { x: MX, w: 5.9 });
  d.panel(s, 'Escalar', [
    'Vertical: máquina más grande', 'Horizontal: más instancias detrás de un balanceador',
    'Requisito: aplicación sin estado en memoria', 'La base suele ser el cuello de botella', 'Medir p95 y p99, no solo el promedio',
  ], { x: MX + 6.23, w: 5.9, color: 'accent2' });

  // ---------------------------------------------------------------- 13 LO QUE SE OLVIDA
  d.seccion('13 · Lo que suele olvidarse');
  d.divisor('13', 'Lo que suele olvidarse', 'Accesibilidad, documentación, deuda técnica, aspectos legales, inteligencia artificial y habilidades del equipo.');

  s = d.slide('Lo que suele olvidarse', 'Calidad de cara al usuario',
    'Accesibilidad (pautas WCAG del W3C): navegación con teclado, lectores de pantalla, contraste suficiente y alternativas a interacciones como arrastrar y soltar. Internacionalización (i18n): idiomas, formatos de fecha y moneda. Un buen mensaje de error dice qué pasó y qué puede hacer el usuario.');
  d.cards(s, [
    { t: 'Accesibilidad (WCAG)', d: 'Teclado, lector de pantalla, contraste y textos alternativos.' },
    { t: 'Diseño responsivo', d: 'Funciona en celular, notebook y monitor grande.', c: 'accent2' },
    { t: 'Idiomas (i18n)', d: 'Idiomas, fechas, monedas y zonas horarias.', c: 'accent3' },
    { t: 'Mensajes útiles', d: 'Explican qué pasó y cómo seguir, sin detalles internos.', c: 'accent4' },
  ], { cols: 4, h: 3.2 });

  s = d.slide('Lo que suele olvidarse', 'Documentación y calidad automatizada',
    'La deuda técnica son los atajos que se toman hoy y cuestan después: hay que reconocerla, registrarla y pagarla de a poco. El análisis estático (SonarQube o SonarCloud, Checkstyle, ESLint) encuentra problemas sin ejecutar el código y puede ser una puerta de calidad en CI.');
  d.cards(s, [
    { t: 'README', d: 'Qué es, cómo se ejecuta y cómo se prueba.' },
    { t: 'Documentación de la API', d: 'OpenAPI / Swagger generado desde el código.', c: 'accent2' },
    { t: 'ADR y diagramas C4', d: 'Por qué se decidió y cómo está armado.', c: 'accent3' },
    { t: 'Changelog', d: 'Qué cambió en cada versión.', c: 'accent4' },
    { t: 'Análisis estático', d: 'SonarQube, Checkstyle, ESLint en el pipeline.', c: 'accent6' },
    { t: 'Deuda técnica', d: 'Registrar los atajos y planificar su pago.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Lo que suele olvidarse', 'Aspectos legales, ética e inteligencia artificial',
    'Licencias: MIT y Apache 2.0 son permisivas; GPL obliga a liberar el código derivado bajo GPL. Revisar las licencias de las dependencias antes de distribuir. Con asistentes de IA: quien entrega el código es responsable de él; debe poder explicarlo, validarlo y corregirlo. No pegar secretos ni datos personales en herramientas externas.');
  d.cards(s, [
    { t: 'Licencias de software', d: 'MIT, Apache 2.0 y GPL tienen obligaciones distintas.' },
    { t: 'Datos personales', d: 'Consentimiento, finalidad y derechos del titular.', c: 'accent2' },
    { t: 'Ética', d: 'Privacidad, sesgos y uso responsable de los datos.', c: 'accent3' },
    { t: 'IA como asistente', d: 'Acelera, pero hay que revisar y entender todo lo generado.', c: 'accent4' },
    { t: 'Sin secretos en la IA', d: 'No pegar claves ni datos sensibles en herramientas externas.', c: 'accent6' },
    { t: 'Responsabilidad', d: 'El código asistido por IA se defiende igual que el propio.', c: 'accent5' },
  ], { cols: 3 });

  s = d.slide('Lo que suele olvidarse', 'Habilidades del equipo',
    'Las habilidades blandas son técnicas de trabajo: un proyecto falla más por mala comunicación que por un mal algoritmo. Revisar código de otros con respeto, estimar con honestidad y documentar para el siguiente son parte del trabajo profesional.');
  d.cards(s, [
    { t: 'Comunicación', d: 'Con el cliente y el equipo; preguntar antes de suponer.' },
    { t: 'Estimar con honestidad', d: 'Decir "no sé" o "es más grande" a tiempo.', c: 'accent2' },
    { t: 'Feedback', d: 'Dar y recibir comentarios en code review sin hacerlo personal.', c: 'accent3' },
    { t: 'Aprender siempre', d: 'Las herramientas cambian; los fundamentos permanecen.', c: 'accent4' },
  ], { cols: 4, h: 3.2 });

  s = d.slide('Resumen de la Parte I', 'El mapa completo del desarrollo de software',
    'Resumen de toda la Parte I. Ninguna capa es opcional en un producto real, aunque en un curso se aborden por etapas.');
  d.tabla(s, ['Área', 'Incluye'], [
    ['Negocio', 'Requisitos, historias de usuario, casos de uso, criterios de aceptación'],
    ['Diseño', 'Arquitectura, patrones, SOLID, modelo de datos, diseño de API, ADR'],
    ['Construcción', 'Clean code, Git, code review, análisis estático'],
    ['Calidad', 'Pruebas unitarias, de integración y E2E, TDD, cobertura'],
    ['Seguridad', 'OWASP, autenticación y autorización, secretos, dependencias'],
    ['Entrega', 'CI/CD, Docker, ambientes, infraestructura como código, estrategias de despliegue'],
    ['Operación', 'Logs, métricas, alertas, respaldos, escalabilidad'],
    ['Personas', 'Metodología ágil, comunicación, documentación, ética'],
  ], { colW: [2.6, 9.53], rowH: 0.56 });
};
