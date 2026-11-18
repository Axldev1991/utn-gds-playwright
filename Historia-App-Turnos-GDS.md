# MediTurno: La Historia Completa para Entender GDS

> **De qué va este apunte:** Contamos un único proyecto real de principio a fin: **MediTurno**, una app web de turnos médicos online para una red de 3 clínicas privadas (equipo de 4 desarrolladores + 1 Product Owner + 1 Scrum Master).
> En lugar de meter los 60 temas de la materia a la fuerza, en cada unidad vas a ver **3 bloques claros**:
> 1. **Lo que SÍ aplicamos en MediTurno** (con su breve explicación y la escena real de cómo lo usamos).
> 2. **Lo que NO aplicamos porque elegimos otra alternativa** (el contraste directo y cuándo sí se usaría).
> 3. **Lo que quedó afuera porque no lo necesitamos acá** (temas válidos de otra escala que en este proyecto sobran).

---

## Unidad 1 — Cómo nace MediTurno y cómo nos organizamos

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Naturaleza del software (*Papel dual* y *Software Rot*):**
  - *Qué es:* El software es un **producto** en sí mismo y el **vehículo** que transforma un negocio; además, no se desgasta físicamente como el hardware (**Curva de la Bañera**), sino que se deteriora por cambios y deuda técnica (**Software Rot**).
  - *En MediTurno:* Es la app que usa el paciente (producto) y el medio para bajar un 40% las llamadas perdidas de las clínicas (vehículo). Como todo el costo está en diseñarlo la primera vez, instalarlo en una 4.ª clínica cuesta casi cero. Y para evitar el *Software Rot*, prohibimos parches apurados sin tests.
- **Principio W5HH de Barry Boehm + Objetivos SMART:**
  - *Qué es:* **W5HH** son 7 preguntas para no arrancar a ciegas (*Why, What, When, Who, Where, How, How Much*); **SMART** exige metas *Específicas, Medibles, Alcanzables, Relevantes y con Plazo*.
  - *En MediTurno:* Antes de programar respondemos el W5HH: **Why** (bajar ausentismo y llamadas), **What** (reservas y recordatorios), **When** (primera versión en 2 meses), **Who** (4 devs + PO), **Where** (3 clínicas), **How** (Scrum + Web), **How Much** (\$20.000). Y fijamos un objetivo **SMART** concreto: *"Permitir que un paciente saque turno en menos de 2 minutos antes del 30 de junio."*
- **Marco de trabajo Scrum (Sprints de 2 semanas):**
  - *Qué es:* Marco ágil basado en **3 Pilares** (*Transparencia, Inspección, Adaptación*), **3 Roles** (*Product Owner, Scrum Master, Developers*), **3 Artefactos con sus compromisos** (*Product Backlog → Product Goal*, *Sprint Backlog → Sprint Goal*, *Incremento → DoD: Definition of Done / Definición de Terminado*) y **5 Eventos** (*Sprint, Sprint Planning, Daily Scrum, Sprint Review, Retrospective*).
  - *En MediTurno:* Cada lunes de por medio hacemos el *Sprint Planning* para elegir qué entra en las próximas 2 semanas. Todos los días a las 9:30 hacemos una *Daily* de 15 minutos para destrabar bloqueos. El viernes de la segunda semana hacemos la *Sprint Review* mostrando la app andando a los médicos y luego la *Retrospective* interna para ajustar cómo trabajamos.
- **Estrategia de MVP (*Minimum Viable Product*) de Henrik Kniberg:**
  - *Qué es:* Entregar desde la primera iteración un producto chico pero usable que ya resuelve el problema (*patineta → monopatín → bici → auto*), en vez de partes sueltas sin utilidad hasta el final.
  - *En MediTurno:* En el mes 1 lanzamos la "patineta" (elegir médico, día y confirmar turno sin pago online). En el mes 2 sumamos recordatorios por WhatsApp ("bici"). Recién después agregamos pagos online ("auto").

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **Cascada (*Waterfall*) + WBS rígida:** Avanza por fases secuenciales cerradas (*Requisitos → Diseño → Código → Test → Despliegue*). **Elegimos Scrum + MVP** porque las clínicas cambian reglas médicas cada semana y en Cascada recién verían algo andando a los 6 meses. *(Cascada sirve cuando los requisitos son 100% fijos desde el día 1, como software médico embebido).*
- **Kanban puro desde el arranque:** Flujo continuo sin Sprints ni demos programadas. **Elegimos Scrum al inicio** porque necesitamos el ritmo fijo de la *Sprint Review* cada 2 semanas para alinear expectativas con los directores médicos. *(Kanban puro lo usaremos recién **después** del lanzamiento para soporte).*

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **Proceso Unificado (PU / RUP):** Modelo híbrido en 4 fases (*Concepción/LCO, Elaboración/LCA, Construcción/IOC, Transición/PR*) con múltiples vistas formales. Es excelente para sistemas bancarios enormes, pero es sobre-ingeniería para un equipo de 4 personas.
- **Desarrollo formal de Las 4 Capas de Pressman, Polya y Modelo MOI:** Son marcos conceptuales de fondo que ya están implícitos en cómo trabaja el equipo (calidad como base, liderazgo servicial), pero no generan un artefacto propio separado en el día a día.

---

## Unidad 2 — Qué necesita el paciente y cuánto va a tardar

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Requisitos No Funcionales (RNF) medibles (cuidando la Curva de Boehm):**
  - *Qué es:* Los **RF** dicen *qué hace* el sistema; los **RNF** dicen *cómo de bien* lo hace. La **Curva de Boehm** muestra que un error de requisitos cuesta **1x** al definirlo y hasta **100x** en producción (como el guion faltante de la sonda *Mariner 1*).
  - *En MediTurno:* El dueño de la clínica pide *"que la app sea fácil de usar"*. Como eso no se puede testear, lo bajamos a un **RNF verificable**: *"Un paciente nuevo debe poder sacar un turno en ≤ 3 minutos y ≤ 4 pantallas, con ≥ 90% de tasa de éxito."*
- **User Personas validadas (pasando desde Proto-Personas):**
  - *Qué es:* Una **Proto-Persona** es una hipótesis rápida interna; una **User Persona** se arma con entrevistas reales (duplica la chance de éxito según *Forrester Research*).
  - *En MediTurno:* El día 1 bocetamos una Proto-Persona (*Carlos, 28 años, apurado*), pero antes de diseñar pantallas entrevistamos gente real en la sala de espera y creamos dos **User Personas**: *Ana (médica de guardia con 30 segundos entre pacientes)* y *Marta (jubilada de 70 años que usa letras grandes y se traba con formularios largos)*.
- **Los 6 Sombreros para Pensar de Edward de Bono:**
  - *Qué es:* Técnica de reunión donde todo el grupo adopta el mismo enfoque al mismo tiempo para decidir sin mezclar emociones con datos ni riesgos.
  - *En MediTurno (decidimos si cobrar el coseguro online en el MVP):*
    - **Azul (Control):** *"En 20 minutos decidimos si el pago online entra en el MVP o queda para después."*
    - **Blanco (Datos):** Administración muestra que el 65% paga con débito/transferencia y hay un 22% de ausentismo.
    - **Amarillo (Beneficios):** El PO destaca que cobrar antes baja el ausentismo y ahorra tiempo en ventanilla.
    - **Negro (Riesgos):** El Tech Lead advierte que integrar pasarela + obras sociales suma 3 semanas y si se cae un lunes, bloquea las reservas.
    - **Rojo (Emociones):** Las recepcionistas admiten miedo a recibir quejas si falla un cobro con tarjeta.
    - **Verde (Creatividad):** Un dev propone confirmar el turno gratis y ofrecer un botón opcional de *"Adelantar pago"* al final.
    - **Azul (Cierre):** Decisión: MVP sin pagos; pago opcional en el Release 2.
- **Historias de Usuario (*User Stories*) con INVEST y Gherkin:**
  - *Qué es:* Necesidad corta (*Como [rol], quiero [acción], para [beneficio]*) que cumple **INVEST** (*Independiente, Negociable, Valiosa, Estimable, Pequeña, Testeable*) y criterios en **Gherkin** (*Dado / Cuando / Entonces*).
  - *En MediTurno:* Escribimos: *"Como paciente, quiero filtrar médicos por obra social, para no sacar turno con alguien que no me cubre."* Y su criterio en **Gherkin**: *"Dado que elegí 'OSDE 210', Cuando busco 'Cardiología', Entonces solo veo cardiólogos que atienden OSDE 210."*
- **Estimación relativa (Story Points + Planning Poker) y Ley de Brooks:**
  - *Qué es:* **Story Points** mide tamaño relativo (*complejidad + esfuerzo + incertidumbre* en escala Fibonacci) votado en **Planning Poker**. La **Ley de Brooks** recuerda que sumar gente a un proyecto atrasado lo atrasa más (`Canales = N × (N - 1) / 2`).
  - *En MediTurno:* Al votar la historia de validar padrón de obra social, un dev tira **3** y otro **8**. El de 8 explica que la API externa a veces devuelve XML lento; debaten y cierran en **5 puntos**. Días después, la clínica ofrece sumar 4 devs nuevos para terminar antes: lo frenamos explicando que **Esfuerzo ≠ Duración** y que pasar de 4 a 8 devs dispara los canales de comunicación de 6 a 28.

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **SRS (*Software Requirements Specification*) formal y Casos de Uso pesados:** Documentar flujos completos antes de programar. **Elegimos User Stories + Gherkin** porque las pantallas cambian tras cada demo quincenal. *(SRS conviene en contratos aeronáuticos o estatales cerrados).*
- **PERT (`E = (O + 4M + P) / 6`), COCOMO I/II, Puntos de Función (FP) y UCP:** Fórmulas paramétricas tradicionales basadas en líneas de código o modelos de datos cerrados. **Elegimos Story Points** porque al inicio de una web ágil no sabemos cuántas líneas tendrá ni está cerrado el alcance. *(Sirven para cotizar licitaciones a precio cerrado).*
- **EDT / WBS (*Estructura de Desglose del Trabajo*) fija:** Congela el 100% del alcance al inicio; preferimos un **Product Backlog** vivo priorizado con **MoSCoW** (*Must:* turno; *Should:* recordatorio; *Could:* reseñas; *Won't:* videollamada v1) y **User Story Mapping**.

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **Design Thinking completo (5 etapas), Round-Robin y Reverse Brainstorming:** Aunque empatizamos con *User Personas*, no hicimos talleres largos de prototipado de papel ni múltiples rondas de lluvia de ideas porque el flujo de sacar un turno médico ya es conocido y el tiempo era acotado.

---

## Unidad 3 — ¿Conviene invertir y cómo manejamos a los interesados?

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Las 4 Dimensiones de Viabilidad:**
  - *Qué es:* Chequear si el proyecto cierra de forma **Técnica, Operativa, Legal y Económica**.
  - *En MediTurno:* Verificamos **Técnica** (stack web + API obras sociales), **Operativa** (las recepcionistas tienen PC y capacitación de 1 hora), **Legal** (cumplir Ley de Protección de Datos Personales para datos médicos) y **Económica** (costos vs. ahorro en telefonía y menos ausentismo).
- **Métricas Financieras: Payback, VAN (*Valor Actual Neto*), TIR (*Tasa Interna de Retorno*) y TMAR:**
  - *Qué es:* **Payback** es en cuánto tiempo se recupera la inversión. **VAN** trae los flujos futuros a valor de hoy descontados a la **TMAR** (tasa mínima exigida) y resta la inversión inicial. **TIR** es la tasa que hace `VAN = 0`.
  - *En MediTurno (caso real):* Con inversión inicial `I0 = $20.000`, flujos netos de `$10.000/año` durante 3 años y una **TMAR del 10%**:
    - *Payback:* `$20.000 / $10.000` = **2 años**.
    - *VAN:* `9.090,91 + 8.264,46 + 7.513,15 - 20.000` = **+\$4.868,52** (> 0, genera riqueza hoy).
    - *TIR:* **23,38%** (> 10% de TMAR). **Resultado:** el directorio aprueba la inversión.
- **Matriz Poder/Interés de Stakeholders:**
  - *Qué es:* Ubica a los interesados según cuánto poder tienen y cuánto les importa el proyecto para definir cómo tratarlos.
  - *En MediTurno:*
    - **Gestionar de cerca (Alto Poder + Alto Interés):** *Director Médico* → demo en vivo cada 2 semanas.
    - **Mantener satisfecho (Alto Poder + Bajo Interés):** *Área Legal / AFIP* → informes puntuales de cumplimiento normativo.
    - **Mantener informado (Bajo Poder + Alto Interés):** *Recepcionistas y Pacientes* → guías simples y aviso de cambios.
    - **Monitorear (Bajo Poder + Bajo Interés):** *Proveedores externos no vinculados* → esfuerzo mínimo.
- **Negociación Integrativa y Modelo TKI (*Thomas-Kilmann*):**
  - *Qué es:* Buscar acuerdos **Ganar-Ganar** (integrativa) eligiendo entre 5 estilos (*Colaborar, Competir, Comprometer, Evitar, Acomodar*).
  - *En MediTurno:* Con los médicos usamos **Colaborar** para diseñar juntos los bloques de agenda. Pero cuando piden guardar contraseñas sin cifrar para "entrar más rápido", usamos **Competir** (es una regla legal y de seguridad innegociable).

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **Decidir solo con el ROI (*Return on Investment*) simple (50%):** El ROI simple ignora el valor del dinero en el tiempo y la inflación. **VAN y TIR son mejores** para tomar la decisión financiera real. *(ROI sirve solo como cuenta rápida de servilleta).*
- **Negociación Distributiva (Ganar-Perder):** Imponer pantallas incómodas "ganando" la pulseada haría que médicos y recepcionistas boicoteen el sistema, rompiendo la viabilidad operativa.

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **Caso de Negocio de 17 apartados + Matriz de Ansoff + 4 P del Marketing + Lienzo de Osterwalder:** Al ser un proyecto a medida contratado directamente por 3 clínicas que ya tienen pacientes (y no un producto masivo saliendo a competir a mercado abierto), bastó un *Project Brief* + el análisis financiero (*VAN/TIR*) + el *Project Charter* firmado por el **Sponsor Ejecutivo**.

---

## Unidad 4 — MediTurno en marcha: equipo, métricas, Git y EVM

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Las 5 Etapas de Tuckman + Liderazgo Situacional (Hersey-Blanchard):**
  - *Qué es:* Todo equipo pasa por *Forming → Storming → Norming → Performing → Adjourning*. El líder adapta su estilo (**E1 Dirigir, E2 Persuadir, E3 Participar, E4 Delegar**) según la madurez de cada persona (**M1 a M4**).
  - *En MediTurno:* En la semana 2 el equipo entra en **Storming** (discuten por el ORM y el formato de fechas). Acordamos estándares (**Norming**) y alcanzamos ritmo (**Performing**). Al dev junior inseguro (**M1**) lo guiamos paso a paso (**E1 Dirigir**); a la dev senior (**M4**) le damos el objetivo y la dejamos decidir (**E4 Delegar**).
- **Tablero Kanban con Límites WIP + Ley de Little + CFD (*Cumulative Flow Diagram*):**
  - *Qué es:* Limitar el trabajo en curso (**WIP**) reduce el cambio de contexto. Por la **Ley de Little** (`Cycle Time = WIP / Throughput`), bajar el WIP acelera las entregas. El **CFD** muestra en bandas dónde se acumulan tareas.
  - *En MediTurno:* Ponemos un límite **WIP = 2** por persona en *En Progreso*. En el Sprint 3 vemos en el **CFD** que la banda *En Revisión / QA* se ensancha verticalmente: nadie toma tickets nuevos del Backlog hasta destrabar y cerrar los que esperan QA.
- **Control de Cambios (CCB — *Change Control Board*) contra el Scope Creep:**
  - *Qué es:* El **Scope Creep** es agregar alcance gratis por pasillo. El **CCB** evalúa impacto antes de aprobar cambios.
  - *En MediTurno:* A mitad del Sprint 3, un médico pide *"sumar historia clínica electrónica completa"*. En vez de meterlo a escondidas, el Product Owner frena el **Scope Creep**, protege el Sprint actual y evalúa el impacto para cotizarlo aparte en un futuro Release.
- **GitHub Flow y Commits Atómicos:**
  - *Qué es:* Rama `main` siempre desplegable + ramas cortas por feature con Pull Request y commits pequeños que compilan y pasan tests.
  - *En MediTurno:* Para el filtro de obras sociales abrimos `feature/filtro-os`, subimos 3 commits atómicos y solo se mergea a `main` tras aprobar el Pull Request.
- **Release Burnup Chart + EVM (*Earned Value Management*) macro:**
  - *Qué es:* **Burnup** muestra trabajo hecho vs. alcance total. **EVM** cruza **PV** (planificado), **EV** (valor ganado real) y **AC** (costo real) frente al presupuesto total (**BAC**).
  - *En MediTurno (corte al Mes 4, BAC = \$100.000):* Planeábamos \$40.000 (**PV**), terminamos \$30.000 (**EV**) y gastamos \$35.000 (**AC**). Vemos **CV = -\$5.000** (sobrecosto), **SV = -\$10.000** (atraso), **CPI = 0,86** y **SPI = 0,75**, proyectando **EAC = \$116.667**. Presentamos este semáforo rojo al directorio junto con el **Release Burnup** para ajustar prioridades siguiendo el **Ciclo PDCA** (*Plan–Do–Check–Act*).

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **Git Flow completo (`main`, `develop`, `release/*`, `hotfix/*`):** Demasiados merges burocráticos para una web app SaaS que despliega todas las semanas; **GitHub Flow es mejor** aquí. *(Git Flow sirve cuando mantenés varias versiones viejas instaladas en clientes).*
- **Usar solo Sprint Burndown Chart hacia el directorio:** El Burndown sube si cambia el alcance y confunde a gerencia; el **Release Burnup** muestra claramente cuánto se avanzó y si alguien agrandó el alcance.
- **EVM clásico tarea por tarea:** En Scrum el Backlog cambia cada 2 semanas; usar EVM solo a nivel **macro de presupuesto** (Enfoque Híbrido) da control financiero sin trabar la agilidad.

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **Teoría formal de Daniel Pink y pautas de Minutas:** Aunque cuidamos la autonomía y dejamos acuerdos por escrito en Jira, en un equipo de 4 personas que habla a diario no armamos actas formales de directorio para cada charla diaria.

---

## Unidad 5 — Calidad (ISO 25010), Pruebas y Riesgos en MediTurno

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Shift-Left Testing + QA (*Quality Assurance*) vs. QC (*Quality Control*) + Pirámide FIRST:**
  - *Qué es:* **Shift-Left** es probar desde el principio. **QA** previene errores en el proceso; **QC** los detecta en el producto. La **Pirámide de Pruebas** tiene base grande de *Unit Tests* (**FIRST**: *Fast, Independent, Repeatable, Self-Validating, Timely*), capa media de *Integración* y punta de *E2E* + *UAT*.
  - *En MediTurno:* Para no sufrir un desastre tipo **Knight Capital** (US\$ 440M perdidos por un despliegue manual roto), exigimos **Code Reviews** en cada PR (QA) y corremos **Unit Tests FIRST** + pruebas de **Integración** de la API contra MySQL en Docker + un test **E2E** del flujo completo de sacar turno + **UAT** con recepcionistas en la **Sprint Review** (mostrando solo ítems 100% *Done*).
- **ISO/IEC 25010 como guía (sin burocracia):**
  - *Qué es:* Modelo de calidad de producto en **8 características**.
  - *En MediTurno:* Priorizamos las 4 críticas del dominio médico: **Seguridad** (datos de pacientes cifrados), **Usabilidad** (alto contraste y pocos clics para adultos mayores), **Fiabilidad** (no perder reservas) y **Eficiencia** (búsquedas rápidas).
- **Gestión de Riesgos: Risk Register, Estrategia *Mitigar*, WSJF y Technical Spike:**
  - *Qué es:* Un **Riesgo** es un evento incierto futuro (si ya pasó, es un **Problema/Issue**). **WSJF** (*Weighted Shortest Job First* de Reinertsen) prioriza tareas con `Cost of Delay / Duración`. Un **Spike** es un experimento breve para investigar una duda técnica.
  - *En MediTurno:* Identificamos un riesgo *Known-Unknown* en el **Risk Register**: *"La API de la obra social tarda > 5s o se cae"*. Lo cubrimos con **Reserva de Contingencia** y estrategia **Mitigar**: implementamos caché local de afiliados + reintentos en cola. Además, antes de estimar la pasarela de pagos, hacemos un **Technical Spike** de 1 día para probar el SDK; y priorizamos primero los arreglos cortos que más dinero hacen perder por día usando **WSJF**.
- **RCA (*Root Cause Analysis* — Análisis de Causa Raíz): Los 5 Porqués e Ishikawa:**
  - *Qué es:* Buscar la falla de proceso detrás de un incidente en la Retrospectiva sin culpar personas.
  - *En MediTurno:* Un martes se duplica un turno en producción. Aplicamos los **5 Porqués**: *¿Por qué se duplicó? Porque llegaron dos clics juntos. ¿Por qué pasaron ambos? Porque no había índice único en la tabla ni test de concurrencia.* Sumamos ese test a la *Definition of Done*.

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **Antipatrón Cono de Helado (*Ice-Cream Cone*):** Poner casi toda la carga en pruebas manuales y E2E al final vuelve lentísimo el proyecto y se rompe con cualquier cambio de CSS. **La Pirámide FIRST es mejor.**
- **Estrategia "Evitar" frente al riesgo de obras sociales:** Evitarlo significaría quitar la validación de obras sociales, destruyendo la utilidad de MediTurno. **Mitigar es mejor.**
- **ISO 25010 como auditoría documental rígida:** Ralentizaría a 4 personas. *(Ese nivel de papel es obligatorio en software regulado por ANMAT o aeronáutica).*

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **Método Delphi en 6 fases, Simulación de Monte Carlo y Diagrama de Tornado:** Son técnicas estadísticas potentes para presupuestos millonarios o paneles de expertos con sesgo jerárquico, pero innecesarias para priorizar el Backlog de una clínica.

---

## Unidad 6 — Conocimiento, Madurez y Despliegue Continuo en MediTurno

### 1. Lo que SÍ aplicamos (Caja de herramientas + Escenas reales)

- **Capitalización del Conocimiento (KC) contra el Bus Factor (ADRs + DoD Evolutiva + SECI):**
  - *Qué es:* **KC** convierte el saber tácito (en la cabeza de una persona) en activo reutilizable de la empresa para bajar el **Bus Factor**. **SECI** describe ese ciclo (*Socialización, Externalización, Combinación, Internalización*). Un **ADR (*Architecture Decision Record*)** documenta en Git por qué se tomó una decisión técnica.
  - *En MediTurno:* El dev que integró obras sociales se toma vacaciones. Para no quedar ciegos (**Bus Factor = 1**), hace **Pair Programming** con otro compañero (*Socialización*), deja escrito un **ADR** breve en Git explicando el flujo de reintentos (*Externalización*), actualizamos la guía técnica (*Combinación*) y sumamos la regla aprendida a nuestra **DoD Evolutiva**.
- **Pipeline de CI/CD (*Continuous Integration / Delivery / Deployment*):**
  - *Qué es:* Automatizar compilación, pruebas (Caja Blanca en unitarios, Caja Negra en API/E2E) y empaquetado en cada cambio.
  - *En MediTurno:* Cada Pull Request dispara el pipeline automático; si pasa todo, queda listo para publicar con 1 clic (*Continuous Delivery*).
- **Despliegue Blue-Green / Canary + Feature Flags:**
  - *Qué es:* **Blue-Green** mantiene dos entornos idénticos y cambia el router al instante; **Canary** prueba primero con un porcentaje chico de usuarios; **Feature Flags** prenden o apagan funcionalidades en vivo sin redeploy.
  - *En MediTurno:* Publicamos la versión nueva en un entorno paralelo (**Blue-Green**) o primero solo para 1 de las 3 clínicas (**Canary**), y escondemos el botón de pago online detrás de una **Feature Flag** por si hay que apagarlo en 1 segundo sin bajar el sistema de turnos.

### 2. Lo que NO aplicamos porque elegimos otra cosa
- **Despliegue Big Bang:** Apagar el sistema viejo y subir el nuevo de golpe. **Blue-Green / Canary es mejor** porque un fallo a las 9 AM dejaría a las 3 clínicas sin atender pacientes.
- **Apuntar a CMMI Nivel 5 desde el día 1:** Exige control estadístico masivo en toda la organización. Con **OPAs** (*Activos de Procesos*) ligeros en Git (plantilla de ADR, Risk Register y DoD) alcanzamos un orden sano equivalente a Nivel 2–3 sin burocracia.

### 3. Lo que quedó afuera porque no lo necesitamos acá
- **CC/CD (*Continuous Calibration / Development*) con Evals para IA y Pirámide DIKW formal:** Como la versión inicial de MediTurno es software tradicional determinista (sin chatbots ni agentes de IA), bastan pruebas deterministas Pass/Fail; si en el futuro sumamos un asistente de IA por WhatsApp, recién ahí activaremos **CC/CD con Evals**.

---

## Las 8 Tecnologías Prácticas en MediTurno

### 1. Lo que SÍ aplicamos (y por qué es mejor que la alternativa)
- **Jira:** Tablero alineado al flujo real (*Backlog → To Do → In Progress → Review → QA → Blocked → Done*) con jerarquía *Épica → User Story INVEST → Task* y riesgos vinculados. **Mejor que planillas sueltas** porque da trazabilidad en vivo (U1, U2, U4, U5).
- **Docker y Docker Compose:** Empaqueta Frontend (Nginx), Backend (FastAPI) y MySQL (con volumen persistente, red bridge DNS y healthcheck) en contenedores livianos. **Mejor que instalar dependencias a mano o levantar pesadas Máquinas Virtuales**, garantizando Portabilidad ISO 25010 (U5, U6).
- **OpenCode y SDD (*Spec-Driven Development*):** Escribir una especificación clara (*Contexto, Contrato API, Restricciones, Criterios*) y correr flujo *Plan → Build* con el *Coding Agent*. **Mejor que el *"vibe coding"* improvisado** porque evita código ambiguo (U2, U5).
- **Playwright y QA Adaptativo:** Pruebas E2E reales de punta a punta con *Locators semánticos*, patrón *POM (Page Object Model)* y *Trace Viewer*. **Mejor que Selenium o Cypress** en aplicaciones SPA modernas por velocidad, auto-espera y menor fragilidad (U5, U6).
- **GitHub Actions (CI Quality Gate):** Automatiza *Workflows → Jobs → Runners → Steps* con *Status Checks* y *Branch Protection Rules* en `main`. **Mejor que correr tests a mano antes de mergear** (U4, U5, U6).
- **PaaS (Render / Netlify) + Sentry (CD y Observabilidad):** Despliegue continuo sin administrar servidores **IaaS** a mano, capturando en **Sentry** los **3 Pilares de Observabilidad** (*Logs, Métricas, Trazas*). **Mejor que enterarse de errores por quejas de pacientes** (U5, U6).
- **SonarCloud y GitHub Dependabot (DevSecOps):** **SonarCloud** corre análisis estático (**SAST**) frenando *Code Smells* y deuda técnica; **Dependabot** audita librerías externas (**SCA**) frente a *Supply Chain Attacks*. **Mejor que auditar seguridad recién antes de salir a producción** (U1, U5, U6).

### 2. Lo que quedó afuera porque no lo necesitamos como tablero diario
- **MS Project / ProjectLibre (Gantt y Ruta Crítica CPM):** No lo usamos en el día a día del equipo (para eso está Jira). Solo lo abriríamos si la clínica exigiera en el contrato un cronograma macro predictivo con dependencias (**FS/SS/FF/SF**) y **Ruta Crítica** (tareas con holgura = 0) dentro de un **Enfoque Híbrido** (U1, U2, U4).
