import AISReportMarkerIcon from '../../assets/ais-report-marker-icon.svg';
import { Marker } from 'react-map-gl/mapbox';
import PropTypes from 'prop-types';

const AISReportMarker = ({ report }) => {
  const { HDG, isPinned, latitude, longitude } = report;
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      rotation={HDG}
      className="border-2 size-5"
      style={{ borderColor: isPinned ? 'var(--color-orange-500)' : 'transparent' }}
    >
      <img src={AISReportMarkerIcon} />
    </Marker>
  );
};

AISReportMarker.propTypes = {
  report: PropTypes.shape({
    COG: PropTypes.number,
    HDG: PropTypes.number,
    isPinned: PropTypes.bool.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    MMSI: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    SOG: PropTypes.number,
    type: PropTypes.oneOf([
      'AidsToNavigationReport',
      'PositionReport',
      'StandardClassBPositionReport',
    ]),
  }),
};

export default AISReportMarker;
