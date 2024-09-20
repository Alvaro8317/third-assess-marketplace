const express = require('express');
const WebSocket = require('ws');
const { OrderController } = require('./controllers/orderController');
const { environmentVariables } = require('./utils/env_util');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on('connection', (ws) => {
  console.log(`New client connected`);
  clients.push(ws); // Agrega el nuevo cliente al array

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Envía el mensaje a todos los clientes conectados
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          `¡Hay una nueva oferta! Mira los detalles a continuación: ${message}`
        );
      }
    });
  });

  ws.on('close', () => {
    // Elimina el cliente del array al desconectarse
    clients.splice(clients.indexOf(ws), 1);
    console.log(`Client disconnected`);
  });
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/orders', (req, res) => {
  const controller = new OrderController();
  controller.createOrder(req, res);
});

const PORT = environmentVariables.portExpress || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
