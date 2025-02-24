import AISMap from './AISMap';
import AISMapControls from './AISMapControls';
import { AISReportStatistics } from '../ais-report';

const AISMapContainer = () => {
  return (
    <div className="h-full overflow-hidden relative rounded-lg w-full">
      <AISReportStatistics />
      <AISMapControls />
      <AISMap />
    </div>
  );
};

export default AISMapContainer;
