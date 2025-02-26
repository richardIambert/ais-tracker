import { AISMapContainer } from '../ais-map';
import { AISReportContainer } from '../ais-report';

const App = () => {
  return (
    <div className="h-screen p-2 grid gap-2 grid-rows-[1fr_200px] lg:grid-cols-[500px_1fr] lg:grid-rows-none">
      <AISMapContainer className="order-1 lg:order-2" />
      <AISReportContainer className="order-2 lg:order-1" />
    </div>
  );
};

export default App;
