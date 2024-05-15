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

## Uso aplicación
- Para filtrar por la comida, escribir dentro del primer cuadro de texto de izquierda a derecha.
- Para filtrar por país, escribir dentro del segundo cuadro de texto de izquierda a derecha y luego hacer click en el botón de búsqueda (icono de lupa). Si se desea reiniciar la lista, dejar en blanco y luego hacer click en el botón de buscar nuevamente.
- Para agregar un nuevo restaurant hacer click en "Agregar Restaurant". Se abrirá un modal en el cual se puede ingresar la información de un nuevo restaurant. Al hacer click en el checkbox de "Visitado", se habilitará una caja de texto para indicar la calificación del restaurant. Para guardar hacer click en el botón "Guardar fila".
- Para ordenar la tabla por una columna, hacer click en un encabezado de la tabla (por ejemplo, País) que no sea ni "Editar" ni "Eliminar". Se habilitará un icono triangular al lado del encabezado. Si se muestra un triangulo normal, el orden de la columna es ascendente. Al hacer click nuevamente, cambiará el orden de ascendente a descendente.
- Es posible filtrar a la vez que se ordena la tabla por alguna columna.
- Para editar un restaurant, hacer click en el icono de lápiz que aparece en la fila. Se abrirá un modal similar al de agregar un restaurante.
- Para eliminar un restaurant, hacer click en el icono de basurero que aparece en la fila.

### Consideraciones
- Se basó la implementación fuertemente en el tutorial inicial de React y  de DRF.
- Los recursos utilizados fueron comentados dentro del código.