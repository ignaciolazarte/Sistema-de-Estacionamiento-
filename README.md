# Sistema de Estacionamiento

## Integrantes
 Lucia Cordoba
 Ignacio Lazarte

## Descripción del proyecto

El proyecto consiste en el desarrollo de una página web para un **Sistema de Estacionamiento**, destinado a administrar un estacionamiento controlando espacios, ingresos, egresos, vehiculos, abonados, tarifas y recaudacion. El componente diferencial sera la asignacion automatica de espacios y la generacion de alertas y estadisticas.

## Tecnologías utilizadas

HTML: utilizado para crear la estructura y el contenido de la página.
CSS: utilizado para diseñar la interfaz, los colores, tamaños, distribución y estilos.
Flexbox: utilizado para organizar elementos de manera flexible.
CSS Grid: utilizado para distribuir elementos en filas y columnas.
Media Queries:utilizadas para adaptar el diseño a diferentes tamaños de pantalla.

## ¿Dónde utilizamos Flexbox?

Utilizamos Flexbox principalmente para organizar elementos que necesitan distribuirse de manera horizontal o vertical.

Por ejemplo, se utilizó en:
 La barra de navegación.
 La organización de elementos dentro del encabezado.
 La distribución de botones y elementos de algunas secciones.

Flexbox nos permitió distribuir los elementos de forma flexible y mantener una buena alineación.

## ¿Dónde utilizamos Grid?

Utilizamos **CSS Grid** para organizar contenido que necesita una distribución en filas y columnas.

Se utilizó principalmente para:

 Organizar las tarjetas de información.
 Distribuir los espacios del estacionamiento.
 Crear estructuras ordenadas para mostrar diferentes elementos.

Grid permite controlar de manera más sencilla la cantidad de columnas y filas dependiendo del espacio disponible.

## ¿Qué variables CSS creamos?

Creamos variables CSS para reutilizar colores y otros valores del diseño y facilitar futuras modificaciones.

Algunas de las variables utilizadas son:

```css
:root {
    --color-principal: #1f2937;
    --color-secundario: #374151;
    --color-fondo: #f3f4f6;
    --color-blanco: #ffffff;
    --color-borde: #d1d5db;
    --color-texto: #111827;
    --color-acento: #2563eb;
    --color-exito: #16a34a;
}
De esta manera, si queremos cambiar un color del proyecto, podemos modificarlo desde un solo lugar.

 ¿Cómo implementamos el Responsive Design?

Implementamos Responsive Design utilizando Media Queries en CSS.

Esto permite que la página se adapte automáticamente a diferentes tamaños de pantalla, como computadoras, tablets y celulares.

Por ejemplo, en pantallas más pequeñas se modifican:

El tamaño de los textos.
La distribución de los elementos.
 La cantidad de columnas.
 La organización de la navegación.

De esta forma, buscamos que el sistema sea cómodo de utilizar tanto en una computadora como en dispositivos móviles.