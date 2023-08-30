# Universidad EAFIT
## ST0263: Tópicos Especiales en Telemática, 2023-2

**Estudiante(s):** Daniel Alfonso Solano Velásquez, dsolano@eafit.edu.co

**Profesor:** Edwin Nelson Montoya

---

# Proyecto: Procesos comunicantes por API REST, RPC y MOM

## 1. Descripción de la Actividad

Este proyecto implementa un sistema de microservicios que se comunican a través de API REST, RPC y MOM. 
Los microservicios permiten listar archivos y buscar archivos en un directorio especificado. 
El API Gateway expone una API REST para interactuar con los microservicios.

### 1.1. Aspectos Cumplidos

- Implementación de dos microservicios (mserv1 y mserv2).
- Comunicación entre microservicios mediante RPC y MOM.
- Listar archivos y buscar archivos.
- Manejo de concurrencia.
- Comunicación principal entre API Gateway y microservicios a través de gRPC.
- Configuración dinámica de parámetros.

### 1.2. Aspectos No Cumplidos

- No hay autenticación y autorización. (poco/nada seguro)

## 2. Información General de Diseño

- Arquitectura basada en microservicios.
- Uso de gRPC para comunicación RPC.
- Uso de RabbitMQ para comunicación MOM.
- Uso de Node.js y Express para implementar los servicios.

## 3. Descripción del Ambiente de Desarrollo

- Lenguaje de Programación: JavaScript (Node.js)
- Bibliotecas y Paquetes requeridas antes de correr el proyecto: Express, gRPC, RabbitMQ, amqplib, request, entre otros.
- Cómo Compilar y Ejecutar: Ejecutar 
`npm install`, `node apiGateway.js`, `node mserv1.js`, y `node mserv2.js`.

### Configuración

- Configuración dinámica a través de archivos JSON (`config.json`).
- Parámetros como IP, puertos y directorios se pueden configurar en `config.json`.

### Estructura de Directorios y Archivos

- proyecto/
- apiGateway.js
- mserv1.js
- mserv2.js
- config.json
- file_service.proto
- find_service.proto

## 4. Ambiente de Ejecución (Producción)

- Lenguaje de Programación: JavaScript (Node.js)
- Bibliotecas y Paquetes: Express (4.18.2), grpc (1.24.11) grpc-tools (1.12.4), grpc/proto-loader (0.7.8), RabbitMQ, amqplib (0.10.3), request (2.88.2).
- Configuración de parámetros en archivos JSON.
- Para lanzar el servidor, ejecute `node apiGateway.js`.

### Guía del Usuario

1. Inicie el API Gateway ejecutando `node apiGateway.js`.
2. Acceda a las rutas `/searchFiles` y `/listFiles` para interactuar con los microservicios.
3. Asegúrese de configurar correctamente los parámetros en `config.json`.

## 5. Otra Información

### AWS IP Elastica

- API: 35.173.87.185
- Mserve1: 44.219.59.130
- Mserver2: 52.7.178.136

### Referencias:
- https://www.youtube.com/watch?v=QdR8lbudXI8
- https://www.youtube.com/watch?v=tpESZGvwE7M
- https://blog.logrocket.com/communicating-between-node-js-microservices-with-grpc/
- https://www.geeksforgeeks.org/express-js-req-query-property/
- https://www.tabnine.com/code/javascript/functions/amqplib/Connection/createChannel
- https://github.com/amqp-node/amqplib/issues/250
- https://www.npmjs.com/package/@grpc/proto-loader
- https://www.npmjs.com/package/grpc-tools
- https://www.npmjs.com/package/request
- https://github.com/grpc/grpc/issues/6557
- https://chat.openai.com/
