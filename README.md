# REST API de Recursos con MySQL y TypeORM (TypeScript)

Características principales del proyecto:

1. La aplicación se ha dividido en un fichero app.ts y server.ts
2. Se han creado los mantenimientos de fabricantes, editoriales, idiomas, temas, libros y tutoriales
3. Los controladores se encuentran en la carpeta controllers
4. Las rutas se encuentran en la carpeta route
5. Las entidades se encuentran en la carpeta entity
6. La conexión a la base de datos se encuentra en config/db.ts
7. Todos los mensajes de retorno se encuentran en config/messages.ts
8. La carga de datos se encuentran en la carpeta seed. En el fichero info.txt he dejado instrucciones al respecto
9. Cada entidad tiene su correspondiente repositorio. Éstos se encuentran en la carpeta repository
10. En la carpeta seed se ha dejado el fichero seed.ts con un llenado de datos de ejemplo
11. Se desarrollan unas rutas de estadísticas de libros y tutoriales
12. Se usan los paquetes de cors, helmet, xss, hpp y express-rate-limit
13. Las migraciones se desarrollan a propósito. Se encuentran en la carpeta migration y se ejecutan desde el package.json
