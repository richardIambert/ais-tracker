import { useAISMapContext } from '../ais-map';
import { useAISMessageContext } from '../ais-message';
import { useEffect, useState } from 'react';

const AISWebSocket = () => {
  const AISMapCtx = useAISMapContext();
  const AISMessageCtx = useAISMessageContext();
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_API_URL);

    setWebSocket(ws);

    ws.addEventListener('open', () => {
      console.log(`WebSocket connection opened: client <-> ${import.meta.env.VITE_API_URL}`);
      const { BoundingBoxes } = AISMapCtx.state;
      const { FilterMessageTypes, FiltersShipsMMSI } = AISMessageCtx.state;
      ws.send(
        JSON.stringify({
          BoundingBoxes,
          FilterMessageTypes,
          FiltersShipsMMSI,
        })
      );
    });

    ws.addEventListener('message', (message) => {
      const { error, Message, MessageType, MetaData } = JSON.parse(message.data);
      if (error) {
        console.error(error);
      } else {
        const { Cog, Latitude, Longitude, Sog, TrueHeading } = Message[MessageType];
        const { MMSI, ShipName, time_utc } = MetaData;
        AISMessageCtx.dispatch({
          type: 'addOrReplaceMessage',
          payload: {
            COG: Cog,
            HDG: TrueHeading,
            latitude: Latitude,
            longitude: Longitude,
            MMSI,
            name: ShipName,
            SOG: Sog,
            timestamp: time_utc,
            type: MessageType,
          },
        });
      }
    });

    ws.addEventListener('close', ({ code }) => {
      console.log(
        `WebSocket connection closed: client <-X-> ${import.meta.env.VITE_API_URL}: ${code}`
      );
    });

    ws.addEventListener('error', (error) => {
      console.log(
        `WebSocket connection error: client <-X-> ${import.meta.env.VITE_API_URL}: ${error}`
      );
    });

    return () => {
      ws.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('`boundingBox` changed. Sending updated subscription message...');
    if (webSocket && webSocket.readyState === 1) {
      const { BoundingBoxes } = AISMapCtx.state;
      const { FilterMessageTypes, FiltersShipsMMSI } = AISMessageCtx.state;
      webSocket.send(
        JSON.stringify({
          BoundingBoxes,
          FilterMessageTypes,
          FiltersShipsMMSI,
        })
      );
    }
  }, [AISMapCtx.state.BoundingBoxes]);

  return <></>;
};

export default AISWebSocket;
