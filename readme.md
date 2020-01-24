## Prueba datatraffic

**Configurar variables de entorno para motor de postgress**

### Crear string para firmar token

Para crear esta llave usamos el script con npm 

```
npm run generate:key

```

o ejecutando el script 

```
node ./scripts/generateKey.js

```

una vez ejecutado el script regresara una llave la que colocaremos dentro de la vairable de entorno llamada **TOKEN=**

**Para hacer un setup de la base de datos**

Configurar en true la variable de entorno **SETUP_DB** de lo contrario dejar en false.


**Script para crear Roles**

Para crear los roles Admin y Consulta correr:

```
npm run generate:roles

```

o ejecutando el script 

```
node ./scripts/seedRoles.js

```


**Script para crear Usuarios**

Para crear dos usuarios con los roles Admin y Consulta correr:

```
npm run generate:users

```

o ejecutando el script 

```
node ./scripts/seedUsers.js

```