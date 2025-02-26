import AISReportFilter from './AISReportFilter';
import AISReportList from './AISReportList';
import PropTypes from 'prop-types';

const AISReportContainer = ({ className = '' }) => {
  return (
    <div className={`gap-2 grid grid-rows-[auto_1fr] overflow-hidden ${className}`}>
      <AISReportFilter />
      <AISReportList />
    </div>
  );
};

AISReportContainer.propTypes = {
  className: PropTypes.string,
};

export default AISReportContainer;
