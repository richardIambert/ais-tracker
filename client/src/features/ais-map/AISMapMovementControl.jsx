import PropTypes from 'prop-types';
import { useAISMapContext } from './AISMapContext';

const AISMapMovementControl = ({ children, ...rest }) => {
  const AISMapCtx = useAISMapContext();

  const onClick = (event) => {
    const action = event.target.dataset.action;
    if (action) {
      const mapRef = AISMapCtx.state.ref;
      const deltaPan = AISMapCtx.state.delta.pan;
      const deltaZoom = AISMapCtx.state.delta.zoom;
      const { lng, lat } = mapRef.getCenter();
      const zoom = mapRef.getZoom();
      switch (action) {
        case 'pan-up': {
          return mapRef.panTo([lng, lat + deltaPan], { duration: 1000 });
        }
        case 'pan-down': {
          return mapRef.panTo([lng, lat - deltaPan], { duration: 1000 });
        }
        case 'pan-left': {
          return mapRef.panTo([lng - deltaPan, lat], { duration: 1000 });
        }
        case 'pan-right': {
          return mapRef.panTo([lng + deltaPan, lat], { duration: 1000 });
        }
        case 'zoom-in': {
          return mapRef.zoomTo(zoom + deltaZoom, { duration: 1000 });
        }
        case 'zoom-out': {
          return mapRef.zoomTo(zoom - deltaZoom, { duration: 1000 });
        }
        default: {
          return;
        }
      }
    }
  };

  return (
    <button
      className={`bg-grey-200 flex items-center justify-center rounded-lg size-10 text-grey-500 ${
        AISMapCtx.state.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      disabled={AISMapCtx.state.isLocked}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

AISMapMovementControl.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMapMovementControl;
