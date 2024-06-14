# API de Gestión de Proyectos y Tareas

Esta API proporciona endpoints para la gestión de proyectos, tareas y usuarios, así como funciones de autenticación.

## Características Principales:

- **Autenticación:** Permite el registro, inicio de sesión y cierre de sesión de usuarios.
- **Gestión de Proyectos:** Permite crear, actualizar, eliminar y obtener información sobre proyectos.
- **Gestión de Tareas:** Permite crear, actualizar, eliminar y obtener información sobre tareas relacionadas con proyectos.
- **Gestión de Usuarios:** Permite obtener, actualizar y eliminar información de usuarios.

## Funcionalidades Destacadas:

- **Registro e Inicio de Sesión:** Los usuarios pueden registrarse e iniciar sesión para acceder a la funcionalidad completa de la aplicación.
- **Creación y Edición de Proyectos:** Los usuarios pueden crear nuevos proyectos, editar la información de proyectos existentes y eliminar proyectos.
- **Asignación de Tareas:** Permite asignar tareas a proyectos específicos y gestionar su estado.
- **Búsqueda de Proyectos y Tareas:** Proporciona endpoints para buscar proyectos y tareas por nombre, descripción u otros criterios.
- **Gestión de Usuarios:** Los administradores pueden ver, actualizar y eliminar información de usuarios, mientras que los usuarios regulares pueden ver su propia información.

Esta API facilita la organización y seguimiento de proyectos y tareas, permitiendo a los usuarios administrar eficazmente sus proyectos y colaborar en equipos.

## Documentación de la API

## Auth

### Iniciar Sesión

- Método: `POST`
- Ruta: `/login`
- Descripción: Inicia sesión con credenciales de usuario.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Inicio de sesión exitoso.
- Respuesta de Error:
  - Código: 400 si la contraseña es incorrecta.

### Registrar Usuario

- Método: `POST`
- Ruta: `/register`
- Descripción: Registra un nuevo usuario.
- Parámetros de Entrada:
  - `name`: Nombre del usuario.
  - `email`: Correo electrónico del usuario.
  - `password`: Contraseña del usuario.
  - `rol`: Rol del usuario (opcional).
- Respuesta Exitosa:
  - Código: 201
  - Descripción: Usuario creado exitosamente.
- Respuesta de Error:
  - Código: 400 si el correo electrónico ya está registrado.

### Cerrar Sesión

- Método: `POST`
- Ruta: `/logout`
- Descripción: Cierra la sesión del usuario.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Sesión cerrada exitosamente.

## Projects

### Crear Proyecto

- Método: `POST`
- Ruta: `/projects`
- Descripción: Crea un nuevo proyecto.
- Parámetros de Entrada:
  - `name`: Nombre del proyecto.
  - `description`: Descripción del proyecto.
  - `startDate`: Fecha de inicio del proyecto.
  - `finalDate`: Fecha de finalización del proyecto.
  - `state`: Estado del proyecto (opcional).
- Respuesta Exitosa:
  - Código: 201
  - Descripción: Proyecto creado exitosamente.
- Respuesta de Error:
  - Código: 400 si hay un error al crear el proyecto.

### Obtener Proyectos

- Método: `GET`
- Ruta: `/projects`
- Descripción: Obtiene todos los proyectos.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Proyectos obtenidos exitosamente.

### Buscar Proyectos

- Método: `GET`
- Ruta: `/projects/search`
- Descripción: Busca proyectos por nombre o descripción.
- Parámetros de Consulta:
  - `type`: Campo por el que se va a buscar.
  - `content`: Valor a buscar en el campo especificado.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Proyectos encontrados exitosamente.

### Obtener Proyecto por ID

- Método: `GET`
- Ruta: `/projects/{id}`
- Descripción: Obtiene un proyecto por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Proyecto obtenido exitosamente.

### Actualizar Proyecto por ID

- Método: `PUT`
- Ruta: `/projects/{id}`
- Descripción: Actualiza un proyecto existente por su ID.
- Parámetros de Entrada: Campos a actualizar.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Proyecto actualizado exitosamente.

### Eliminar Proyecto por ID

- Método: `DELETE`
- Ruta: `/projects/{id}`
- Descripción: Elimina un proyecto por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Proyecto eliminado exitosamente.

## Tasks

### Crear Tarea

- Método: `POST`
- Ruta: `/tasks`
- Descripción: Crea una nueva tarea.
- Parámetros de Entrada:
  - `name`: Nombre de la tarea.
  - `description`: Descripción de la tarea.
  - `state`: Estado de la tarea (opcional).
- Respuesta Exitosa:
  - Código: 201
  - Descripción: Tarea creada exitosamente.
- Respuesta de Error:
  - Código: 400 si hay un error al crear la tarea.

### Obtener Tareas

- Método: `GET`
- Ruta: `/tasks`
- Descripción: Obtiene todas las tareas.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Tareas obtenidas exitosamente.

### Buscar Tareas

- Método: `GET`
- Ruta: `/tasks/search`
- Descripción: Busca tareas por nombre o descripción.
- Parámetros de Consulta:
  - `type`: Campo por el que se va a buscar.
  - `content`: Valor a buscar en el campo especificado.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Tareas encontradas exitosamente.

### Obtener Tarea por ID

- Método: `GET`
- Ruta: `/tasks/{id}`
- Descripción: Obtiene una tarea por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Tarea obtenida exitosamente.

### Actualizar Tarea por ID

- Método: `PUT`
- Ruta: `/tasks/{id}`
- Descripción: Actualiza una tarea existente por su ID.
- Parámetros de Entrada: Campos a actualizar.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Tarea actualizada exitosamente.

### Eliminar Tarea por ID

- Método: `DELETE`
- Ruta: `/tasks/{id}`
- Descripción: Elimina una tarea por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Tarea eliminada exitosamente.

## Users

### Obtener Usuarios

- Método: `GET`
- Ruta: `/users`
- Descripción: Obtiene todos los usuarios.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Usuarios obtenidos exitosamente.

### Obtener Usuario por ID

- Método: `GET`
- Ruta: `/users/{id}`
- Descripción: Obtiene un usuario por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Usuario obtenido exitosamente.

### Actualizar Usuario por ID

- Método: `PUT`
- Ruta: `/users/{id}`
- Descripción: Actualiza un usuario existente por su ID.
- Parámetros de Entrada: Campos a actualizar.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Usuario actualizado exitosamente.

### Eliminar Usuario por ID

- Método: `DELETE`
- Ruta: `/users/{id}`
- Descripción: Elimina un usuario por su ID.
- Respuesta Exitosa:
  - Código: 200
  - Descripción: Usuario eliminado exitosamente.



## Descripción de los Tests

Aquí se encuentran los tests para diferentes rutas de la API, organizados por módulos como autenticación, proyectos, tareas y usuarios. Cada test verifica el comportamiento esperado de las diferentes operaciones de la API, como registro de usuarios, inicio de sesión, creación de proyectos, tareas, etc. Los tests se dividen en diferentes casos de uso para cubrir una variedad de situaciones.
- Cabe resaltar que los test se crearon usando la base de datos y pasando datos reales.

#### Autenticación (`auth.routes.js`)

- **Registro de Usuarios:**
  - Verifica que se pueda registrar un usuario con éxito.
  - Verifica que se pueda registrar un administrador con éxito.
  - Verifica la validación del esquema de registro para evitar registros con datos incorrectos.
- **Inicio de Sesión:**
  - Verifica que se pueda iniciar sesión con éxito.
- **Cierre de Sesión:**
  - Verifica que se pueda cerrar sesión con éxito.

#### Proyectos (`projects.routes.js`)

- **Creación de Proyecto:**
  - Verifica que se pueda crear un proyecto con éxito.
  - Verifica la validación de fechas y campos requeridos al crear un proyecto.
- **Obtención de Proyectos:**
  - Verifica que se puedan obtener todos los proyectos del usuario autenticado.
  - Verifica que se pueda obtener un proyecto por su ID.
  - Verifica que se puedan buscar proyectos por contenido.
- **Actualización de Proyecto:**
  - Verifica que se pueda actualizar un proyecto con éxito.
  - Verifica la validación del esquema al actualizar un proyecto.
- **Eliminación de Proyecto:**
  - Verifica que se pueda eliminar un proyecto con éxito.
  - Verifica que no se pueda eliminar un proyecto si tiene tareas asociadas.

#### Tareas (`task.routes.js`)

- **Obtención de Tareas:**
  - Verifica que se puedan obtener todas las tareas del usuario autenticado.
  - Verifica que se pueda obtener una tarea por su ID.
  - Verifica que se puedan buscar tareas por nombre.
- **Creación de Tarea:**
  - Verifica que se pueda crear una nueva tarea con éxito.
  - Verifica que no se pueda crear una tarea si el proyecto asociado no existe.
  - Verifica los permisos al crear una tarea.
- **Actualización de Tarea:**
  - Verifica que se pueda actualizar una tarea con éxito.
  - Verifica los permisos al actualizar una tarea.
- **Eliminación de Tarea:**
  - Verifica que se pueda eliminar una tarea con éxito.
  - Verifica los permisos al eliminar una tarea.

#### Usuarios (`users.routes.js`)

- **Obtención de Usuarios:**
  - Verifica que se pueda obtener la lista de usuarios (solo para administradores).
  - Verifica que un usuario normal no pueda acceder a la lista de usuarios.
  - Verifica que se pueda obtener información de un usuario por su ID.
- **Actualización de Usuario:**
  - Verifica que se pueda actualizar la información de un usuario con éxito.
- **Eliminación de Usuario:**
  - Verifica que se pueda eliminar un usuario con éxito.
  - Verifica que no se pueda eliminar un usuario si está autenticado.
- **Validación de Esquema al Actualizar Usuario:**
  - Verifica la validación del esquema al actualizar un usuario.

### Comandos para Ejecutar los Tests

Para ejecutar los tests, sigue estos pasos en tu terminal:

```bash
set -x NODE_OPTIONS --experimental-vm-modules
```
```bash
npx jest
```

Esto establecerá las opciones de nodo necesarias y ejecutará los tests usando Jest. Asegúrate de tener Jest instalado en tu proyecto y configurado correctamente.

## Versión de node

- v18.19.1

## Dependencias

### Dependencias de Producción
- bcryptjs: ^2.4.3
- cookie-parser: ^1.4.6
- cross-env: ^7.0.3
- dotenv: ^16.4.5
- express: ^4.19.2
- joi: ^17.13.1
- jsonwebtoken: ^9.0.2
- morgan: ^1.10.0
- mysql2: ^3.10.0
- sequelize: ^6.37.3
- swagger-jsdoc: ^6.2.8
- swagger-ui-express: ^5.0.1

### Dependencias de Desarrollo
- @faker-js/faker: ^8.4.1
- jest: ^29.7.0
- nodemon: ^3.1.3
- supertest: ^7.0.0

## Puntos de Acceso

### Desarrollo
Para ejecutar en modo de desarrollo, puedes usar el siguiente comando:
```bash
npm run dev
```
### Producción 
Para ejecutar en un entorno de producción, puedes usar el siguiente comando:
```bash
npm start
```

