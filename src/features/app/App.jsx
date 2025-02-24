import { AISMapContainer } from '../ais-map';
import { AISReportContainer } from '../ais-report';

const App = () => {
  return (
    <div className="h-screen p-2 grid gap-2 grid-cols-[500px_1fr]">
      <AISReportContainer />
      <AISMapContainer />
    </div>
  );
};

export default App;
