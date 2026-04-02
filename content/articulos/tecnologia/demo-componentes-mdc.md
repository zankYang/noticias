---
title: "Showcase: Todos los componentes MDC disponibles"
autor: Redacción
categoria: Tecnología
description: Artículo de demostración que muestra todos los componentes MDC personalizados disponibles para enriquecer las noticias.
fecha: 2026-03-31
imagen: imagen-pruebas
imagenGravedad: auto
destacada: false
enPortada: false
---

::resumen
- Este artículo muestra **todos los componentes MDC** disponibles
- Cada sección demuestra un componente diferente
- Usa este artículo como referencia para escribir notas enriquecidas
::

::entradilla{tamano="grande"}
Este es un artículo especial de demostración. Aquí encontrarás ejemplos funcionales de cada uno de los componentes personalizados que puedes usar dentro de tus notas periodísticas para hacerlas más ricas, visuales e interactivas.
::

## Componentes editoriales

### Alertas

::alerta{tipo="info" titulo="Nota informativa"}
Las alertas permiten destacar información importante dentro del flujo del artículo. Hay cuatro tipos disponibles.
::

::alerta{tipo="urgente" titulo="Última hora"}
Este es un ejemplo de alerta urgente para noticias de último momento.
::

::alerta{tipo="advertencia" titulo="Atención"}
Las alertas de advertencia sirven para señalar datos que requieren precaución.
::

::alerta{tipo="exito" titulo="Confirmado"}
Alerta de éxito para confirmar hechos verificados.
::

---

### Cita destacada

::cita-destacada{autor="Gabriel García Márquez" cargo="Escritor colombiano"}
La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.
::

---

### Caja informativa

::caja-informativa{titulo="¿Qué son los componentes MDC?" icono="💡"}
Los componentes MDC (Markdown Components) son bloques de Vue.js que se pueden invocar directamente desde archivos Markdown usando una sintaxis especial con `::`. Esto permite a los editores crear contenido visualmente rico sin necesidad de escribir HTML o código.
::

---

### Datos clave

::datos-clave{titulo="En números"}
- 41 componentes personalizados creados
- 13 componentes Prose para tipografía
- 10 componentes editoriales
- 7 componentes multimedia
- 5 componentes interactivos
- 6 componentes de datos
::

---

### Nota relacionada

::nota-relacionada{url="/articulos/tecnologia/ia-regulacion-europa" titulo="Prohibir la IA, el debate que ya empezó en Europa" descripcion="Parlamentos discuten límites al despliegue de modelos en sectores sensibles."}
::

---

### Corrección

::correccion{fecha="2026-03-31" tipo="actualizacion"}
Se agregaron dos componentes adicionales a la lista original: **ContadorItems** e **Indicador**.
::

::correccion{fecha="2026-03-30" tipo="correccion"}
En la versión anterior se indicaba erróneamente que eran 35 componentes. La cifra correcta es 41.
::

---

### Contexto

::contexto{titulo="Antecedentes del sistema editorial"}
El proyecto Tulcingo Conecta nació como un portal de noticias local. Desde su inicio utilizó Nuxt Content para la gestión de artículos, pero el contenido se limitaba a Markdown básico con negritas y párrafos simples. La incorporación de componentes MDC representa un salto cualitativo en las posibilidades editoriales.
::

---

### Separadores editoriales

::separador-editorial{estilo="ornamento"}
::

Separador con puntos:

::separador-editorial{estilo="puntos"}
::

Separador con línea:

::separador-editorial{estilo="linea"}
::

---

## Componentes multimedia

### Video embed

::video-embed{url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" titulo="Ejemplo de video embebido"}
::

---

### Galería de imágenes

::galeria{columnas=2}
![Vista panorámica de la ciudad](https://picsum.photos/seed/a/600/400)
![Detalle arquitectónico](https://picsum.photos/seed/b/600/400)
![Escena callejera](https://picsum.photos/seed/c/600/400)
![Paisaje natural](https://picsum.photos/seed/d/600/400)
::

---

### Figura con pie y crédito

::figura-con-pie{src="imagen-pruebas" alt="Vista aérea de la zona metropolitana" pie="La expansión urbana continúa hacia el oriente del valle" credito="Foto: Archivo"}
::

---

### Reproductor de audio

::audio-player{src="/audio/ejemplo.mp3" titulo="Entrevista con el especialista en urbanismo" duracion="8:45"}
::

---

### Imagen comparativa (antes/después)

::imagen-comparativa{antes="imagen-pruebas" despues="imagen-pruebas" altAntes="Estado original" altDespues="Estado renovado"}
::

---

## Componentes interactivos

### Acordeón

::acordeon
  :::acordeon-item{titulo="¿Cómo se usa el componente Alerta?"}
  Se escribe `::alerta{tipo=\"info\" titulo=\"Mi título\"}` seguido del contenido y se cierra con `::`. Los tipos disponibles son: `info`, `advertencia`, `urgente` y `exito`.
  :::

  :::acordeon-item{titulo="¿Puedo anidar componentes MDC?"}
  Sí, algunos componentes como Acordeón, Pestañas y Cronología están diseñados para contener sub-componentes. Se usa la sintaxis con tres dos-puntos (`:::`) para los hijos.
  :::

  :::acordeon-item{titulo="¿Funcionan en Nuxt Studio?"}
  Los componentes son estándar de Nuxt Content MDC, por lo que son compatibles con el editor visual de Nuxt Studio.
  :::
::

---

### Pestañas

::pestanas
  :::pestana-item{titulo="Resumen"}
  Los componentes MDC permiten a los editores crear artículos enriquecidos sin tocar código. Cada componente tiene props configurables y un estilo visual coherente con la identidad del sitio.
  :::

  :::pestana-item{titulo="Instalación"}
  Todos los componentes ya están instalados. Solo necesitas usar la sintaxis MDC en tus archivos `.md` dentro de la carpeta `content/articulos/`.
  :::

  :::pestana-item{titulo="Personalización"}
  Cada componente usa las variables CSS globales del tema (colores, tipografía, espaciado). Modificar `:root` en `news.css` actualiza todos los componentes automáticamente.
  :::
::

---

### Cronología

::cronologia
  :::cronologia-item{fecha="Enero 2024" titulo="Inicio del proyecto"}
  Se crea el repositorio de Tulcingo Conecta con Nuxt 4 y Nuxt Content.
  :::

  :::cronologia-item{fecha="Marzo 2025" titulo="Sistema de portada configurable"}
  Se implementa el hero con 10 variantes visuales y el panel de control YAML.
  :::

  :::cronologia-item{fecha="Marzo 2026" titulo="Componentes MDC editoriales"}
  Se crean 41 componentes personalizados para enriquecer el contenido de los artículos.
  :::
::

---

### Preguntas y Respuestas

::preguntas-respuestas
  :::pregunta
  ¿Cuántos componentes MDC hay disponibles?
  :::

  :::respuesta
  Actualmente hay **41 componentes** organizados en 5 categorías: Prose (tipografía), editoriales, multimedia, interactivos e informativos.
  :::

  :::pregunta
  ¿Necesito saber Vue.js para usarlos?
  :::

  :::respuesta
  No. Los componentes se usan directamente desde Markdown con la sintaxis MDC de Nuxt Content. Solo necesitas conocer los nombres y las props de cada componente.
  :::
::

---

## Componentes de datos

### Estadísticas

:estadistica{valor="41" etiqueta="Componentes creados" tendencia="sube"}

:estadistica{valor="6" etiqueta="Categorías" tendencia="neutral"}

:estadistica{valor="100" sufijo="%" etiqueta="Personalizables" tendencia="sube"}

---

### Indicadores

:indicador{nombre="USD/MXN" valor="17.25" cambio="-0.15" tendencia="baja"}

:indicador{nombre="BMV IPC" valor="58,420" cambio="+320" tendencia="sube"}

:indicador{nombre="Petróleo" valor="78.50" cambio="0.00" tendencia="neutral"}

---

### Perfil de persona

::perfil-persona{nombre="María López Hernández" cargo="Directora editorial" organizacion="Tulcingo Conecta" imagen="prueba-1"}
Periodista con más de 15 años de experiencia en medios digitales y tradicionales. Especializada en cobertura legislativa y política local.
::

---

### Tabla comparativa

::tabla-comparativa{titulo="Markdown básico vs MDC"}
| Característica | Markdown básico | Con MDC |
|---|---|---|
| Alertas y callouts | No | Sí |
| Galerías de imágenes | No | Sí |
| Video embebido | No | Sí |
| Cronologías | No | Sí |
| Estadísticas visuales | No | Sí |
| Acordeones | No | Sí |
| Personalización visual | Limitada | Total |
::

---

### Caja de autor

::caja-autor{nombre="Equipo de Desarrollo" imagen="prueba-1" twitter="@tulcingoconecta"}
Este artículo fue creado por el equipo de desarrollo como referencia para editores y colaboradores del portal.
::

---

### Lista con contador

::contador-items{titulo="5 razones para usar componentes MDC"}
  :::contador-item
  **Mayor impacto visual**: Los artículos con elementos ricos capturan más atención del lector.
  :::

  :::contador-item
  **Sin código**: Los editores no necesitan saber HTML ni Vue para crear contenido enriquecido.
  :::

  :::contador-item
  **Consistencia visual**: Todos los componentes siguen la paleta y tipografía del sitio.
  :::

  :::contador-item
  **Responsive**: Cada componente se adapta automáticamente a móviles y escritorio.
  :::

  :::contador-item
  **Extensible**: Se pueden crear nuevos componentes fácilmente agregando archivos `.vue` en la carpeta `components/content/`.
  :::
::

---

## Componentes originales con personalización total

Estos bloques permiten controlar **tipografía, colores, posición y estilo** desde las props en Markdown (y desde el editor visual de [Nuxt Studio](https://nuxt.studio/content)).

### Bloque libre

::bloque-libre{fondo="#001529" color="#fff" fuente="serif" tamano="1.15rem" alineacion="centro" padding="2rem" radio="12px" sombra="grande"}
Contenedor totalmente personalizable: fondo, fuente, tamaño, alineación, padding, radio y sombra.
::

### Texto estilizado (inline)

Puedes marcar :texto-estilizado{color="#f58220" peso="900" tamano="1.15em" resaltado=true}[fragmentos con resaltado tipo marcador] en medio de un párrafo.

### Sección a ancho completo (full-bleed)

::seccion-color{gradiente="linear-gradient(135deg, #001529 0%, #f58220 100%)" color="#fff" padding="2.5rem 1.5rem" alineacion="centro"}
## Título sobre gradiente
Bloque que rompe el ancho de la columna del artículo para un impacto visual mayor.
::

### Columnas

::columnas{cantidad=2 gap="1.5rem"}
  :::columna{fondo="#f6f8fa" padding="1rem" radio="8px" alineacion="izquierda"}
  **Columna A** — Texto o listas en la primera columna.
  :::
  :::columna{padding="1rem" alineacion="izquierda"}
  **Columna B** — Más contexto o datos en la segunda.
  :::
::

### Texto grande y subtitular decorado

::texto-grande{tamano="enorme" fuente="serif" gradienteTexto="linear-gradient(90deg, #f58220, #001529)" alineacion="centro" peso="900"}
La cifra que marca la diferencia
::

::subtitular{estilo="banner" fondo="#001529" color="#fff" alineacion="centro"}
Sección especial: análisis de fondo
::

### Letra capital y etiquetas inline

::letra-capital{estilo="enmarcada" color="#f58220" fondo="rgba(245,130,32,0.08)"}
Este párrafo abre con una letra capital decorada. El resto del texto sigue el flujo normal del artículo y puedes combinarlo con negritas o enlaces.
::

Este tema es :etiqueta-inline{fondo="#f58220" color="#fff"}[EXCLUSIVA] y :etiqueta-inline{fondo="#001529" color="#fff" radio="0"}[última hora].

### Banner hero con imagen

::banner-hero{imagen="imagen-pruebas" alto="320px" oscurecimiento=55 posicionTexto="abajo-izquierda" color="#fff" tamano="1rem"}
## Titular sobre imagen
Subtítulo breve con overlay y texto posicionable.
::

### Tarjeta flotante

::tarjeta-flotante{posicion="derecha" ancho="260px" fondo="#fffbeb" sombra="grande" rotacion="-1deg"}
**Dato:** México cuenta con 32 entidades federativas; cada una tiene marco jurídico propio.
::

Tras la tarjeta, el texto del artículo continúa fluyendo alrededor en escritorio; en móvil la tarjeta pasa a ancho completo.

### Glassmorphism y marquesina

::glassmorphism{desenfoque=14 fondo="rgba(255,255,255,0.2)" color="#001529" radio="14px"}
Bloque con efecto cristal (ideal sobre fondos con color o imagen detrás del artículo).
::

::marquesina{fondo="#001529" color="#f58220" velocidad="normal" fuente="sans"}
ÚLTIMA HORA: Ejemplo de ticker | Dólar de referencia | Clima en la región | Más noticias en Tulcingo Conecta
::

### Spoiler y tooltip

::spoiler{etiqueta="Revelar resultado" efecto="blur"}
El veredicto fue **unánime** y se dará a conocer en conferencia de prensa.
::

El :tooltip{texto="Producto Interno Bruto: valor de bienes y servicios finales producidos en un territorio." posicion="arriba"}[PIB] es uno de los indicadores más citados.

### Mosaico (layout tipo revista)

::mosaico{plantilla="editorial" gap="0.75rem"}
  :::mosaico-item{area="principal" fondo="#f6f8fa"}
  **Principal** — Área amplia para el mensaje central.
  :::
  :::mosaico-item{area="lateral"}
  **Lateral** — Notas cortas o datos.
  :::
  :::mosaico-item{area="pie" fondo="#001529" color="#fff"}
  **Pie** — Franja a ancho completo dentro del mosaico.
  :::
::

### Divisor con texto, botón y barra de progreso

::divisor{texto="Capítulo siguiente" color="#f58220" estilo="degradado" fuente="serif" tamano="0.8rem"}
::

::boton{url="/articulos/nacional/plan-b-senado" texto="Ver nota relacionada" fondo="#f58220" color="#fff" tamano="mediano" variante="solido" radio="50px" icono="→"}
::

::progreso{valor=68 etiqueta="Avance reportado (ejemplo): 68%" color="#f58220" animado=true}
::
