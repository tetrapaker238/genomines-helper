# Desafío técnico (2024 - 2) Alejandro Torres

## Requisitos previos de instalación
- [NodeJS](https://nodejs.org/en) versión v21.7.3 o superior
- [NPM](https://www.npmjs.com) versión 10.7.0 o superior
- [Python](https://www.python.org/downloads/) versión 3.12.3 o superior
- [PIP](https://pip.pypa.io/en/stable/installation/) Usando la versión de Python previamente instalada. Si se usa linux, se puede instalar mediante el paquete python-pip
- [PDM](https://pdm-project.org/en/latest/) Se puede instalar con pip, o bien, si se utiliza una versión de linux a través del paquete python-pdm
- [GIT](https://git-scm.com)

## Clonación repositorio
- Clonar este repositorio a través de https 
```bash
git clone https://github.com/tetrapaker238/genomines-helper.git
```
- Abrir una terminal en la carpeta en la cual se clonó el repositorio

## Instalar dependencias frontend
- En la terminal que se encuentra en la carpeta en la que se clonó el repositorio, navegar a la carpeta 'frontend'
```bash
cd frontend
```
- Instalar las dependencias con npm
```bash
npm install
```
- Luego de la instalación, volver a la carpeta padre
```bash
cd ..
```

## Instalar dependencias backend
- En la terminal, entrar a la carpeta 'backend'
```bash
cd backend
```
- Luego entrar a la carpeta 'geomina'
```bash
cd geomina
```
- Instalar dependencias usando pdm
```bash
pdm install
```

## Iniciar proyecto
- Abrir dos terminales: Una en la carpeta 'frontend' del proyecto y otra en la carpeta 'backend/geomina'. Esto es, en la primera terminal ubicada en la carpeta base del proyecto, usar:
```bash
cd frontend
```
y en la segunda también ubicada en la carpeta del proyecto, utilizar:
```bash
cd backend
cd geomina
```
En la primera terminal (frontend), ejecutar
```bash
npm run dev
```

En la segunda terminal (backend), ejecutar
```bash
pdm run manage.py makemigrations
pdm run manage.py migrate
pdm run manage.py runserver
```
Si se desea volver a iniciar el proyecto, solo ejecutar la última instrucción
```bash
pdm run manage.py runserver
```

## Ver proyecto
Con las dos terminales corriendo, se debería ver el proyecto en http://localhost:5173, o bien, en http://127.0.0.1:5173