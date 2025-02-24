import cornerHackTopLeft from '../../assets/corner-hack-top-left.svg';
import { FaLocationDot, FaTowerBroadcast } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { useAppContext } from '../app';

const AISReportStatistics = ({ className = '' }) => {
  const { state } = useAppContext();
  const AISReportCount = state.AISReports.length;
  const pinnedAISReportCount = state.AISReports.reduce(
    (result, report) => (result += report.isPinned ? 1 : 0),
    0
  );

  return (
    <div
      className={`absolute bg-white bottom-0 flex gap-2 left-0 lg:bottom-auto lg:pb-2 lg:pt-0 lg:rounded-br-lg lg:rounded-tr-none lg:top-0 pr-2 pt-2 rounded-tr-lg z-10 ${className}`}
    >
      <img
        src={cornerHackTopLeft}
        className={`absolute bottom-0 right-0 size-2 translate-x-full -rotate-90 lg:rotate-0 lg:bottom-auto lg:top-0`}
      />
      <span
        className="bg-grey-200 cursor-help flex gap-2 h-10 items-center px-4 py-2 rounded-lg text-grey-500"
        title={`${AISReportCount} AIS ${
          AISReportCount === 1 ? 'report' : 'reports'
        } broadcasting in this region`}
      >
        <FaTowerBroadcast />
        <span>{AISReportCount}</span>
      </span>
      <span
        className="bg-grey-200 cursor-help flex gap-2 h-10 items-center px-4 py-2 rounded-lg text-grey-500"
        title={`${pinnedAISReportCount} AIS ${
          pinnedAISReportCount === 1 ? 'report' : 'reports'
        } pinned`}
      >
        <FaLocationDot />
        <span>{pinnedAISReportCount}</span>
      </span>
      <img
        src={cornerHackTopLeft}
        className="absolute left-0 lg:bottom-0 lg:rotate-0 lg:top-auto lg:translate-y-full -rotate-90 size-2 top-0 -translate-y-full"
      />
    </div>
  );
};

AISReportStatistics.propTypes = {
  className: PropTypes.string,
};

export default AISReportStatistics;
