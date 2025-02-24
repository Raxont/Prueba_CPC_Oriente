# Prueba Tecnica CPC_Oriente

En esta prueba esta solicitando realizar un inventario para productos de un almacén el cual permite crear, editar, eliminar y actualizar los elementos del inventario.

Usar la version **23.0.0** de Node.js:

```
nvm install 23.0.0
nvm use 23.0.0
```

## Arquitectura de carpetas usada

MVC ( Modelo Vista Controlador)

## Tecnologías usadas

**Frontend:** Astro, React, Tailwind

**Server:** Node.js, Express.js, TypeScript

**Servidor:** AWS EC2 o Local (Debe tener configurado un usuario con permisos en mongoDB para poder usarlo)

**Base de datos:** MongoDB

## Instalación

Clona mi repositorio, instala mi proyecto con npm

```
git clone https://github.com/Raxont/Prueba_CPC_Oriente
npm i
```

## Ejecución

Para ejecutar el backend:

```
npm run start
```

Para ejecutar el frontend:

```
npm run dev
```

## Variables de entorno

Crea un archivo .env en el archivo principal del proyecto y usa las variables de entorno de .envTemplate

```
VITE_HOST
VITE_PORT_BACKEND
VITE_PORT_FRONTEND

VITE_HTTP_BACKEND
VITE_HTTP_FRONTEND

VITE_MONGO_ACCESS
VITE_MONGO_USER
VITE_MONGO_PWD
VITE_MONGO_HOST
VITE_MONGO_PORT
VITE_MONGO_DB_NAME
```

## Estructura de carpetas

```
│   .env                                     || Variables de entorno.
│   .envTemplate                             || Plantilla para configurar .env.
│   .gitignore                               || Archivos/carpetas ignorados por Git.
│   astro.config.mjs                         || Configuración de Astro.
│   package.json                             || Dependencias y scripts del proyecto.
│   README.MD                                || Documentación del proyecto.
│   tailwind.config.js                       || Configuración de Tailwind CSS.
│   tsconfig.json                            || Configuración de TypeScript.
├───api                                      || Código del backend (Node.js, Express, MongoDB).
│   │   app.ts                               || Configuración principal del backend.
│   ├───controllers                          || Lógica de los endpoints.
│   │       productsController.ts            || Controlador de productos. 
│   ├───infrastructure                       || Configuración de la base de datos, servidor y middlewares.
│   │   ├───database                         || Configuración de MongoDB.
│   │   │       mongodb.ts                   || Conexión a MongoDB.
│   │   ├───middlewares                      || Middlewares globales.
│   │   │   │   errorHandling.cjs            || Manejo de errores.
│   │   │   │   rateLimit.cjs                || Límite de solicitudes.
│   │   │   └───server                       || Configuración del servidor Express.
│   │   │           corsConfig.cjs           || Configuración de CORS.
│   │   └───server
│   │           server.ts                    || Servidor principal.
│   ├───models                               || Modelos de datos (MongoDB).
│   │       productsModels.ts                || Modelo de productos.
│   ├───routes                               || Definición de rutas.
│   │       productsRoutes.ts                || Rutas de productos.
│   └───services                             || Lógica de negocio.
│           productServices.ts               || Servicios de productos.
├───public                                   || Archivos estáticos.
└───src                                      || Código del frontend (Astro, React, Tailwind).
    ├───assets                               || Recursos (imágenes, íconos, etc.).
    ├───components                           || Componentes reutilizables.
    │       Inventory.tsx                    || Vista de inventario.
    │       ProductForm.tsx                  || Formulario de productos.
    │       ProductTable.tsx                 || Tabla de productos.
    ├───layouts                              || Plantillas de diseño.
    │       MainLayout.astro                 || Layout principal.
    ├───pages                                || Páginas del frontend.
    │       index.astro                      || Página principal.
    │       inventory.astro                  || Página de inventario.
    ├───styles
    │       global.css                       || Estilos globales.
    └───utils                                || Funciones auxiliares.
            api.ts                           || Funciones para llamadas a la API.
            types.ts                         || Definiciones de tipos TypeScript.
```

## Endpoints

Si desea probar los endpoints con una api rest client de su preferencia con la URL que tiene corriendo, ejemplo:

```web-idl
http://localhost:3000/api/products
```

### **1) Obtener todos los productos**

- **URL:** `products/`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los productos.
- Solicitud:
  - Sin parámetros
- Respuestas:
  - `200 OK`: Devuelve la lista de productos.
  - `400 Bad Request`: Errores de validación o petición malformada.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.

### **2) Actualizar un producto**

- **URL:** `products/:id`

- **Método:** `PUT`

- **Descripción:** Actualizar un producto por ID

- Solicitud:

  - Parámetros:

    - `id`: _id del producto a actualizar.

  - Cuerpo de la solicitud:

    - Ejemplo:

      ```
      {
        "name": "Celular",
        "price": 2000,
        "quantity": 1,
        "description": "Apple"
      }
      ```

- Respuestas:

  - `200 OK`: Devuelve el producto actualizado.
  - `400 Bad Request`: Errores de validación o petición malformada.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.

### **3) Agregar un producto**

- **URL:** `products/`

- **Método:** `POST`

- **Descripción:** Agregar un producto.

- Solicitud:

  - Cuerpo de la solicitud:

    - Ejemplo:

      ```
      {
        "name": "Celular",
        "price": 2000,
        "quantity": 2,
        "description": "Apple"
      }
      ```

- Respuestas:

  - `200 OK`: Devuelve el producto agregado.
  - `400 Bad Request`: Errores de validación o petición malformada.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.

### **4) Eliminar un producto**

- **URL:** `products/:id`
- **Método:** `DELETE`
- **Descripción:** Eliminar un producto con su ID.
- Solicitud:
  - Parámetros:
    - `id`: _id del producto a eliminar.
- Respuestas:
  - `200 OK`: Devuelve el mensaje "Producto eliminado correctamente"
  - `400 Bad Request`: Errores de validación o petición malformada.
  - `500 Error interno del servidor`: Cualquier otro error del servidor.

## Usado por:

Este proyecto puede ser usado por:

- CPC Oriente