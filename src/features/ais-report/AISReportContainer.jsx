import AISReportFilter from './AISReportFilter';
import AISReportList from './AISReportList';

const AISReportContainer = () => {
  return (
    <div className="gap-2 grid grid-rows-[auto_1fr] overflow-hidden">
      <AISReportFilter />
      <AISReportList />
    </div>
  );
};

export default AISReportContainer;
