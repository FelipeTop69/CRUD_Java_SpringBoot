# Para un Correcto Funcionamiento del Proyecto

### Backend
> Construir

```bash
./mvnw clean install
```

</br>

> Ejecutar 

```bash
./mvnw spring-boot:run
```

</br>

### Frontend

> Restaurar

```bash
npm install
```

> Ejecutar 

```bash
npx expo start
npm run android
npm run web
npm run ios
```

> Limpiar
```bash
npx expo start --clear
npx react-native start --reset-cache
```

</br>

### Swagger
Acceder a interfaz visual de swagger: http://localhost:8080/swagger-ui/index.html#/

> Revisar la direccion IP y cambiar en el back (cors) y en el frontend (consante de petición)
