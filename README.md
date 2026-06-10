# 🐾 PetBridge - Plataforma de Gestión y Conexión para Adopciones

**PetBridge** es una aplicación web full-stack diseñada para centralizar, gestionar y optimizar los procesos de adopción de mascotas. La plataforma actúa como un puente eficiente entre refugios, animales en búsqueda de un hogar y adoptantes potenciales, simplificando la logística y el seguimiento de las solicitudes.

El proyecto combina un servidor ligero y eficiente en el lado del servidor con una persistencia de datos relacional local para garantizar un rendimiento óptimo bajo cualquier escenario.

---

### 🛠️ Arquitectura y Stack Tecnológico

El sistema ha sido estructurado siguiendo principios de modularidad y separación de responsabilidades:

* **Entorno de Servidor:** Node.js (Ecosistema asíncrono y escalable).
* **Gestión de Servidor HTTP:** JavaScript nativo / módulos integrados (`server.js`).
* **Persistencia de Datos (Base de Datos):** SQLite3 (`petbridge.db`). Se utiliza una base de datos relacional ligera integrada directamente en el sistema de archivos para agilizar el despliegue y desarrollo.
* **Interfaz de Usuario (Front-End):** HTML5 y CSS3 avanzados para garantizar una experiencia de usuario (UX) fluida, responsiva y limpia (incluyendo Footer estructurado e interfaz dedicada para procesos de adopción).

---

### 📂 Estructura del Repositorio

```text
├── BD/                       # Scripts SQL, diagramas y lógica de rutas de la Base de Datos
├── Diseño/                   # Maquetación de interfaces, estilos CSS y vistas HTML
├── Planificacion y briefing/ # Documentación estratégica y requerimientos del sistema
├── Planning/                 # Cronograma de desarrollo y fases del proyecto
├── petbridge.db              # Archivo de base de datos relacional SQLite
├── server.js                 # Punto de entrada principal y lógica de control del servidor
├── package.json              # Configuración del proyecto y manifiesto de dependencias
└── .gitignore                # Exclusión de archivos temporales y dependencias (node_modules)
