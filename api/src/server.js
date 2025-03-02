import 'dotenv/config';
import { WebSocket, WebSocketServer } from 'ws';
import * as logger from './utilities/logger.js';

const port = process.env.API_PORT;
const WAIT_TIME = process.env.WAIT_TIME;
const AISSTREAM_API_KEY = process.env.AISSTREAM_API_KEY;

const webSocketProxy = new WebSocketServer({ port });

webSocketProxy.on('connection', (clientConnection, req) => {
  const { remoteAddress, remotePort } = req.socket;
  logger.logDownstreamConnectionOpen(remoteAddress, remotePort);

  // Establish upstream connection to aisstream.io
  const aisStreamConnection = new WebSocket(process.env.AISSTREAM_API_URL);

  aisStreamConnection.on('open', () => {
    logger.logE2EConnectionOpen(remoteAddress, remotePort);
  });

  // Relay messages recieved on `aisStreamConnection` to `clientConnection`
  aisStreamConnection.on('message', (message) => {
    logger.logDownstreamMessageStart(remoteAddress, remotePort);
    clientConnection.send(message.toString());
    logger.logDownstreamMessageEnd(remoteAddress, remotePort);
  });

  aisStreamConnection.on('close', (code) => {
    logger.logUpstreamConnectionClose(remoteAddress, remotePort, code);
    if (clientConnection.readyState < 2) {
      clientConnection.close();
    }
  });

  aisStreamConnection.on('error', (error) => {
    logger.logUpstreamConnectionError(remoteAddress, remotePort, error);
  });

  // Relay messages received on `clientConnection` to `aisStreamConnection`
  clientConnection.on('message', (message) => {
    logger.logUpstreamMessageStart(remoteAddress, remotePort);
    const { BoundingBoxes, FilterMessageTypes, FiltersShipMMSI } = JSON.parse(message.toString());
    const update = {
      APIKey: AISSTREAM_API_KEY,
      BoundingBoxes,
      FilterMessageTypes,
      FiltersShipMMSI,
    };
    if (aisStreamConnection.readyState === 1) {
      aisStreamConnection.send(JSON.stringify(update));
      logger.logUpstreamMessageEnd(remoteAddress, remotePort);
    } else {
      setTimeout(() => {
        aisStreamConnection.send(JSON.stringify(update));
        logger.logUpstreamMessageEnd(remoteAddress, remotePort);
      }, WAIT_TIME);
    }
  });

  clientConnection.on('close', (code) => {
    logger.logDownstreamConnectionClose(remoteAddress, remotePort, code);
    if (aisStreamConnection.readyState < 2) {
      aisStreamConnection.close();
    }
  });

  clientConnection.on('error', (error) => {
    logger.logDownstreamConnectionError(remoteAddress, remotePort, error);
  });
});

console.log(`Server listening at ws://localhost:${port}`);
