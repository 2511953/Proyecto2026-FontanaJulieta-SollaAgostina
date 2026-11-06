# Patitas 🐾

**Pagina web para adoptar y dar en adopcion mascotas - Fontana Julieta y Solla Agostina**

Plataforma web de adopción de mascotas que conecta familias adoptantes con quienes dan animales en adopción.

## Índice

- [Estructura](#estructura)
  - [Para adoptar](#para-adoptar)
  - [Para dar en adopción](#para-dar-en-adopción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Avance del proyecto](#avance-del-proyecto)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)

## Estructura

| Página | Nombre                            | Descripción                                                                                                                     |
| ------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1      | **Index**                         | Se debe iniciar sesión obligatoriamente o crear una cuenta.                                                                     |
| 2      | **Iniciar sesión / Crear cuenta** | Además de los datos necesarios, se agregan etiquetas al perfil de la persona o familia para poder hacer match con las mascotas. |
| 3      | **Inicio**                        | Según el tipo de cuenta, se elige si publicar una mascota o adoptar.                                                            |

### Para adoptar

| Página | Nombre             | Descripción                                                                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 4      | **Explorar**       | Catálogo de mascotas con foto, nombre y un botón "Ver mascota" que lleva a la vista ampliada.                                             |
| 5      | **Vista ampliada** | Imagen grande, nombre, tags de género, raza y edad, una descripción de la mascota, el perfil del adoptante ideal y un botón para adoptar. |
| 6      | **Adoptar**        | Mensaje de confirmación con el nombre y la foto de la mascota adoptada.                                                                   |

### Para dar en adopción

| Página | Nombre               | Descripción                                                                                                                      |
| ------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 7      | **Publicar mascota** | Formulario con todos los datos del animal (obligatorios) y un botón "Publicar ahora". Al publicar, vuelve a la página de inicio. |

## Tecnologías utilizadas

| Tecnología                                | Uso                                                             |
| ----------------------------------------- | --------------------------------------------------------------- |
| HTML5                                     | Estructura de las páginas                                       |
| CSS3                                      | Estilos                                                         |
| JavaScript                                | Lógica de mascotas, usuarios y validación de errores            |
| [Google Fonts](https://fonts.google.com/) | Tipografías (Momo Trust Display y Jua)                          |
| [Coolors](https://coolors.co/)            | Paleta de colores                                               |
| GitHub                                    | Control de versiones                                            |
| GitHub Pages                              | Hosting                                                         |
| Figma                                     | Creacion de prototipo                                           |
| React                                     | Usar componentes reutilizables y renderizar datos dinamicamente |
| SASS                                      | Organizar los estilos                                           |
| Vite                                      | Levantar el React                                               |
| Postman                                   | Probar dependencias de la API                                   |
| Node.js                                   | Instalar dependencias                                           |
| JSON server                               | Mockup de servicios                                             |
| EsLint                                    | Analizar errores                                                |
| React Router DOM                          | Ruteo entre paginas                                             |

## Avance del proyecto

### Primera entrega

- [x] Repositorio de GitHub
- [x] Sketch
- [x] Mockup
- [x] README.md
- [x] HTML
  - [x] Index
  - [x] Crear cuenta
  - [x] Iniciar sesión
  - [x] Inicio
  - [x] Explorar
  - [x] Vista ampliada
  - [x] Adoptar
  - [x] Publicar mascota
- [x] CSS
  - [x] style.css (unificado)
- [x] JavaScript
  - [x] Mascotas
  - [x] Errores
  - [x] Usuarios
  - [x] Explorar
  - [x] Vista ampliada
  - [x] Adoptar

### Segunda entrega

- [x] Proyecto con Vite + React
- [x] Estructura de carpetas (components, pages, styles, api)
- [x] Imports con alias
- [x] Rutas con React Router DOM y Outlet
- [x] Header con cerrar sesión
- [x] Mock de servicios (db.json + JSON Server)
- [x] Estilos en SASS (variables, mixins y anidación)
- [x] Páginas
  - [x] Index
  - [x] Iniciar sesión
  - [x] Crear cuenta
  - [x] Inicio
  - [x] Explorar
  - [x] Vista ampliada
  - [x] Adoptar
  - [x] Publicar mascota
- [x] Componentes reutilizables (Card, Footer)
- [x] Validaciones en tiempo real
- [x] Datos guardados en localStorage
- [x] Publicación en GitHub Pages

## Cómo ejecutar el proyecto

### Requisitos

- [Node.js](https://nodejs.org/) 20.19 o superior
- npm

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/2511953/Proyecto2026-FontanaJulieta-SollaAgostina.git
   ```
2. Entrar a la carpeta de la segunda entrega:
   ```bash
   cd Proyecto2026-FontanaJulieta-SollaAgostina/Segunda-entrega
   ```
3. Instalar las dependencias:
   ```bash
   npm install
   ```
4. Levantar el mock de servicios (en una terminal):
   ```bash
   npm run server
   ```
   La API queda en `http://localhost:3001/mascotas`
5. Levantar la página (en otra terminal):
   ```bash
   npm run dev
   ```
6. Abrir el link que aparece en la terminal.

GITHUB PAGES:
https://2511953.github.io/Proyecto2026-FontanaJulieta-SollaAgostina/
