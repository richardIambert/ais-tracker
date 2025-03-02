import { AISMapLayout } from '../ais-map';
import { AISMessageLayout } from '../ais-message';
import AppLayout from './AppLayout';

const App = () => {
  return (
    <AppLayout>
      <AISMapLayout />
      <AISMessageLayout />
    </AppLayout>
  );
};

export default App;
