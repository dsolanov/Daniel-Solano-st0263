const fs = require('fs');
const express = require('express');
const grpc = require('grpc');
const { Empty } = require('google-protobuf');

const app = express();
const config = require('./config.json');

const amqp = require('amqplib');

const fileServiceProto = grpc.loadPackageDefinition(
  grpc.loadPackageDefinition(
    grpc.loadPackageDefinition(
      grpc.loadPackageDefinition({
        root: {
          file_service: {
            FileService: {
              ListFiles: {
                // path: '/Users/sola/Documents/Screenshots-Screenrecorder',
                path: '/file_service.FileService/ListFiles',
                requestStream: false,
                responseStream: false,
                requestType: Empty,
                responseType: {
                  files: ['']
                }
              }
            }
          }
        }
      })
    )
  )
);

app.get('/listFiles', (req, res) => {
  try {
    const fileList = listFiles();
    const response = { files: fileList };
    res.status(200).json(response);
  } catch (error) {
    console.error('Error en la solicitud /listFiles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function listFiles() {
  try {
    const fileList = fs.readdirSync(config.directory);
    const notification = { files: fileList };
    sendNotification(notification);
    return fileList;
  } catch (error) {
    console.error('Error al listar archivos:', error);
    throw error;
  }
}

async function sendNotification(files) {
  try {
    const rabbitmqUrl = 'amqp://localhost';
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();

    const queueName = 'file_search_results';
    await channel.assertQueue(queueName);

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(files)));
    console.log(`[mserv1] Envió notificacion a RabbitMQ:`, files);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error al enviar notificación a RabbitMQ:', error);
  }
}

const server = app.listen(config.port, config.ip, () => {
  console.log(`Microservicio 1 (mserv1) -> Escuchando... ${config.ip}:${config.port}`);
});

