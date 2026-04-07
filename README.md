# 🏀 EquipoBasket
Proyecto desarrollado con Angular CLI (v20.3.x) para la gestión y visualización de un equipo de baloncesto.

## Equipo
Cèlia Trullà Estruch
Xavi Miró Carrera
Sergio Gómez Gutiérrez
Helena Vivas Ramajo

## Base de datos
Este proyecto utiliza **Firebase** como base de datos en la nube, gestionada mediante **AngularFire**.

## Ramas del repositorio
Este proyecto utiliza dos ramas principales según el entorno de ejecución:
> main → Desarrollo en entorno local
> codesandbox → Configuración adaptada para ejecución en CodeSandbox

## Servidor de desarrollo (Local)
Para ejecutar el proyecto en local:
```````ng serve```
Abrir en el navegador:
http://localhost:4200/

## Ejecución en CodeSandbox
Para ejecutar el proyecto en CodeSandbox:
Cambiar a la rama codesandbox:
``````git checkout codesandbox```
Instalar dependencias:
`````npm install```
Iniciar el servidor:
````npm start```

Esta rama está configurada para funcionar en entornos online con:
```ng serve --host 0.0.0.0 --allowed-hosts=all```
CodeSandbox generará automáticamente una URL pública tipo:
https://xxxxx-4200.csb.app

## Notas
- La rama `codesandbox` incluye ajustes necesarios para que Angular funcione correctamente en entornos online (Node.js v22, allowed-hosts).
- La rama `main` debe utilizarse para el desarrollo local.
- El proyecto está preparado para ser compartido y evaluado mediante CodeSandbox.
- La base de datos Firebase es compartida entre ambas ramas.

## Recursos adicionales
[Documentación oficial de Angular CLI](https://angular.dev/tools/cli)
[Documentación de Firebase](https://firebase.google.com/docs)
[Documentación de AngularFire](https://github.com/angular/angularfire)
```
