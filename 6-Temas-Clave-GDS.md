# 6 Temas Clave para Rendir GDS (1 por Unidad)

> **Cómo estudiar este documento:** Son únicamente los **6 temas centrales** (uno por unidad). Cada tema está explicado desde cero, sin apuro y sin mezclar otros conceptos, siempre en 3 partes:
> 1. **La idea en criollo** (para entender *por qué existe*).
> 2. **Las piezas clave** (lo que tenés que saber responder si te preguntan).
> 3. **Ejemplo paso a paso** (para contarlo seguro en el examen).

---

## Unidad 1 — Cascada vs. Scrum (y el MVP)

### 1. La idea en criollo
El problema central al arrancar un proyecto de software es **cómo organizamos el trabajo del equipo**:
- Si sabés exactamente todo lo que hay que hacer desde el día 1 y nada va a cambiar, podés ir en línea recta por etapas (**Cascada**).
- Si el cliente va descubriendo lo que necesita en el camino (como pasa casi siempre en software), ir en línea recta es suicida: necesitás trabajar en ciclos cortos, mostrar avances reales y corregir el rumbo rápido (**Scrum + MVP**).

### 2. Las piezas clave
- **Cascada (*Waterfall*):**
  - Avanza en fases secuenciales cerradas: *Requisitos → Diseño → Código → Pruebas → Despliegue*.
  - No pasás a la siguiente fase hasta terminar la anterior.
  - **Ventaja:** da previsibilidad si nada cambia. **Desventaja:** el cliente recién ve el producto al final y cualquier cambio tardío sale carísimo.
- **Scrum (marco ágil):**
  - Trabaja en ciclos cortos de tiempo fijo llamados **Sprints** (de 1 a 4 semanas; típico: 2 semanas).
  - **3 Pilares:** *Transparencia* (todos ven el estado real), *Inspección* (revisar seguido) y *Adaptación* (ajustar rápido).
  - **3 Roles:**
    - *Product Owner (PO):* decide **qué** tiene más valor construir primero.
    - *Scrum Master (SM):* cuida que el proceso funcione y quita bloqueos.
    - *Developers:* deciden **cómo** construirlo técnicamente.
  - **3 Artefactos (y su compromiso):**
    - *Product Backlog* (lista priorizada de todo lo que necesita el producto) → su meta es el *Product Goal*.
    - *Sprint Backlog* (lo elegido para hacer en estas 2 semanas) → su meta es el *Sprint Goal*.
    - *Incremento* (versión nueva y usable del sistema) → su criterio de calidad es la **DoD (*Definition of Done* — Definición de Terminado)**: el checklist que una tarea debe cumplir para darse por hecha (ej.: código revisado, tests pasando).
  - **5 Eventos:**
    1. *Sprint* (el bloque de 2 semanas).
    2. *Sprint Planning* (planificar qué entra y cómo se hace).
    3. *Daily Scrum* (15 minutos diarios para sincronizar y ver trabas).
    4. *Sprint Review* (demo del Incremento al cliente para recibir feedback).
    5. *Sprint Retrospective* (reunión interna para mejorar cómo trabaja el equipo).
- **MVP (*Minimum Viable Product* — Producto Mínimo Viable, metáfora de Kniberg):**
  - En lugar de entregar partes sueltas que no sirven solas (una rueda hoy, un chasis el mes que viene), entregás desde el primer ciclo la versión más chica **que ya funciona y resuelve el problema** (*patineta → monopatín → bici → auto*).

### 3. Ejemplo paso a paso (App de Turnos Médicos)
- Si una clínica te contrata para una app de turnos y usás **Cascada**, pasás 4 meses documentando y programando; cuando se la mostraste al mes 5, los médicos te dicen que las obras sociales cambiaron y el flujo no sirve.
- Con **Scrum + MVP**, en el **Sprint 1** (2 semanas) entregás la "patineta": el paciente ya puede elegir médico, día y confirmar un turno simple. En la **Sprint Review** los médicos la prueban y te piden filtrar por obra social. En el **Sprint 2** lo agregás, y recién en el **Sprint 3** sumás recordatorios por WhatsApp.

---

## Unidad 2 — Requisitos e Historias de Usuario (Boehm + INVEST + Gherkin)

### 1. La idea en criollo
El peor error en software es **programar perfecto algo que el usuario no pidió o entendió mal**.
- Si detectás un error de requisitos cuando recién lo estás charlando, arreglarlo cuesta **1 peso**; si lo descubrís cuando ya está en producción, puede costar **100 pesos** (**Curva de Boehm**).
- Para evitar eso, en Ágil escribimos requisitos cortos desde el punto de vista del usuario (**Historias de Usuario**) con reglas claras de calidad (**INVEST**) y ejemplos exactos para poder probarlos (**Gherkin**).

### 2. Las piezas clave
- **Curva de Costos de Boehm:** Muestra que el costo de corregir un defecto crece exponencialmente según cuándo lo encontrás: `1x` en Requisitos → `10x` en Código → `40x` en Pruebas → `30x–100x` en Producción. *(Caso clásico: sonda espacial Mariner 1, explotó por faltar un guion en la especificación matemática).*
- **Requisitos Funcionales (RF) vs. No Funcionales (RNF):**
  - **RF:** *qué hace* el sistema (ej.: "permitir reservar un turno").
  - **RNF:** *bajo qué condiciones* funciona (ej.: velocidad, seguridad, usabilidad). Nunca deben ser vagos ("que sea fácil"); siempre medibles ("en menos de 3 minutos").
- **Historia de Usuario (*User Story*):**
  - Formato: *"Como [rol], quiero [acción], para [beneficio]"*.
  - Se apoya en las **3 C de Ron Jeffries**:
    - *Card* (tarjeta breve).
    - *Conversation* (charla con el cliente para aclarar dudas).
    - *Confirmation* (criterios de aceptación para comprobar que quedó bien).
- **Acrónimo INVEST (checklist de una buena Historia):**
  - **I**ndependiente (se puede hacer sin depender de otra historia).
  - **N**egociable (no es un contrato rígido; se conversa el detalle).
  - **V**aliosa (aporta valor real al usuario/negocio).
  - **E**stimable (el equipo entiende cuánto trabajo lleva).
  - **S**mall / Pequeña (entra cómodamente en 1 Sprint).
  - **T**esteable (se puede probar con Pass/Fail).
- **Formato Gherkin (criterios de aceptación verificables):**
  - **Dado (*Given*)** un contexto inicial, **Cuando (*When*)** ocurre una acción, **Entonces (*Then*)** pasa este resultado concreto.

### 3. Ejemplo paso a paso
- **Mal requisito:** *"La app debe permitir buscar médicos fácil."* (Es ambiguo y no se puede testear).
- **Historia de Usuario (INVEST):**
  *"Como paciente con obra social, quiero filtrar médicos por mi plan, para ver solo los que me atienden sin pagar particular."*
- **Criterio en Gherkin:**
  - **Dado** que seleccioné el plan `"OSDE 210"`,
  - **Cuando** busco la especialidad `"Cardiología"`,
  - **Entonces** el sistema muestra únicamente cardiólogos adheridos a `"OSDE 210"` en menos de 2 segundos.

---

## Unidad 3 — Evaluación Financiera (VAN, TIR, TMAR y Payback vs. ROI)

### 1. La idea en criollo
Antes de gastar plata en programar un sistema, la empresa pregunta: **"¿Conviene poner esta plata acá, o me conviene dejarla en un plazo fijo / otro proyecto?"**
- No alcanza con sumar cuánto entra y cuánto sale (**ROI simple**), porque **$10.000 cobrados dentro de 3 años valen menos que $10.000 hoy** (por inflación, riesgo y costo de oportunidad).
- Por eso existen el **VAN**, la **TIR** y la **TMAR**: para traer la plata del futuro a valor de hoy y decidir con rigor si el proyecto se acepta o se rechaza.

### 2. Las piezas clave
- **ROI (*Return on Investment* — Retorno de Inversión):**
  - Fórmula: `ROI = (Ganancia Neta / Costo) × 100` (donde `Ganancia Neta = Beneficios - Costos`).
  - **Limitación clave:** NO tiene en cuenta el tiempo ni la inflación.
- **Payback (Período de Recupero):**
  - En cuántos años recuperás la inversión inicial (`Inversión Inicial / Flujo Anual` si es constante).
- **TMAR (*Tasa Mínima Aceptable de Rendimiento*):**
  - Es tu "vara" o tasa mínima de ganancia anual que exigís para invertir (lo que ganarías en una alternativa segura).
- **VAN (*Valor Actual Neto*):**
  - Descuenta cada flujo futuro (`CFt`) a la tasa `r` (= TMAR) para traerlo al día de hoy y le resta la inversión inicial (`I0`):
    `VAN = [CF1 / (1 + r)^1] + [CF2 / (1 + r)^2] + ... - I0`
  - **Criterio:** `VAN > 0` ⇒ **Se acepta** (genera riqueza extra hoy). `VAN < 0` ⇒ **Se rechaza**. `VAN = 0` ⇒ Indiferente.
- **TIR (*Tasa Interna de Retorno*):**
  - Es la tasa porcentual anual propia del proyecto que hace que `VAN = 0`.
  - **Criterio:** `TIR > TMAR` ⇒ **Se acepta** (rinde más que tu vara mínima). `TIR < TMAR` ⇒ **Se rechaza**.

### 3. Ejemplo paso a paso (El caso exacto de clase)
Supongamos una clínica que invierte **`I0 = $20.000`** hoy para hacer la app de turnos, espera ganar **`$10.000/año`** netos durante **3 años** (total `$30.000`), y su **TMAR es del 10% anual** (`0,10`):
1. **ROI simple:** `(30.000 - 20.000) / 20.000 × 100 = 50%`. *(Suena bien, pero todavía no descontamos el tiempo).*
2. **Payback:** `$20.000 / $10.000 = 2 años`.
3. **VAN al 10%:**
   - Año 1 hoy: `10.000 / 1,10 = $9.090,91`
   - Año 2 hoy: `10.000 / 1,21 = $8.264,46`
   - Año 3 hoy: `10.000 / 1,331 = $7.513,15`
   - Suma hoy = `$24.868,52`. Resto la inversión: `24.868,52 - 20.000 =` **`+$4.868,52`** (`> 0`).
4. **TIR:** Calculando la tasa que anula el VAN, da **`23,38%`** (`> 10%` de TMAR).
5. **Decisión final:** **SE ACEPTA**, porque recupera la inversión, rinde por encima del 10% exigido y además deja `$4.868,52` de riqueza neta hoy.

---

## Unidad 4 — Técnica del Valor Ganado (EVM)

### 1. La idea en criollo
Si te dan `$100.000` para un proyecto de 10 meses y al Mes 4 ves que gastaste `$35.000`, **mirar solo la plata gastada te engaña**: capaz gastaste poco porque no avanzaste nada, o gastaste justo lo previsto pero solo hiciste la mitad del trabajo.
**EVM (*Earned Value Management*)** resuelve eso midiendo **todo en plata** al día de hoy con 3 números: lo que *planeabas* hacer (**PV**), lo que *realmente* terminaste (**EV**) y lo que *realmente* pagaste (**AC**).

### 2. Las piezas clave
- **Los 3 datos base + el presupuesto total:**
  - **BAC (*Budget at Completion*):** Presupuesto total original del proyecto.
  - **PV (*Planned Value* — Valor Planificado):** Cuánta obra tendrías que tener lista hoy según el plan (en `$`).
  - **EV (*Earned Value* — Valor Ganado):** Cuánta obra terminaste realmente hoy, valuada al precio del presupuesto original (en `$`).
  - **AC (*Actual Cost* — Costo Real):** Cuánta plata salió realmente de la caja hoy (sueldos, facturas).
- **Varianzas (en pesos; `< 0` es MALO, `> 0` es BUENO):**
  - **CV (Costo):** `CV = EV - AC` *(si da negativo, gastaste de más).*
  - **SV (Cronograma):** `SV = EV - PV` *(si da negativo, estás atrasado).*
- **Índices de desempeño (en ratio; `< 1` es MALO, `> 1` es BUENO):**
  - **CPI (Costo):** `CPI = EV / AC` *(ej. `0,86` = por cada `$1` gastado solo generás `$0,86` de producto).*
  - **SPI (Cronograma):** `SPI = EV / PV` *(ej. `0,75` = avanzás al 75% de la velocidad planeada).*
- **Proyecciones si todo sigue igual:**
  - **EAC (Costo total estimado al final):** `EAC = BAC / CPI`.
  - **ETC (Plata que falta poner desde hoy hasta el final):** `ETC = EAC - AC`.
  - **VAC (Desvío final proyectado):** `VAC = BAC - EAC`.

### 3. Ejemplo paso a paso (El ejercicio clásico de clase)
Proyecto con presupuesto total **`BAC = $100.000`** a 10 meses. Al corte del **Mes 4**:
- Planeabas tener el 40% hecho ⇒ **`PV = $40.000`**.
- En realidad solo terminaste el 30% ⇒ **`EV = $30.000`**.
- Ya pagaste facturas y sueldos por ⇒ **`AC = $35.000`**.

Calculamos:
1. **CV** = `30.000 - 35.000 =` **`-$5.000`** (sobrecosto: gastamos `$5.000` más de lo que produjimos).
2. **SV** = `30.000 - 40.000 =` **`-$10.000`** (atraso: debemos `$10.000` de obra).
3. **CPI** = `30.000 / 35.000 =` **`0,86`** (`< 1`, ineficiente).
4. **SPI** = `30.000 / 40.000 =` **`0,75`** (`< 1`, lento).
5. **Proyección final:** `EAC = 100.000 / 0,8571 =` **`$116.667`** (`$16.667` más caro que el presupuesto original).
6. **Diagnóstico:** Con `CPI < 1` y `SPI < 1`, el proyecto está en el peor cuadrante (**atrasado y con sobrecosto**) y requiere acciones correctivas urgentes.

---

## Unidad 5 — Gestión de Riesgos (Matriz PI, Respuestas, WSJF y RCA)

### 1. La idea en criollo
Un **Riesgo** es algo incierto que **todavía no pasó**, pero si pasa afecta tu proyecto (si ya pasó hoy, deja de ser riesgo y es un **Problema / *Issue***).
En vez de cruzar los dedos o reaccionar apagando incendios, gestionamos riesgos para **identificar qué puede salir mal, medir cuánto duele, tener un plan B antes de que pase y aprender de la causa raíz si ocurre**.

### 2. Las piezas clave
- **Tipos de incertidumbre:**
  - *Known-Unknowns* (sabés que puede pasar, ej. "que caiga una API"): se cubren con **Reserva de Contingencia**.
  - *Unknown-Unknowns* (cisnes negros imprevistos, ej. una pandemia): se cubren con **Reserva de Gestión**.
- **Análisis cualitativo — Matriz PI y Principio ALARP:**
  - Multiplicás **Probabilidad × Impacto** para clasificar en semáforo (Verde / Amarillo / Rojo) y priorizar en el **Risk Register** (tabla con ID, Causa-Evento-Impacto, Dueño, Respuesta y Estado).
  - **ALARP (*As Low As Reasonably Practicable*):** bajar el riesgo hasta donde el costo de mitigarlo siga siendo razonable frente al beneficio.
- **Las 4 Estrategias de Respuesta para Amenazas (riesgos negativos):**
  1. **Evitar:** eliminar la causa (ej. no usar esa tecnología inestable).
  2. **Mitigar:** bajar la probabilidad o el impacto (ej. poner caché y reintentos).
  3. **Transferir:** pasar el impacto a un tercero (ej. seguro o pasarela de pagos certificada).
  4. **Aceptar:** no hacer nada previo si el impacto es mínimo (o guardar reserva).
  *(Para Oportunidades positivas son: **Explotar, Mejorar, Compartir, Aceptar**).*
- **Riesgos en Ágil (WSJF y Technical Spikes):**
  - **WSJF (*Weighted Shortest Job First* de Reinertsen):** `WSJF = Cost of Delay / Duración`. Prioriza hacer primero las tareas cortas que más dinero hacen perder por cada día que se demoran.
  - **Technical Spike:** experimento corto con tiempo fijo (ej. 1 día) para investigar una duda técnica y bajar incertidumbre antes de estimar.
- **RCA (*Root Cause Analysis* — Análisis de Causa Raíz):**
  - Si un fallo ocurre igual, en la Retrospectiva buscamos la falla del sistema (sin culpar personas) con **Los 5 Porqués** (preguntar *¿por qué?* en cadena hasta llegar a la raíz) y el **Diagrama de Ishikawa** (agrupar causas en Proceso, Tecnología, Organización y Personas).

### 3. Ejemplo paso a paso
- **Riesgo en la app de turnos:** *"La API de la obra social tarda mucho o se cae los lunes a la mañana."*
- **Evaluación:** Probabilidad Alta × Impacto Alto = Rojo en la **Matriz PI**; lo anotamos en el **Risk Register**.
- **Estrategia elegida:** No podemos **Evitarlo** (sin obra social la app no sirve), así que elegimos **Mitigar**: guardamos caché temporal de afiliados y ponemos cola de reintentos.
- **Si un día se duplica un turno (RCA — 5 Porqués):**
  1. *¿Por qué se duplicó?* Porque llegaron dos clics juntos.
  2. *¿Por qué pasaron ambos?* Porque la base de datos los dejó grabar.
  3. *¿Por qué los dejó?* Porque faltaba un índice único en la tabla y un test de concurrencia. → Agregamos esa regla a la DoD para que no vuelva a pasar.

---

## Unidad 6 — Capitalización del Conocimiento (Bus Factor, SECI y ADRs)

### 1. La idea en criollo
El peor peligro silencioso de un equipo técnico no es un bug: es el **Bus Factor = 1** (qué pasa si la única persona que entiende cómo funciona el sistema renuncia o se toma licencia).
Por eso diferenciamos **KM** (*Knowledge Management* — estrategia global del saber) de **KC** (*Knowledge Capitalization* — transformar la experiencia personal en un activo reutilizable de la empresa para que nadie sea indispensable).

### 2. Las piezas clave
- **Conocimiento Tácito vs. Explícito:**
  - **Tácito:** está en la cabeza y experiencia de la persona (difícil de explicar).
  - **Implícito:** no está escrito todavía, pero se puede extraer preguntando.
  - **Explícito:** ya está documentado y guardado (código, tests, wikis, diagramas).
- **Bus Factor:** Cantidad mínima de personas clave que tendrían que faltar para que el proyecto quede paralizado. Objetivo: que sea mayor a 1.
- **Espiral SECI (Nonaka y Takeuchi) + Ba:** Explica cómo circula el conocimiento en 4 pasos dentro de un espacio de confianza llamado **Ba** (sala, Meet, Slack):
  1. **Socialización** (*Tácito → Tácito*): aprender codo a codo (ej. *Pair Programming*, mentoría).
  2. **Externalización** (*Tácito → Explícito*): bajar lo sabido a un documento (ej. escribir un **ADR** o un *Post-mortem* sin culpa).
  3. **Combinación** (*Explícito → Explícito*): juntar documentos, guías y métricas en una Wiki o *Tech Radar*.
  4. **Internalización** (*Explícito → Tácito*): leer la guía, practicar con *Code Katas* y volverlo oficio propio.
- **ADR (*Architecture Decision Record*) y DoD Evolutiva:**
  - **ADR:** archivo corto en Git que guarda **qué decisión técnica tomamos, en qué contexto y qué consecuencias tiene** (para que en 6 meses nadie pregunte *"¿por qué eligieron MySQL?"*).
  - **DoD Evolutiva:** ir sumando reglas al checklist de calidad cada vez que aprendemos de un error.
- **Principal barrera cultural:** **Knowledge Hoarding** (acaparar información a propósito por miedo a perder poder o puesto).

### 3. Ejemplo paso a paso
En la app de turnos, solo **un desarrollador** sabe cómo funciona el módulo que valida obras sociales (**Bus Factor = 1**):
1. **Socialización:** Antes de sus vacaciones, hace 2 sesiones de **Pair Programming** con otro compañero mostrando cómo se conecta y qué errores suelen pasar.
2. **Externalización:** Deja escrito un **ADR** breve en el repositorio explicando por qué se eligió ese formato de caché y reintentos.
3. **Combinación:** Se suma esa guía a la Wiki del proyecto junto con las métricas de errores.
4. **Internalización:** El compañero nuevo corre los tests y practica un cambio menor sobre ese módulo.
Resultado: el **Bus Factor** subió de 1 a 2+ y el conocimiento quedó capitalizado en la empresa (**KC**).

