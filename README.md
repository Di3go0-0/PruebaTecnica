# API de Gestión de Proyectos y Tareas

Esta API proporciona endpoints para la gestión de proyectos, tareas y usuarios, así como funciones de autenticación.

## Inicio de aplicación

### Descarga de recursos
Para descargar los recursos usa el siguiente comando:
```bash
npm install
```

### Puntos de Acceso

#### Desarrollo
Para ejecutar en modo de desarrollo, puedes usar el siguiente comando:
```bash
npm run dev
```
#### Producción 
Para ejecutar en un entorno de producción, puedes usar el siguiente comando:
```bash
npm start
```

## Comandos para Ejecutar los Tests

Para ejecutar los tests (Debian), sigue estos pasos en tu terminal:

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


## Desiciones importante

### Endpoint `Search` Projects/Tasks

El objetivo de este endpoint es permitir la búsqueda de proyectos y tareas en la aplicación. Se implementó en su respectivo controlador `/search`.

#### Parámetros de búsqueda:

Se utiliza una consulta para extraer los datos en el formato `{ type: type }` y `{ content: content }`. 
- `type`: Representa el campo por el cual se quiere buscar (por ejemplo, nombre del proyecto o tarea).
- `content`: Contiene el contenido que se desea buscar.

Por ejemplo, una solicitud sería `search?type=name&content=DD`, donde:
- `type` es "name", lo que significa que estamos buscando en el campo de nombre.
- `content` es "DD", lo que indica que estamos buscando que el nombre contenga "DD". Se realiza ignorando las mayúsculas y minúsculas, buscando cualquier coincidencia parcial con "DD" en el campo.
### Middleware `verifySelf`

El objetivo de este middleware es garantizar que solo los usuarios puedan acceder, actualizar o eliminar sus propios datos. Se verifica que el ID del usuario que realiza la solicitud coincida con el ID del recurso solicitado. Se decidió implementar esto como un middleware en lugar de usar un `if` en cada controlador correspondiente para evitar la redundancia de código.

```javascript
function verifySelf(req, res, next) {
  const { id } = req.params;
  const userId = req.user.id;

  if (Number(id) !== userId) {
    return res.status(403).json({ message: "you don't have permissions" });
  }

  next();
}

export default verifySelf;
```

- **Funcionamiento**:
  - Extrae el ID del recurso solicitado de los parámetros de la solicitud (`req.params`).
  - Obtiene el ID del usuario de la solicitud (`req.user.id`), que generalmente se adjunta después de la autenticación.
  - Compara si el ID del usuario coincide con el ID del recurso solicitado.
  - Si no coinciden, devuelve un código de estado 403 (Forbidden) indicando que el usuario no tiene permisos.
  - Si coinciden, pasa al siguiente middleware o al controlador correspondiente.

### Pruebas unitarias y de integración
- Se decidió realizar las pruebas unitarias de modo que interactuaran con la base de datos para garantizar la integridad y el comportamiento correcto del sistema en un entorno controlado.


## Variables de entorno
- Se deja un `.env.example` para que se pueda analizar la estructura de las variabels de entorno

## Usuarios
- En el campo `rol` hay dos opciones `admin` o `user`, para registrar a un usuario es opcional el campo `rol` ya que por defecto todos los usuarios se registral como `user`, pero si se coloca `rol` se puede registrar como `admin o user`.

    Se hizo de esta forma para poder registrar administradores, ya que en la prueba no se especificaba.

- Tambien al momento de editar usuarios se permite que puedan agregar el campo `rol`, ya que de esta forma podriamos cambiar el rol del usuario, cambe aclarar que se hizo de esta forma ya que en la prueba no se especificó.

    Para aumentar su seguridad deberiamos quitar la opción de actualizar `rol` desde `PUT /users/:id`, y agregar un endpoint para cambiar el rol de un usuario que reciba la id el usuario y el rol, pero a este endpoint solo tendrían acceso los administradores

## Estados de Proyectos y tareas
- Para en manejo de estados de proyectos y tareas se actualiza a través de put /projects/:id o Put /tasks/:id, ya que en la prueba no se especificaba de como se debería hacer. Para optimizar esta parte podríamos crear un endpoint que reciba la id de tarea (y otro endpoint para los proyectos) y enviarle el estado al cual queremos que vaya. 