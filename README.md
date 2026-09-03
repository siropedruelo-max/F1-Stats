# 🏎️ Open Stats F1 — Plataforma de Estadísticas de Fórmula 1

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PNPM](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![Estado](https://img.shields.io/badge/estado-completado-brightgreen?style=for-the-badge)

Una aplicación web moderna e interactiva para los fanáticos de la **Fórmula 1**. Permite consultar estadísticas de la temporada, comparar el rendimiento entre pilotos en tiempo real y guardar tus pilotos y escuderías favoritas en local storage.

Desarrollada como **Multi-Page Application (MPA)** utilizando **Vite** para un empaquetado ultra rápido y una arquitectura modular limpia.

🌐 **[Ver Demo en Vivo](https://f1-stats-pied.vercel.app/)** 

---

## ✨ Características Principales

* **📊 Dashboard de Estadísticas:** Tabla de posiciones, datos de pilotos y escuderías actualizados.
* **⚔️ Comparador de Pilotos:** Módulo interactivo para analizar mano a mano el rendimiento de dos pilotos.
* **⭐ Gestión de Favoritos:** Guardado de datos en almacenamiento local (LocalStorage) a través de un servicio dedicado.
* **⚡ Arquitectura MPA con Vite:** Carga modular de páginas independientes (`/`, `/pages/comparador`, `/pages/favoritos`).
* **🎨 UI Responsiva F1:** Diseño estilizado en *Dark Mode* adaptado a dispositivos móviles y escritorio.

---

## 🛠️ Tecnologías Utilizadas

* **Build Tool & Dev Server:** [Vite](https://vitejs.dev/)
* **Lenguajes:** HTML5, CSS3, JavaScript (ES6+ Modules)
* **Gestor de Paquetes:** [PNPM](https://pnpm.io/)
* **Estructura:** Multi-Page Application (MPA) con Rollup bundler

---

## 📂 Estructura del Proyecto

```text
open-stats-f1/
├── public/                 # Archivos estáticos globales
├── src/
│   ├── assets/             # Imágenes e íconos (hero, SVGs)
│   ├── data/               # Información estática y APIs (pilotos.js)
│   ├── pages/              # Subpáginas de la app (MPA)
│   │   ├── comparador/     # Módulo de comparación
│   │   └── favoritos/      # Módulo de favoritos
│   ├── services/           # Lógica de negocio y persistencia (favoritos.js)
│   ├── styles/             # Hojas de estilo globales y por módulo
│   └── main.js             # JavaScript principal para el Home
├── index.html              # Página principal / Home
├── vite.config.js          # Configuración multi-página de Vite
└── package.json            # Dependencias y scripts
