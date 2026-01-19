# Carvelu - Cortes Premium & Tradición Familiar

Carvelu es una aplicación web de E-commerce desarrollada con **React** y **Vite**, diseñada para una carnicería online. El sistema permite gestionar un catálogo de productos, manejar un carrito de compras dinámico, procesar ventas con generación de boletas y mantener un historial privado por usuario.



## 🚀 Funcionalidades Principales

### 🛒 Experiencia del Cliente
- **Catálogo Dinámico:** Vistas separadas para la tienda general, ofertas imperdibles y productos recién llegados.
- **Buscador en Tiempo Real:** Filtro de productos por nombre mediante la barra de búsqueda en el Navbar.
- **Carrito de Compras:** Gestión de cantidades y persistencia de datos.
- **Sistema de Notificaciones (Stacking):** Avisos visuales acumulables al agregar productos, mejorando la respuesta de la interfaz.
- **Boleta de Venta:** Generación de un resumen detallado de compra con opción de impresión.

### 🔐 Seguridad y Privacidad
- **Autenticación:** Sistema de registro e inicio de sesión.
- **Historial Privado:** Cada usuario puede ver únicamente sus propios pedidos anteriores, vinculados de forma segura a su correo electrónico.
- **Protección de Rutas:** El acceso al carrito, historial y panel de administración está restringido a usuarios autenticados.

### ⚙️ Administración (Panel Admin)
- **Gestión de Inventario:** CRUD completo (Crear, Leer, Actualizar, Eliminar) para productos.
- **Control de Etiquetas:** Posibilidad de marcar productos como "Oferta" o "Nuevo" directamente desde la interfaz.

---

## 🛠️ Tecnologías Utilizadas

* **React 18** - Biblioteca principal de UI.
* **Vite** - Herramienta de construcción (Build tool) ultra rápida.
* **Bootstrap 5** - Framework de estilos para un diseño responsivo y moderno.
* **Bootstrap Icons** - Librería de iconos vectoriales.
* **Local Storage** - Persistencia de datos local para carrito, inventario, usuarios e historial.

---

## 💻 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

1. **Clonar o descargar el proyecto:**
   Asegúrate de tener todos los archivos en una carpeta.

2. **Instalar dependencias:**
   Abre una terminal en la carpeta del proyecto y ejecuta:
   npm install
Iniciar el servidor de desarrollo:

npm run dev
Acceder a la App: Abre tu navegador en http://localhost:XXXX (o el puerto indicado en la terminal).

🧪 Pruebas Unitarias
El proyecto incluye un conjunto de pruebas para validar la lógica del negocio:

Registro de nuevos usuarios.

Flujo de inicio de sesión.

Adición de productos al carrito.

Verificación de persistencia en LocalStorage.

Para ejecutar los tests:

npm test