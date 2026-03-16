# Sistema de Citas Medicas

Aplicacion web local para gestionar citas medicas con perfiles de usuario y administrador.

## Requisitos

- Node.js LTS (recomendado 18 o superior)
- npm (incluido con Node.js)
- Visual Studio Code (opcional, recomendado)

## Instalacion

1. Abre una terminal en la carpeta del proyecto.
2. Instala dependencias:

```bash
npm install
```

## Ejecucion en desarrollo

1. En una terminal, inicia la API local (guarda en archivo):

```bash
node server/index.js
```

2. En otra terminal, inicia el frontend:

```bash
npm run dev

Luego abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Build de produccion

```bash
npm run build
```

## Vista previa de produccion

```bash
npm run preview
```

## Credenciales iniciales

- Usuario: `admin`
- Contrasena: `admin`

## Funcionalidades principales

- Inicio de sesion con roles (admin y usuario).
- Registro de citas medicas con validaciones.
- Gestion de especialidades y medicos (admin).
- Gestion de usuarios (admin).
- Reportes filtrados por fecha, especialidad y estado.
- Impresion de reportes.
- Persistencia en archivo local `data/db.json` (API Express).

## Estructura basica

- `src/App.tsx`: Componente principal de la aplicacion.
- `src/main.tsx`: Punto de entrada de React.
- `src/index.css`: Estilos globales.

## Configuracion recomendada para VS Code

El proyecto ya incluye configuraciones listas para usar:

- `.vscode/extensions.json`
- `.vscode/settings.json`
- `.vscode/launch.json`
- `.prettierrc`
- `.prettierignore`
- `.editorconfig`
- `.eslintrc.json`

## Notas

- La informacion principal se guarda en `data/db.json`.
- Si la API no esta disponible, la app usa localStorage como respaldo temporal.
- Para reiniciar datos desde cero, elimina el archivo `data/db.json` y vuelve a iniciar `node server/index.js`.