import AISReportListItem from './AISReportListItem';
import { filterAISReports, sortAISReportsByPinned } from '../../utilities';
import { useAppContext } from '../app';

const AISReportList = () => {
  const { state } = useAppContext();
  const AISReports = sortAISReportsByPinned(
    filterAISReports(state.AISReports, state.AISReportsFilter)
  );

  return (
    <ul className="space-y-2 overflow-scroll scrollbar-hide">
      {AISReports.map((AISReport) => (
        <AISReportListItem
          key={AISReport.MMSI}
          {...AISReport}
        />
      ))}
    </ul>
  );
};

export default AISReportList;
