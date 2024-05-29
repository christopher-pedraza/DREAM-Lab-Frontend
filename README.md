[![Azure Static Web Apps CI/CD](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End/actions/workflows/azure-static-web-apps-lively-grass-0af65cc0f.yml/badge.svg?branch=dev)](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End/actions/workflows/azure-static-web-apps-lively-grass-0af65cc0f.yml) [![Cypress tests](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End/actions/workflows/cypress-tests.yml/badge.svg?branch=dev)](https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End/actions/workflows/cypress-tests.yml)

# Frontend del DREAM Lab

## Proyectos relacionados

-   Se puede consultar el backend en el repositorio de [Backend](https://github.com/CodeCraft-Solutions-DREAM-Lab/Back-End).
-   Asimismo, la aplicación que permite la conexión con el chat de voz se puede encontrar en el repositorio de [RecomendacionesDreamLab](https://github.com/CodeCraft-Solutions-DREAM-Lab/RecomendacionesDreamLab).

## Despliegue

Esta aplicación web se encuentra desplegada como una Static Web App de Azure en la siguiente liga: [https://www.dreamlab.world](https://www.dreamlab.world).

## Configuración

Para configurar el proyecto localmente puedes seguir los siguientes pasos:

1. Clona el repositorio utilizando Git. Si no tienes Git instalado, puedes descargarlo desde [https://git-scm.com/downloads](https://git-scm.com/downloads).

    Para clonar el repositorio, abre una terminal y ejecuta el siguiente comando:

    ```
    git clone https://github.com/CodeCraft-Solutions-DREAM-Lab/Front-End.git
    ```

2. Navega al directorio del proyecto:

    Usando la misma terminal con la que se clonó el repositorio, ejecuta el siguiente comando para cambiar el directorio activo en la terminal y que el resto de los comandos se corran dentro del proyecto:

    ```
    cd "Front-End\dream-lab-frontend"
    ```

3. Instala las dependencias de Node. Para poder correr este comando es necesario tener instalado Node con la versión `20.X`, puedes descargarlo desde [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager):

    ```
    npm install
    ```

4. Crea en la raiz del proyecto el archivo de las variables de entorno:

    4.1. Corre uno de estos dos comandos dependiendo de tu sistema operativo:

    > Unix (macOS, Linux):

    ```
    touch .env && nano .env
    ```

    > Windows

    ```
    echo. > .env && notepad .env
    ```

    4.2. Copia las siguientes variables en el archivo:

    ```
    VITE_API_URL=http://localhost:3000/
    ```

> [!NOTE]
> En caso de tener el API desplegado en un servicio como Azure, reemplazar `http://localhost:3000/` por el URL de la API desplegada.

## Desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```
npm run dev
```

## Construcción

Para construir la aplicación para producción, ejecuta:

```
npm run build
```

## Vista previa

Para servir la aplicación construida como si se sirviera en producción, ejecuta:

```
npm run preview
```

## Lint

Para ejecutar ESLint en el código, ejecuta:

```
npm run lint
```


