import cornerHackTopLeft from '../../assets/corner-hack-top-left.svg';
import { FaLocationDot, FaTowerBroadcast } from 'react-icons/fa6';
import { useAppContext } from '../app';

const AISReportStatistics = () => {
  const { state } = useAppContext();
  const AISReportCount = state.AISReports.length;
  const pinnedAISReportCount = state.AISReports.reduce(
    (result, report) => (result += report.isPinned ? 1 : 0),
    0
  );

  return (
    <div className="absolute z-10 top-0 left-0 pb-2 pr-2 flex gap-2 rounded-br-lg bg-white">
      <img
        src={cornerHackTopLeft}
        className="size-2 absolute top-0 right-0 translate-x-full"
      />
      <span
        className="h-10 px-4 py-2 flex gap-2 items-center rounded-lg bg-grey-200 text-grey-500 cursor-help"
        title={`${AISReportCount} AIS ${
          AISReportCount === 1 ? 'report' : 'reports'
        } broadcasting in this region`}
      >
        <FaTowerBroadcast />
        <span>{AISReportCount}</span>
      </span>
      <span
        className="h-10 px-4 py-2 flex gap-2 items-center rounded-lg bg-grey-200 text-grey-500 cursor-help"
        title={`${pinnedAISReportCount} AIS ${
          pinnedAISReportCount === 1 ? 'report' : 'reports'
        } pinned`}
      >
        <FaLocationDot />
        <span>{pinnedAISReportCount}</span>
      </span>
      <img
        src={cornerHackTopLeft}
        className="size-2 absolute bottom-0 left-0 translate-y-full"
      />
    </div>
  );
};

export default AISReportStatistics;
