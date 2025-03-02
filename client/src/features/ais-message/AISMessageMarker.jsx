import AISMessageMarkerIcon from '../../assets/ais-message-marker-icon.svg';
import { Marker } from 'react-map-gl/mapbox';
import PropTypes from 'prop-types';

const AISMessageMarker = ({ message }) => {
  const { HDG, isPinned, latitude, longitude } = message;
  return (
    <Marker
      className="border-2 size-5"
      latitude={latitude}
      longitude={longitude}
      rotation={HDG}
      style={{
        borderColor: isPinned ? 'var(--color-orange-500)' : 'transparent',
      }}
    >
      <img src={AISMessageMarkerIcon} />
    </Marker>
  );
};

AISMessageMarker.propTypes = {
  message: PropTypes.shape({
    COG: PropTypes.number,
    HDG: PropTypes.number,
    isPinned: PropTypes.bool.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    MMSI: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    SOG: PropTypes.number,
    type: PropTypes.oneOf([
      'AidsToNavigationMessage',
      'PositionMessage',
      'StandardClassBPositionMessage',
    ]),
  }),
};

export default AISMessageMarker;
