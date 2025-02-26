import AISMap from './AISMap';
import AISMapControls from './AISMapControls';
import { AISReportStatistics } from '../ais-report';
import PropTypes from 'prop-types';

const AISMapContainer = ({ className = '' }) => {
  return (
    <div className={`h-full overflow-hidden relative rounded-lg w-full ${className}`}>
      <AISReportStatistics />
      <AISMapControls />
      <AISMap />
    </div>
  );
};

AISMapContainer.propTypes = {
  className: PropTypes.string,
};

export default AISMapContainer;
