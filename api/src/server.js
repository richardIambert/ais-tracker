import 'dotenv/config';
import { WebSocket, WebSocketServer } from 'ws';

const port = process.env.API_PORT;
const WAIT_TIME = process.env.WAIT_TIME;
const AISSTREAM_API_KEY = process.env.AISSTREAM_API_KEY;

const webSocketProxy = new WebSocketServer({ port });

webSocketProxy.on('connection', (clientConnection) => {
  console.log('WebSocket connection opened: client <-> proxy');
  // Establish upstream connection to aisstream.io
  const aisStreamConnection = new WebSocket(process.env.AISSTREAM_API_URL);

  aisStreamConnection.on('open', () => {
    console.log('WebSocket connection opened: proxy <-> aisstream.io');
  });

  // Relay messages recieved on `aisStreamConnection` to `clientConnection`
  aisStreamConnection.on('message', (message) => {
    console.log('Message recieved: proxy <- aisstream.io');
    console.log('Relaying message: client <- proxy');
    clientConnection.send(message.toString());
  });

  aisStreamConnection.on('close', (code) => {
    console.log(`WebSocket connection closed: proxy <-X-> aisstream.io: ${code}`);
    if (clientConnection.readyState < 2) {
      console.log('Closing WebSocket connection: client <-?-> proxy');
      clientConnection.close();
    }
  });

  aisStreamConnection.on('error', (error) => {
    console.error(`WebSocket connection error: proxy <-X-> aisstream.io: ${error}`);
  });

  // Relay messages received on `clientConnection` to `aisStreamConnection`
  clientConnection.on('message', (message) => {
    console.log('Message received: client -> proxy');
    console.log('Relaying message: proxy -> aisstream.io');

    const { boundingBoxes, filterMessageTypes, filterShipMMSI } = JSON.parse(message.toString());
    const update = {
      APIKey: AISSTREAM_API_KEY,
      BoundingBoxes: boundingBoxes,
      FilterMessageTypes: filterMessageTypes,
      FilterShipMMSI: filterShipMMSI,
    };
    if (aisStreamConnection.readyState === 1) {
      aisStreamConnection.send(JSON.stringify(update));
    } else {
      setTimeout(() => {
        aisStreamConnection.send(JSON.stringify(update));
      }, WAIT_TIME);
    }
  });

  clientConnection.on('close', (code) => {
    console.log(`WebSocket connection closed: client <-X-> proxy: ${code}`);
    if (aisStreamConnection.readyState < 2) {
      console.log('Closing WebSocket connection: proxy <-?-> aisstream.io');
      aisStreamConnection.close();
    }
  });

  clientConnection.on('error', (error) => {
    console.error(`WebSocket connection error: client <-X-> proxy: ${error}`);
  });
});

console.log(`Server listening at ws://localhost:${port}`);
