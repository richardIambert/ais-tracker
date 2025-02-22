import AISMap from './AISMap';
import AISMapControls from './AISMapControls';

const AISMapContainer = () => {
  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <AISMapControls />
      <AISMap />
    </div>
  );
};

export default AISMapContainer;
