import { AISMessageMarker } from '../ais-message';
import { AISWebSocket } from '../ais-websocket';
import { debounce, formatBoundingBoxes } from '../../utilities';
import Map from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAISMapContext } from './AISMapContext';
import { useAISMessageContext } from '../ais-message';

const AISMap = () => {
  const AISMapCtx = useAISMapContext();
  const AISMessageCtx = useAISMessageContext();

  const onLoad = debounce(({ target }) => {
    AISMapCtx.dispatch({ type: 'setRef', payload: target });
    const boundingBoxes = formatBoundingBoxes(target);
    AISMapCtx.dispatch({ type: 'setBoundingBoxes', payload: boundingBoxes });
  }, 1000);

  const onMoveEnd = debounce(({ target }) => {
    const boundingBoxes = formatBoundingBoxes(target);
    AISMapCtx.dispatch({ type: 'setBoundingBoxes', payload: boundingBoxes });
    AISMessageCtx.dispatch({
      type: 'removeOutOfBoundsMessages',
      payload: boundingBoxes[0],
    });
  }, 1000);

  const onIdle = () => {
    if (AISMapCtx.state.ref) {
      const currentZoom = AISMapCtx.state.ref.getZoom();
      console.log(currentZoom, AISMapCtx.state.delta.pan);
      AISMapCtx.dispatch({ type: 'setDeltaPan', payload: currentZoom });
    }
  };

  return (
    <Map
      {...AISMapCtx.state.attributes}
      initialViewState={AISMapCtx.state.initialViewState}
      onLoad={onLoad}
      onMoveEnd={onMoveEnd}
      onIdle={onIdle}
    >
      {AISMessageCtx.state.messages.map((message) => (
        <AISMessageMarker
          key={message.MMSI}
          message={message}
        />
      ))}
      {AISMapCtx.state.BoundingBoxes && <AISWebSocket />}
    </Map>
  );
};

export default AISMap;
