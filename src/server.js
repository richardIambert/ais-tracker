import 'dotenv/config';
import { WebSocket, WebSocketServer } from 'ws';

const port = process.env.PORT || 8080;
const SOCKET_WAIT_TIME = process.env.SOCKET_WAIT_TIME || 1000;
const AISSTREAM_SOCKET_UPDATE = process.env.AISSTREAM_SOCKET_UPDATE || 'AISStreamSocketUpdate';

const webSocketProxy = new WebSocketServer({ port });

webSocketProxy.on('connection', (clientConnection) => {
  // Create upstream connection to aisstream.io
  const aisStreamConnection = new WebSocket(process.env.AISSTREAM_API_URL);

  // Pass messages recieved on `aisStreamConnection` through to `clientConnection`
  aisStreamConnection.on('message', (event) => {
    clientConnection.send(event.data.toString());
  });

  aisStreamConnection.on('close', () => {
    // TODO: Implement check close condition and recovery
    // TODO: Relay close over `clientConnection`
    console.log('WebSocket connection to aisstream.io closed');
  });

  aisStreamConnection.on('error', (error) => {
    // TODO: Implement recovery
    // TODO: Relay error over `clientConnection`
    console.error(`WebSocket connection to aisstream.io: error: ${error}`);
  });

  // Send messages received on `clientConnection` over `aisStreamConnection`
  clientConnection.on('message', (data) => {
    const message = JSON.parse(data.toString());
    // If the received message type is a socket update
    if (message.type === AISSTREAM_SOCKET_UPDATE) {
      const update = {
        Apikey: process.env.AISSTREAM_API_KEY,
        BoundingBoxes: message.boundingBoxes,
        FilterMessageTypes: message.filterMessageTypes,
        FilterShipMMSI: message.filterShipMMSI,
      };
      // And `aisStreamConnection` ready state is OPEN
      if (aisStreamConnection.OPEN) {
        // Send the update message over `aisStreamConnecion`
        aisStreamConnection.send(JSON.stringify(update));
      } else {
        // Otherwise, wait before sending the update message over `aisStreamConnection`
        setTimeout(() => {
          aisStreamConnection.send(JSON.stringify(update));
        }, SOCKET_WAIT_TIME);
      }
    }
  });

  clientConnection.on('close', () => {
    aisStreamConnection.close();
    console.log('WebSocket connection to client closed');
  });

  clientConnection.on('error', (error) => {
    console.error(`WebSocket connection to client: error: ${error}`);
  });
});

console.log(`Server listening at ws://localhost:${port}`);
