const express = require('express');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const amqp = require('amqplib');

const app = express();
const port = 5004;

const fs = require('fs');
const path = require('path');

// cargar archivo proto de gRPC
const packageDefinition = protoLoader.loadSync('find_service.proto', {});
const fileProto = grpc.loadPackageDefinition(packageDefinition).file;

// configuración de RabbitMQ
const rabbitmqUrl = 'amqp://localhost';
let channel;

(async () => {
  const connection = await amqp.connect(rabbitmqUrl);
  channel = await connection.createChannel();
  await channel.assertQueue('file_search_results');
})();

const searchFiles = (directory, pattern) => {
  console.log(pattern," Patteern atras", directory);
  try {
    const files = fs.readdirSync(directory);
    const matchingFiles = files.filter(file => file.includes(pattern));
    console.log(matchingFiles);
    return matchingFiles;
  } catch (error) {
    console.error('Error searching files:', error);
    return [];
  }
};

// servicio gRPC
const searchFilesGRPC = (call, callback) => {
  try {
    const request = call.request;
    const response = searchFiles(request.directory, request.pattern);
    callback(null, response);
  } catch (error) {
    console.error('Error en la operación gRPC SearchFiles:', error);
    callback({ code: grpc.status.INTERNAL, details: 'Internal Server Error' });
  }
};


// Implementación de las rutas API REST con Express
app.get('/search', (req, res) => {
  try {
    const directory = req.query.directory;
    const pattern = req.query.pattern;

    if (!directory || !pattern) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const matchingFiles = searchFiles(directory, pattern);
    res.json({ files: matchingFiles });
  } catch (error) {
    console.error('Error en la solicitud /search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Config serv gRPC
const grpcServer = new grpc.Server();
grpcServer.addService(fileProto.FileSearch.service, { SearchFiles: searchFilesGRPC });
grpcServer.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure());
grpcServer.start();

// envio de resultaod a Rabbit
const sendSearchResults = (files) => {
  if (channel) {
    channel.sendToQueue('file_search_results', Buffer.from(JSON.stringify(files)));
  }
};

// notificaciones mom (Rabbit)
app.post('/notify', (req, res) => {
  const directory = req.body.directory;
  const pattern = req.body.pattern;

  if (!directory || !pattern) {
    return res.status(400).json({ error: 'Parametros Faltates' });
  }

  const response = searchFiles(directory, pattern);
  sendSearchResults(response.files);
  res.json({ message: 'Resultados de busqueda enviados!' });
});

app.listen(port, () => {
  console.log(`Microservicio 2 -> Escuchando http://localhost:${port}`);
});

async function receiveNotifications() {
  const rabbitmqUrl = 'amqp://localhost';
  const connection = await amqp.connect(rabbitmqUrl);
  const channel = await connection.createChannel();

  const queueName = 'file_search_results';
  await channel.assertQueue(queueName);

  console.log(`[mserv2] Esperando notificacion de RabbitMQ...`);

  channel.consume(queueName, (msg) => {
    const notification = JSON.parse(msg.content.toString());
    console.log(`[mserv2] Notificacion recibida de RabbitMQ: `, notification);
  }, { noAck: true });
}

receiveNotifications();
