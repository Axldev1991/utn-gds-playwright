# Guía Maestra de Estudio — GDS (Todos los Temas Organizados)

> **Cómo usar esta guía:** Cada unidad sigue su **cadena lógica interna** (de principio a fin). Cada tema tiene siempre los mismos **5 campos** para que puedas estudiarlos, definirlos y distinguirlos sin abrir el apunte de 90 páginas:
> 1. **Qué es** (definición simple + sigla desarrollada) · 2. **Objetivo / Para qué sirve** · 3. **Cómo funciona** (pasos/fórmula + bajada a **MediTurno**) · 4. **Cuándo SÍ / Cuándo NO** · 5. **No confundir con**.

---

## UNIDAD 1 — Del problema a la forma de trabajar

> **Cadena lógica:** Naturaleza del software → Punto de partida del proyecto → Cómo nos organizamos para construirlo.

### 1. Naturaleza del Software: Papel Dual, Bañera vs. Software Rot
- **Qué es:** El software cumple un **papel dual** (es un producto en sí mismo y el vehículo que opera otros negocios), **se desarrolla y no se fabrica** (casi todo el costo está en la ingeniería inicial; copiarlo cuesta cero) y no se gasta por uso físico sino que sufre **Deterioro del Software (*Software Rot*)**.
- **Objetivo / Para qué sirve:** Entender por qué gestionar software no es igual que gestionar una fábrica física ni una obra civil.
- **Cómo funciona:** En **MediTurno**, la app es el producto para el paciente y el vehículo que ordena la clínica. Si le metemos 15 parches rápidos sin refactorizar ni probar, aparecen bugs y rigidez (*Software Rot*).
- **Cuándo SÍ / Cuándo NO:** Aplica siempre a cualquier sistema de software.
- **No confundir con:** **Curva de la Bañera** (propia del *hardware*, que falla al inicio por defectos de fábrica, se estabiliza y al final muere por desgaste físico).

### 2. Las 4 Capas de Pressman y Actividades (Estructurales + Sombrilla)
- **Qué es:** Modelo en 4 capas (*Compromiso con la Calidad → Proceso → Métodos → Herramientas*). El proceso se ejecuta en **5 Actividades Estructurales** (*Comunicación, Planeación, Modelado, Construcción, Despliegue*) cubiertas de principio a fin por **8 Actividades Sombrilla** (seguimiento, riesgos, calidad, revisiones, medición, configuración/Git, reutilización, entregables).
- **Objetivo / Para qué sirve:** Ordenar qué sostiene a qué y recordar qué tareas son por etapa vs. qué tareas acompañan todo el proyecto.
- **Cómo funciona:** En MediTurno, hablar con la clínica es *Comunicación*; configurar Git y controlar riesgos ocurre durante *todo* el proyecto (*Sombrilla*).
- **Cuándo SÍ / Cuándo NO:** Siempre: la calidad sostiene al proceso, el proceso ordena los métodos y los métodos usan herramientas (no al revés).
- **No confundir con:** Confundir *Proceso* (el orden), *Método* (la técnica) y *Herramienta* (Jira, Git, Docker).

### 3. Polya, W5HH, SMART, CSF y Business Value
- **Qué es:** **Polya** (4 pasos: entender, planear, ejecutar, examinar); **W5HH de Boehm** (7 preguntas: *Why, What, When, Who, Where, How, How Much*); **SMART** (*Específico, Medible, Alcanzable, Relevante, con Plazo*); **CSF** (*Critical Success Factors* — Factores Críticos de Éxito); **Business Value** (justificación económica).
- **Objetivo / Para qué sirve:** Asegurar que el proyecto tenga rumbo claro, alcance acotado y valor de negocio antes de escribir código.
- **Cómo funciona:** En MediTurno: *W5HH* define por qué (bajar 40% llamadas perdidas) y presupuesto ($20.000); *SMART* fija *"sacar turno en < 2 min antes del 30/6"*; *CSF* identifica que las obras sociales deben validar en tiempo real.
- **Cuándo SÍ / Cuándo NO:** Sí al inicio de todo proyecto; no esperar a mitad del desarrollo para definirlos.
- **No confundir con:** Metas vagas (*"mejorar la app"*) que no son SMART ni verificables.

### 4. Las 4 P, Liderazgo Servicial y Modelo MOI (Weinberg)
- **Qué es:** Las **4 P** de la gestión (**Personal, Producto, Proceso, Proyecto**). **Liderazgo Servicial**: el líder facilita y quita bloqueos. **Modelo MOI**: *Motivación, Organización, Ideas/Innovación*.
- **Objetivo / Para qué sirve:** Recordar que el factor humano (**Personal**) es lo más crítico para que un proyecto funcione.
- **Cómo funciona:** En MediTurno, el Scrum Master protege al equipo de interrupciones de pasillo y fomenta ideas para resolver la agenda médica.
- **Cuándo SÍ / Cuándo NO:** Siempre en equipos técnicos; no sirve el mando autoritario rígido en trabajo creativo.
- **No confundir con:** Microgestión tradicional de dar órdenes sin escuchar al equipo.

### 5. Cascada (*Waterfall*) + WBS vs. Filosofía Ágil + MVP de Kniberg
- **Qué es:** **Cascada** avanza en fases secuenciales cerradas (*Requisitos → Diseño → Código → Test → Despliegue*) usando una **WBS** (*Work Breakdown Structure*). **Ágil** (4 Valores, 12 Principios) entrega valor incremental; la metáfora del **MVP** (*Minimum Viable Product*) de **Kniberg** entrega algo usable desde la iteración 1 (*patineta → monopatín → bici → auto*).
- **Objetivo / Para qué sirve:** Elegir entre predictibilidad total (Cascada) o adaptación rápida con feedback temprano (Ágil).
- **Cómo funciona:** En MediTurno usamos MVP: mes 1 reservas básicas (*patineta*), mes 2 recordatorios (*bici*), mes 3 pagos (*auto*), en vez de esperar 6 meses sin nada usable.
- **Cuándo SÍ / Cuándo NO:** Ágil cuando los requisitos evolucionan. Cascada solo cuando todo es 100% estable y regulado desde el día 1.
- **No confundir con:** Creer que Ágil significa trabajar sin plan ni documentación.

### 6. Scrum vs. Kanban y Jerarquía Ágil
- **Qué es:** **Scrum** trabaja en Sprints fijos (1–4 sem.) con **3 Pilares** (*Transparencia, Inspección, Adaptación*), **3 Roles** (*PO, SM, Developers*), **3 Artefactos** (*Product Backlog → Product Goal*, *Sprint Backlog → Sprint Goal*, *Increment → DoD: Definition of Done*) y **5 Eventos** (*Sprint, Planning, Daily, Review, Retrospective*). **Kanban** usa flujo continuo sin Sprints obligatorios y **límites WIP** (*Work In Progress*). **Jerarquía:** *Theme → Initiative → Epic → Feature → User Story → Task*.
- **Objetivo / Para qué sirve:** Estructurar el trabajo ágil en ciclos con demos (Scrum) o en flujo continuo (Kanban).
- **Cómo funciona:** En MediTurno usamos Scrum de 2 semanas para desarrollar el producto y Kanban luego para soporte.
- **Cuándo SÍ / Cuándo NO:** Scrum para crear producto con feedback periódico; Kanban para soporte/mantenimiento continuo.
- **No confundir con:** Confundir *Agile* (filosofía) con *Scrum* (marco con Sprints) o *Kanban* (flujo con WIP).

### 7. Proceso Unificado (PU / RUP)
- **Qué es:** Modelo híbrido (*dirigido por casos de uso, centrado en la arquitectura, iterativo e incremental*) en **4 Fases e Hitos**: *Concepción (LCO) → Elaboración (LCA) → Construcción (IOC) → Transición (PR)*, graficado en "jorobas de ballena" (disciplinas por iteración).
- **Objetivo / Para qué sirve:** Combinar control por hitos de fases con entregas iterativas que reducen riesgo arquitectónico temprano.
- **Cómo funciona:** En cada iteración se tocan todas las disciplinas (requisitos, diseño, código, pruebas), cambiando el peso relativo según la fase.
- **Cuándo SÍ / Cuándo NO:** Sí en sistemas corporativos/bancarios grandes; NO en equipos chicos de 4 personas como MediTurno (mucha ceremonia).
- **No confundir con:** Cascada pura (en Cascada no volvés a requisitos en Construcción; en RUP sí iterás todas las disciplinas).

---

## UNIDAD 2 — De la idea del usuario al plan de entregas

> **Cadena lógica:** Descubrir qué necesita el usuario → Escribirlo sin ambigüedades → Priorizar y estimar cuánto tarda → Armar el mapa de entregas.

### 8. Ingeniería de Requisitos (4 Etapas), Curva de Boehm y Trazabilidad
- **Qué es:** Diferencia **RF** (qué hace el sistema) de **RNF** (calidad: velocidad, seguridad, usabilidad). Proceso en **4 Etapas**: *Obtención → Análisis → Especificación → Validación*. La **Curva de Boehm** muestra que arreglar un error de requisitos cuesta **1x** al definirlo y hasta **100x** en producción (como el guion faltante en la sonda *Mariner 1*). La **Matriz de Trazabilidad** une *Requisito ↔ Código ↔ Prueba*.
- **Objetivo / Para qué sirve:** Construir el producto correcto y evitar retrabajos exponenciales.
- **Cómo funciona:** En MediTurno pasamos de *"fácil de usar"* a un RNF testeable: *"sacar turno en ≤ 3 min y ≤ 4 pantallas, con ≥ 90% de éxito"*.
- **Cuándo SÍ / Cuándo NO:** Siempre al definir cualquier funcionalidad.
- **No confundir con:** Validar vs. Verificar (acá validamos que el requisito refleje lo que el usuario realmente necesita).

### 9. Proto-Personas vs. User Personas
- **Qué es:** **Proto-Persona**: hipótesis rápida basada en intuición interna del equipo. **User Persona**: perfil construido con investigación real (entrevistas, encuestas, analítica; duplica chances de éxito según *Forrester Research*).
- **Objetivo / Para qué sirve:** Diseñar para usuarios reales con dolores concretos en lugar de un "usuario promedio imaginario".
- **Cómo funciona:** Spotify usa proto-personas para features rápidas y user personas para estrategia. En MediTurno entrevistamos pacientes para crear a *Marta (70 años)* y *Ana (médica de guardia)*.
- **Cuándo SÍ / Cuándo NO:** Proto-Persona al arrancar (Discovery); User Persona antes de tomar decisiones fuertes de UX/producto.
- **No confundir con:** Segmento demográfico frío (una Persona tiene objetivos, frustraciones y escenario de uso).

### 10. Ideación: Design Thinking, Brainstorming y 6 Sombreros de Bono
- **Qué es:** **Design Thinking**: proceso centrado en el usuario (*Empatizar → Definir → Idear → Prototipar → Testear*; NN/g agrega *Implementar*). **Brainstorming**: reglas sin juicio + *Round-Robin* (por turnos) + *Reverse Brainstorming* (*"¿cómo hacer que falle?"*). **6 Sombreros**: separar pensamiento en *Blanco* (datos), *Rojo* (emociones), *Negro* (riesgos), *Amarillo* (beneficios), *Verde* (creatividad) y *Azul* (control).
- **Objetivo / Para qué sirve:** Explorar problemas complejos y tomar decisiones grupales sin que domine una sola voz ni se mezclen miedos con datos.
- **Cómo funciona:** En MediTurno usamos los 6 Sombreros para decidir si el pago online entra en el MVP (el Verde propuso pago opcional sin bloquear el turno).
- **Cuándo SÍ / Cuándo NO:** Cuando hay ambigüedad de diseño o conflicto de ideas en el equipo.
- **No confundir con:** Reuniones sin moderación donde todos discuten a la vez.

### 11. Casos de Uso vs. User Stories (3C, INVEST, Gherkin)
- **Qué es:** **Caso de Uso**: interacción detallada sistema-actor (flujo principal, alternativos, pre/postcondiciones). **User Story**: *"Como [rol], quiero [acción], para [beneficio]"* con las **3 C** (*Card, Conversation, Confirmation*), **INVEST** (*Independiente, Negociable, Valiosa, Estimable, Small, Testeable*) y criterios en **Gherkin** (*Dado / Cuando / Entonces*).
- **Objetivo / Para qué sirve:** Documentar qué quiere el usuario con el nivel justo de detalle para poder construirlo y probarlo.
- **Cómo funciona:** En MediTurno: *"Dado que elegí OSDE 210, Cuando busco Cardiología, Entonces solo veo cardiólogos de OSDE 210."*
- **Cuándo SÍ / Cuándo NO:** User Stories en Ágil; Casos de Uso/SRS en sistemas críticos con contratos cerrados.
- **No confundir con:** Escribir tareas técnicas de programador como si fueran User Stories (*"Como dev quiero crear tabla SQL"* no cumple INVEST).

### 12. Product Backlog (DEEP), MoSCoW y Valor vs. Esfuerzo
- **Qué es:** **DEEP** (*Detailed appropriately, Emergent, Estimated, Prioritized*). **MoSCoW** clasifica en *Must* (obligatorio), *Should* (importante), *Could* (deseable), *Won't* (no ahora). **Valor vs. Esfuerzo** prioriza primero las *Quick Wins* (alto valor, bajo esfuerzo).
- **Objetivo / Para qué sirve:** Ordenar qué se construye primero cuando no entra todo en el primer lanzamiento.
- **Cómo funciona:** En MediTurno: *Must* = reservar turno; *Should* = recordatorio; *Could* = reseñas; *Won't* = videollamada v1.
- **Cuándo SÍ / Cuándo NO:** En cada refinamiento (*Grooming*) para dejar historias *Sprint-Ready*.
- **No confundir con:** Un documento congelado; el Backlog es vivo y cambia con el aprendizaje.

### 13. Esfuerzo vs. Duración y Ley de Brooks
- **Qué es:** **Esfuerzo** = trabajo neto humano (horas-persona). **Duración** = tiempo calendario real (afectado por reuniones, bloqueos y eficiencia ~60–75%). **Ley de Brooks**: *"Sumar gente a un proyecto atrasado lo atrasa más"* por *onboarding*, tareas indivisibles y canales: `Canales = N × (N - 1) / 2`.
- **Objetivo / Para qué sirve:** Evitar promesas imposibles de fechas y frenar el error de meter más programadores cuando falta poco para entregar.
- **Cómo funciona:** Pasar de 4 a 8 devs en MediTurno sube los canales de comunicación de 6 a 28 y quita tiempo a los devs actuales para capacitar.
- **Cuándo SÍ / Cuándo NO:** Siempre al estimar fechas reales de calendario.
- **No confundir con:** Pensar que 40 horas de esfuerzo equivalen a 5 días exactos de 8 horas en el calendario.

### 14. Técnicas de Estimación: Tradicionales (PERT, COCOMO, FP), Ágiles (Story Points/Poker/T-Shirt) y PU (UCP)
- **Qué es:**
  - **PERT (3 Puntos):** `E = (O + 4M + P) / 6` y desvío `σ = (P - O) / 6`.
  - **COCOMO I / II:** Estima esfuerzo por tamaño (KLOC/FP) y factores de escala/costo (15 *Cost Drivers* en I; 5 factores de escala en II).
  - **Puntos de Función (FP):** Tamaño funcional contando 5 elementos (*EI, EO, EQ, ILF, EIF*) × factor de ajuste.
  - **Story Points + Planning Poker + T-Shirt Sizing:** Tamaño relativo (*complejidad + esfuerzo + incertidumbre* en Fibonacci) votado en simultáneo para evitar anclaje; *Velocidad* = puntos *Done* por Sprint.
  - **UCP (*Use Case Points*):** `(UAW + UUCW) × TCF × ECF` en Proceso Unificado.
- **Objetivo / Para qué sirve:** Calcular cuánto trabajo implica cada entrega según la metodología elegida.
- **Cómo funciona:** En MediTurno usamos **Planning Poker** (uno vota 3 y otro 8 por la API lenta de obra social, debaten y cierran en 5).
- **Cuándo SÍ / Cuándo NO:** Story Points en Ágil; PERT/COCOMO/FP en contratos predictivos cerrados; UCP en RUP.
- **No confundir con:** Convertir 1 Story Point en "X horas exactas" (los Story Points miden tamaño relativo, no horas).

### 15. EDT/WBS, Triángulo Invertido, Story Mapping y Roadmap vs. Releases
- **Qué es:** **EDT/WBS**: desglose jerárquico de entregables con la *Regla del 100%*. **Triángulo Invertido**: Ágil fija *Tiempo y Costo* y varía *Alcance/Valor* (al revés que Cascada). **User Story Mapping**: mapa 2D donde el primer corte horizontal usable es el *Walking Skeleton (MVP)*. **Roadmap** (*Why/What/How*, *Now/Next/Later*, *Market Pull vs. Technology Push*) vs. **Plan de Releases** (cierra con *Smoke Test* y *UAT*).
- **Objetivo / Para qué sirve:** Conectar la visión estratégica a meses/trimestres con lo que se libera a producción en los próximos Sprints.
- **Cómo funciona:** En MediTurno usamos *Story Mapping* para definir qué entra en el Release 1 y *Roadmap* para mostrar a la clínica qué viene en Q2/Q3.
- **Cuándo SÍ / Cuándo NO:** Roadmap/Story Mapping en producto ágil; EDT cerrada en proyectos predictivos.
- **No confundir con:** Confundir *Roadmap* (dirección del producto) con *Diagrama de Gantt* (calendario detallado de tareas).

---

## UNIDAD 3 — De los números a los acuerdos con personas

> **Cadena lógica:** Validar viabilidad y finanzas → Justificar el negocio y mercado → Alinear a los interesados y formalizar documentos.

### 16. Las 4 Dimensiones de Viabilidad, Costos y Beneficios
- **Qué es:** Estudio previo en 4 patas: **Técnica** (stack, APIs, equipo), **Operativa** (la gente lo puede usar y sostener), **Legal** (leyes, licencias, datos) y **Económica** (costos *directos, indirectos y ocultos* vs. beneficios *tangibles e intangibles*).
- **Objetivo / Para qué sirve:** Evitar construir software que funcione técnicamente pero fracase por ilegal, carísimo o rechazado por los usuarios.
- **Cómo funciona:** En MediTurno validamos protección de datos médicos (*Legal*) y capacitación de 1 hora a recepcionistas (*Operativa*). Los beneficios intangibles (imagen) pueden monetizarse con proxies (menos rotación o más retención).
- **Cuándo SÍ / Cuándo NO:** Siempre antes de aprobar el presupuesto del proyecto.
- **No confundir con:** Viabilidad técnica sola (*"si se puede programar, ya está"* es el error que hace fracasar al 70% de los proyectos).

### 17. Métricas Financieras: ROI, VAN, TIR, TMAR y Payback
- **Qué es:**
  - **ROI (*Return on Investment*):** `(GNI / Costo) × 100` (donde `GNI = Beneficios - Costos`). No considera el valor del dinero en el tiempo.
  - **TMAR (*Tasa Mínima Aceptable de Rendimiento*):** Rentabilidad mínima exigida por el inversor.
  - **VAN (*Valor Actual Neto*):** `∑ [CFt / (1 + r)^t] - I0` (descuenta flujos futuros a valor hoy).
  - **TIR (*Tasa Interna de Retorno*):** Tasa que hace `VAN = 0`.
  - **Payback:** Tiempo para recuperar la inversión (`I0 / Flujo anual`).
- **Objetivo / Para qué sirve:** Decidir objetivamente si conviene invertir o rechazar el proyecto.
- **Cómo funciona (Caso de clase / MediTurno):** `I0 = $20.000`, flujos `$10.000/año` por 3 años, `TMAR = 10%`: `ROI = 50%`, `Payback = 2 años`, `VAN = 9.090,91 + 8.264,46 + 7.513,15 - 20.000 = +$4.868,52` (> 0) y `TIR = 23,38%` (> TMAR 10%). **Se acepta.**
- **Cuándo SÍ / Cuándo NO:** VAN y TIR siempre para decidir inversiones; ROI simple nunca solo en contextos con inflación o plazos largos.
- **No confundir con:** Pensar que `TIR > 0` alcanza para aceptar (tiene que ser `TIR > TMAR`).

### 18. Caso de Negocio (*Business Case*), FODA, 4 P y Matriz de Ansoff
- **Qué es:** El **Caso de Negocio** (dueño: **Sponsor Ejecutivo**) justifica la inversión usando **Tabla Competitiva**, **FODA** (*Fortalezas/Debilidades* internas; *Oportunidades/Amenazas* externas), **4 P del Marketing** (*Producto, Precio, Plaza, Promoción*) y **Matriz de Ansoff** (*Penetración de Mercado, Desarrollo de Producto, Desarrollo de Mercado, Diversificación*).
- **Objetivo / Para qué sirve:** Defender comercial y estratégicamente el proyecto ante el directorio.
- **Cómo funciona:** En MediTurno usamos *Penetración de Mercado* (ofrecer turnos online a pacientes que ya van a las clínicas), en vez de *Diversificación* (producto nuevo en mercado nuevo, muchísimo más riesgoso).
- **Cuándo SÍ / Cuándo NO:** Sí al lanzar un producto al mercado o pedir presupuesto grande; puede simplificarse en proyectos internos chicos.
- **No confundir con:** *Project Plan* (el Caso de Negocio dice *por qué conviene*; el Plan dice *cómo ejecutarlo*).

### 19. Propuesta de Valor (Lienzo de Osterwalder)
- **Qué es:** Conecta el **Perfil del Cliente** (*Trabajos, Frustraciones, Alegrías*) con el **Mapa de Valor** (*Productos/Servicios, Aliviadores de frustraciones, Creadores de alegrías*) para lograr **Product-Market Fit**.
- **Objetivo / Para qué sirve:** Expresar en segundos por qué el cliente debería elegir tu solución.
- **Cómo funciona:** Dolor del paciente: esperar 20 min al teléfono; Aliviador de MediTurno: confirmar turno en 3 clics en 30 segundos.
- **Cuándo SÍ / Cuándo NO:** Sí al diseñar productos comerciales; opcional si es un sistema interno obligatorio sin competencia.
- **No confundir con:** Lista de características técnicas del sistema.

### 20. Gestión de Stakeholders (Matriz Poder/Interés) y Comunicación (5W+1H)
- **Qué es:** **Stakeholders** = personas/grupos que afectan o son afectados por el proyecto. La **Matriz Poder/Interés** (variante PMBOK + Grupos A/B/C/D) divide en: *Gestionar de cerca (D Promotores)*, *Mantener satisfecho (C Latentes)*, *Mantener informado (B Defensores)* y *Monitorear (A Apáticos)*. El **Plan 5W+1H** define *What, Why, Who, When, Where, How* (canales síncronos vs. asíncronos).
- **Objetivo / Para qué sirve:** Invertir el esfuerzo de comunicación donde realmente importa y evitar que un actor poderoso frene el proyecto.
- **Cómo funciona:** En MediTurno: Director Médico = *Gestionar de cerca* (demo quincenal); Legal/AFIP = *Mantener satisfecho*; Recepcionistas = *Mantener informadas*.
- **Cuándo SÍ / Cuándo NO:** En todo proyecto con múltiples áreas o clientes.
- **No confundir con:** Mandar el mismo mail largo a todos los interesados por igual.

### 21. Negociación (Distributiva vs. Integrativa), TKI y 4 Documentos Rectores
- **Qué es:** Negociación **Distributiva** (suma cero, Ganar-Perder) vs. **Integrativa** (Ganar-Ganar). **Modelo TKI (*Thomas-Kilmann*)**: 5 estilos (*Competir, Colaborar, Comprometer, Evitar, Acomodar*). **4 Documentos Rectores:** *Brief* (idea) → *Business Case* (¿conviene?) → *Project Charter* (autoriza proyecto y PM) → *Project Plan* (cómo ejecutar).
- **Objetivo / Para qué sirve:** Resolver conflictos de alcance/tiempos sin romper la relación y formalizar la autoridad del proyecto.
- **Cómo funciona:** Con médicos usamos *Colaborar* para acordar horarios; si piden contraseñas sin cifrar, usamos *Competir* (seguridad no negociable).
- **Cuándo SÍ / Cuándo NO:** *Colaborar* en decisiones clave; *Competir* solo en urgencias o reglas legales/seguridad.
- **No confundir con:** Confundir *Business Case* (justifica) con *Project Charter* (autoriza formalmente y nombra al líder).

---

## UNIDAD 4 — Conducir al equipo, medir el ritmo y controlar desvíos

> **Cadena lógica:** Liderar al equipo → Medir el flujo y avance → Controlar cambios y código → Cruzar costo y cronograma (EVM) y reportar.

### 22. Liderazgo Situacional (Hersey-Blanchard), Motivación (Pink) y Tuckman
- **Qué es:** **Hersey-Blanchard** adapta el liderazgo (**E1 Dirigir, E2 Persuadir, E3 Participar, E4 Delegar**) según la madurez (**M1–M4**). **Daniel Pink**: en trabajo creativo motivan **Autonomía, Maestría y Propósito** (intrínseca) más que bonos externos (extrínseca). **5 Etapas de Tuckman**: *Forming → Storming → Norming → Performing → Adjourning*.
- **Objetivo / Para qué sirve:** Sacar lo mejor de cada persona según su experiencia y atravesar los roces iniciales del equipo.
- **Cómo funciona:** En MediTurno pasamos de *Storming* (discusión por librerías) a *Performing*; al dev junior (M1) le aplicamos *E1 Dirigir* y a la senior (M4) *E4 Delegar*.
- **Cuándo SÍ / Cuándo NO:** Siempre que lideres equipos; si entra gente nueva, el equipo puede retroceder temporalmente a *Storming*.
- **No confundir con:** Tratar igual a un junior inseguro que a un senior autónomo.

### 23. Gantt vs. Kanban, Burndown vs. Burnup, WIP, Little y CFD
- **Qué es:** **Gantt** muestra fechas y dependencias; **Kanban** muestra estado y flujo. **Sprint Burndown** baja trabajo pendiente; **Release Burnup** sube trabajo hecho vs. alcance total. **Lead Time** (entrada hasta entrega, con esperas) vs. **Cycle Time** (trabajo activo). **Ley de Little**: `Cycle Time = WIP / Throughput`. **CFD (*Cumulative Flow Diagram*)**: bandas acumuladas donde la altura vertical = WIP y la distancia horizontal = tiempo de ciclo.
- **Objetivo / Para qué sirve:** Detectar cuellos de botella en tiempo real y distinguir si un atraso es por ritmo lento o por cambios de alcance.
- **Cómo funciona:** En MediTurno limitamos *WIP = 2* por dev; en el CFD vemos si la banda *En Revisión/QA* se ensancha y frenamos nuevas tareas hasta destrabar QA.
- **Cuándo SÍ / Cuándo NO:** *Burnup* hacia gerencia cuando el alcance puede crecer; *Burndown* dentro de un Sprint cerrado.
- **No confundir con:** Confundir *Lead Time* (incluye cola/espera) con *Cycle Time* (solo trabajo activo; siempre `Cycle Time ≤ Lead Time`).

### 24. Reuniones, Control de Cambios (CCB) y Scope Creep
- **Qué es:** **Reuniones efectivas** = agenda + timebox + minuta. **Scope Creep** = expansión descontrolada del alcance sin ajustar tiempo ni costo. **CCB (*Change Control Board*)**: proceso en 4 pasos (*registrar → evaluar impacto → decidir → actualizar líneas base*).
- **Objetivo / Para qué sirve:** Evitar que pedidos informales "de paso" destruyan las fechas y el presupuesto.
- **Cómo funciona:** Un médico pide historia clínica completa a mitad del Sprint 3; el PO frena el *Scope Creep* y lo evalúa aparte para un futuro Release.
- **Cuándo SÍ / Cuándo NO:** Siempre que aparezca un pedido fuera del acuerdo actual.
- **No confundir con:** Negarse a todo cambio en Ágil (en Ágil los cambios entran *entre* Sprints priorizados en el Backlog, no a escondidas en medio de un Sprint).

### 25. SCM y Control de Versiones con Git (Git Flow vs. GitHub Flow)
- **Qué es:** **SCM (*Gestión de Configuración*)** controla versiones y trazabilidad. **Commits Atómicos** = un cambio lógico coherente que compila y pasa tests. **Git Flow**: varias ramas fijas (*main, develop, release, hotfix*). **GitHub Flow**: solo `main` desplegable + ramas cortas con Pull Request y CI.
- **Objetivo / Para qué sirve:** Trabajar en paralelo sin pisar código ajeno y poder revertir fallos rápido.
- **Cómo funciona:** En MediTurno usamos *GitHub Flow* porque desplegamos todas las semanas y no necesitamos ramas *release* paralelas.
- **Cuándo SÍ / Cuándo NO:** GitHub Flow para SaaS/web continuo; Git Flow para software con múltiples versiones mantenidas en clientes.
- **No confundir con:** Confundir *Git* (herramienta de versiones) con *GitHub* (plataforma de alojamiento y PRs).

### 26. Técnica del Valor Ganado (EVM), Informes por Audiencia, PDCA e Híbridos
- **Qué es:** **EVM** cruza **PV** (planificado), **EV** (valor ganado real) y **AC** (costo real) frente a **BAC** (presupuesto total): `CV = EV - AC`, `SV = EV - PV`, `CPI = EV / AC`, `SPI = EV / PV`, `EAC = BAC / CPI`, `ETC = EAC - AC`, `VAC = BAC - EAC`. **Informes por Audiencia**: RAG (*Red/Amber/Green*) + EVM para gerencia; Jira/PRs para devs; demos para cliente. **PDCA** (*Plan–Do–Check–Act*). **Híbrido**: macro predictivo + micro ágil.
- **Objetivo / Para qué sirve:** Medir en pesos si vamos atrasados o con sobrecosto y comunicarlo al nivel adecuado.
- **Cómo funciona (Ejemplo de clase / MediTurno al Mes 4, BAC = $100.000):** `PV = $40k`, `EV = $30k`, `AC = $35k` ⇒ `CV = -$5k`, `SV = -$10k`, `CPI = 0,86`, `SPI = 0,75`, `EAC = $116.667` (crítico: atrasado y caro).
- **Cuándo SÍ / Cuándo NO:** Sí en predictivo o a nivel presupuesto macro (híbrido); NO micro-aplicado a cada historia ágil.
- **No confundir con:** Pensar que `CPI < 1` es bueno (en EVM, `< 0` en varianzas y `< 1` en índices es **MALO**).

---

## UNIDAD 5 — Prevenir defectos, anticipar riesgos y aprender de fallos

> **Cadena lógica:** Construir calidad desde temprano → Anticipar riesgos → Investigar causas raíz si algo falla.

### 27. QA vs. QC, Shift-Left Testing y Casos Críticos
- **Qué es:** **QA (*Aseguramiento*)** previene errores en el proceso; **QC (*Control*)** detecta defectos en el producto. **Shift-Left** mueve pruebas y seguridad hacia etapas tempranas. Casos reales: **Boeing 737 MAX** (MCAS dependiente de 1 sensor) y **Knight Capital** (despliegue manual fallido perdió US$ 440M en 45 min).
- **Objetivo / Para qué sirve:** Evitar catástrofes financieras o humanas atrapando errores cuando todavía son baratos.
- **Cómo funciona:** En MediTurno exigimos checklists de PR y tests antes de mergear (QA) y corremos la suite en cada commit (Shift-Left).
- **Cuándo SÍ / Cuándo NO:** Siempre; probar recién al final dispara costos (Boehm).
- **No confundir con:** Pensar que QA es sinónimo de "el equipo que hace testing manual al final" (eso es QC).

### 28. Familia ISO/IEC 25000 (SQuaRE) e ISO/IEC 25010
- **Qué es:** **ISO/IEC 25000** marca la calidad global; su modelo **ISO/IEC 25010** evalúa el producto en **8 características**: *Adecuación Funcional, Eficiencia de Desempeño, Compatibilidad, Usabilidad, Fiabilidad, Seguridad, Mantenibilidad y Portabilidad*.
- **Objetivo / Para qué sirve:** Tener un lenguaje estándar para medir qué significa "software de calidad" más allá de que "no tire error".
- **Cómo funciona:** En MediTurno priorizamos *Seguridad* (datos médicos), *Usabilidad* (adultos mayores) y *Fiabilidad* como guía práctica (sin burocracia rígida, a diferencia de sectores regulados como ANMAT/AFIP).
- **Cuándo SÍ / Cuándo NO:** Como guía en equipos ágiles; como norma auditable obligatoria en salud crítica, banca o gobierno.
- **No confundir con:** Procesos de madurez organizacional (eso es CMMI, Unidad 6).

### 29. Verificación vs. Validación (V&V), Pirámide FIRST y Sprint Review
- **Qué es:** **Verificación** (*"¿construimos bien el producto?"* → Code Reviews que reducen 15–30% de errores en Google/Microsoft, SAST, Unit Tests **FIRST**: *Fast, Independent, Repeatable, Self-Validating, Timely*, Integración). **Validación** (*"¿construimos el producto correcto?"* → E2E, UAT, **Sprint Review** mostrando solo ítems 100% *Done*).
- **Objetivo / Para qué sirve:** Asegurar tanto la solidez técnica interna como la utilidad real para el usuario final.
- **Cómo funciona:** En MediTurno combinamos Unit Tests FIRST + Integración en Docker + E2E de sacar turno + UAT con recepcionistas.
- **Cuándo SÍ / Cuándo NO:** Siempre respetar la **Pirámide** (muchos Unit Tests abajo, pocos E2E arriba).
- **No confundir con:** **Antipatrón Cono de Helado** (casi sin Unit Tests y todo probado manual/E2E al final = lento y frágil).

### 30. Gestión de Riesgos (PMBOK, Known/Unknown, Delphi, Matriz PI, ALARP, Monte Carlo, Tornado, Risk Register)
- **Qué es:** **Riesgo** = evento incierto futuro (positivo = Oportunidad; negativo = Amenaza; si ya ocurrió = **Problema/Issue**). *Known-Unknowns* → **Reserva de Contingencia**; *Unknown-Unknowns* → **Reserva de Gestión**. Priorización en **Matriz PI** (*Probabilidad × Impacto*) bajo principio **ALARP** (*tan bajo como sea razonablemente factible*), documentado en el **Risk Register**. Herramientas extra: **Método Delphi** (6 fases anónimas sin sesgo de jefe), **Monte Carlo** (miles de simulaciones) y **Tornado** (sensibilidad).
- **Objetivo / Para qué sirve:** Anticipar golpes antes de que ocurran y asignar reservas realistas.
- **Cómo funciona:** En MediTurno mitigamos la caída de la API de obras sociales con caché + reintentos (**Mitigar**, no *Evitar* porque quitaría el corazón del negocio).
- **Cuándo SÍ / Cuándo NO:** Matriz PI + Risk Register siempre; Delphi/Monte Carlo solo en proyectos grandes o presupuestos millonarios.
- **No confundir con:** Estrategias de **Amenazas** (*Evitar, Mitigar, Transferir, Aceptar*) vs. **Oportunidades** (*Explotar, Mejorar, Compartir, Aceptar*).

### 31. Riesgos en Ágil: EMV, WSJF (Reinertsen), Technical Spikes y RCA (5 Porqués + Ishikawa)
- **Qué es:** Riesgos ágiles de alcance: *Scope Bloat, Scope Volatility, Value Dilution*. **EMV** = `Probabilidad × Impacto ($)`. **WSJF** = `Cost of Delay / Duración` (hacer primero lo corto que cuesta caro demorar). **Technical Spike** = experimento corto con timebox para despejar dudas técnicas. **RCA (*Análisis de Causa Raíz*)** en Retrospectiva (*Start/Stop/Continue*): **5 Porqués** y **Diagrama de Ishikawa (Espina de Pescado)**.
- **Objetivo / Para qué sirve:** Priorizar riesgos económicamente en el Backlog y corregir fallos sistémicos sin buscar culpables.
- **Cómo funciona:** Si se duplica un turno en MediTurno, los *5 Porqués* revelan que faltó índice único y test de concurrencia, y esa regla entra a la DoD.
- **Cuándo SÍ / Cuándo NO:** WSJF y Spikes en todo proyecto ágil; RCA tras cada incidente o desvío recurrente.
- **No confundir con:** Caza de brujas buscando a quién echarle la culpa del bug.

---

## UNIDAD 6 — Retener el saber y automatizar entregas

> **Cadena lógica:** Capitalizar el conocimiento → Madurar procesos → Automatizar CI/CD y salidas seguras → Reforzar testing.

### 32. Conocimiento (Tácito/Explícito), KM vs. KC, DIKW y SECI + Ba
- **Qué es:** Conocimiento **Tácito** (en la cabeza), **Implícito** (articulable) y **Explícito** (documentado). **KM** = estrategia global; **KC** = volver la experiencia individual un activo de la empresa para bajar el **Bus Factor**. **Pirámide DIKW**: *Data → Information → Knowledge → Wisdom*. **Espiral SECI**: *Socialización* (Pair Programming), *Externalización* (ADRs/Post-mortems), *Combinación* (Wiki/Tech Radar), *Internalización* (Code Katas) en un espacio **Ba**.
- **Objetivo / Para qué sirve:** Evitar que la empresa quede paralizada si renuncia el único programador que entiende un módulo.
- **Cómo funciona:** En MediTurno combatimos el *Knowledge Hoarding* (acaparar saber) haciendo Pair Programming y dejando **ADRs** en Git.
- **Cuándo SÍ / Cuándo NO:** Siempre desde el día 1 en equipos de software.
- **No confundir con:** Documentación burocrática gigante que nadie lee (KC usa artefactos vivos cortos).

### 33. OPAs, CMMI V3.0, AAR, ADRs, DoD Evolutiva, Tech Radar y CoP
- **Qué es:** **OPAs** (*Activos de Procesos Organizacionales*: plantillas y repos históricos). **CMMI V3.0** mide madurez en 5 niveles (*1 Inicial → 2 Gestionado → 3 Definido → 4 Cuantitativo → 5 Optimización*). **AAR** (*After Action Review*) y **Post-mortems sin culpa** capturan aprendizajes. **ADR** (*Architecture Decision Record*), **DoD Evolutiva** (4 fases de rigor), **Tech Radar** (*Adopt/Trial/Assess/Hold*) y **CoP** (*Comunidades de Práctica*).
- **Objetivo / Para qué sirve:** Institucionalizar las buenas prácticas para no tropezar dos veces con la misma piedra.
- **Cómo funciona:** Con OPAs ligeros en Git (plantilla ADR + DoD Evolutiva) MediTurno pasa de CMMI 1 a 2–3 sin ahogarse en papeles.
- **Cuándo SÍ / Cuándo NO:** ADRs y DoD Evolutiva siempre; CMMI Nivel 5 solo en grandes corporaciones maduras.
- **No confundir con:** ISO 25010 (ISO evalúa calidad del *producto*; CMMI evalúa madurez de los *procesos* de la organización).

### 34. CI/CD, 5 Estrategias de Despliegue y CC/CD en IA
- **Qué es:** **CI** (*Integración Continua*): build (Maven, Gradle, npm/yarn, Make) + tests automáticos en cada push. **Continuous Delivery**: listo para salir con aprobación manual; **Continuous Deployment**: sale automático. **5 Estrategias**: *Big Bang* (todo de golpe), *Rolling* (uno a uno), *Blue-Green* (2 entornos, cambio instantáneo), *Canary* (5–10% primero), *Feature Flags* (apagar/prender en vivo). **CC/CD en IA**: *Continuous Calibration + Evals* para software probabilístico.
- **Objetivo / Para qué sirve:** Entregar valor rápido sin dejar a los usuarios sin servicio ante un error.
- **Cómo funciona:** En MediTurno desplegamos con *Blue-Green* o *Canary* + *Feature Flags* (nunca *Big Bang*, que dejaría 3 clínicas caídas).
- **Cuándo SÍ / Cuándo NO:** Canary/Blue-Green en sistemas en vivo; CC/CD con Evals cuando sumamos chatbots o agentes de IA.
- **No confundir con:** Confundir *Continuous Delivery* (aprobación humana final) con *Continuous Deployment* (100% automático).

### 35. Refuerzo de Testing: Caja Blanca vs. Negra y Exploratory Testing
- **Qué es:** **Caja Blanca** mira código fuente, ramas `if/else` y cobertura (Unit Tests). **Caja Negra** prueba entradas y salidas desde afuera sin ver código (APIs, E2E, UAT). **Exploratory Testing** usa criterio humano transversal para cazar fallos raros.
- **Objetivo / Para qué sirve:** Cubrir tanto errores lógicos internos como flujos reales de usuario.
- **Cómo funciona:** En MediTurno combinamos Unit Tests de Caja Blanca con Playwright de Caja Negra.
- **Cuándo SÍ / Cuándo NO:** Siempre ambos en pirámide (evitando el *Cono de Helado*).
- **No confundir con:** *QA vs. QC* (QA/QC habla de prevención vs. detección; Caja Blanca/Negra habla de si mirás o no el código al probar).

---

## SECCIÓN 7 — Las 8 Tecnologías Prácticas (Cómo se implementa todo)

### 36. Resumen estructurado de las 8 Herramientas de Cátedra
| # | Herramienta | Qué es y para qué sirve | Con qué teoría de U1–U6 conecta |
|---|---|---|---|
| **1** | **Jira** | Tablero SDLC (*Backlog → To Do → In Progress → Review → QA → Blocked → Done*) con jerarquía *Hito → Épica → Story INVEST → Task*. | Scrum, Kanban/WIP, Jerarquía ágil, INVEST y Risk Register (U1, U2, U4, U5). |
| **2** | **Docker y Compose** | Contenedores livianos (comparten kernel del host, mejor que VMs). Compose orquesta Nginx + FastAPI + MySQL con red DNS, volúmenes y healthcheck. | Portabilidad ISO 25010, entornos reproducibles de integración y CI/CD (U5, U6). |
| **3** | **MS Project / ProjectLibre** | Diagrama de **Gantt** con dependencias (**FS, SS, FF, SF**) y cálculo de **Ruta Crítica (CPM)** (tareas con holgura = 0). | Cascada, EDT/WBS, Esfuerzo vs. Duración, PERT y Enfoque Híbrido (U1, U2, U4). |
| **4** | **OpenCode y SDD** | *Coding Agent* guiado por **Spec-Driven Development** (*Contexto, Contrato API, Restricciones, Criterios*) en flujo *Plan → Build* (no *vibe coding*). | Requisitos claros sin ambigüedad, V&V y CC/CD en IA (U2, U5, U6). |
| **5** | **Playwright y QA Adaptativo** | Testing **E2E** en navegadores reales con *Locators semánticos*, patrón **POM** (*Page Object Model*), Fixtures, *Trace Viewer* y selectores con LLMs para SPAs. | Caja Negra, Pirámide de Testing, Shift-Left y CC/CD (U5, U6). |
| **6** | **GitHub Actions** | Pipeline CI (*Workflow → Event/Trigger → Job → Runner → Step/Action*) con *Status Checks* y *Branch Protection Rules* como Quality Gate. | GitHub Flow, QA preventivo, CI/CD y DoD automatizada (U4, U5, U6). |
| **7** | **CD y Observabilidad (PaaS + Sentry)** | Despliegue en **PaaS** (Render/Netlify, sin administrar SO como en IaaS) + **Sentry** para ver los **3 Pilares**: *Logs, Métricas y Trazas*. | Continuous Delivery/Deployment, Fiabilidad ISO 25010 y DIKW (U5, U6). |
| **8** | **SonarCloud y Dependabot (DevSecOps)** | **SonarCloud** corre **SAST** (análisis estático sin ejecutar código: *Code Smells*, bugs, deuda técnica) y **Dependabot** corre **SCA** (audita librerías contra *Supply Chain Attacks*). | Software Rot (U1), Boehm (U2), Mantenibilidad/Seguridad ISO 25010 y DoD (U5, U6). |
