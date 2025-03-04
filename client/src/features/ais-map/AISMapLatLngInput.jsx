import { CornerHack } from '../../components';
import { FaLocationArrow } from 'react-icons/fa6';
import { formatPosition } from '../../utilities';
import { useAISMapContext } from '.';
import { useEffect, useState } from 'react';

const AISLatLngInput = () => {
  const AISMapCtx = useAISMapContext();

  const [isVisible, setIsVisible] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const { latitude, longitude } = AISMapCtx.state.viewState;
    setLatitude(formatPosition(latitude, 6));
    setLongitude(formatPosition(longitude, 6));
  }, [AISMapCtx.state.viewState]);

  useEffect(() => {
    if (AISMapCtx.state.isLocked) {
      setIsVisible(false);
    }
  }, [AISMapCtx.state.isLocked]);

  const onClick = () => {
    if (isVisible) {
      const { latitude: currentLatitude, longitude: currentLongitude } =
        AISMapCtx.state.viewState;
      const isLatitudeValid =
        !isNaN(latitude) && Number(latitude) >= -90 && Number(latitude) <= 90;
      const isLongitudeValid =
        !isNaN(longitude) &&
        Number(longitude) >= -180 &&
        Number(longitude) <= 180;
      if (isLatitudeValid && isLongitudeValid) {
        const positionChanged =
          Number(latitude) !== Number(formatPosition(currentLatitude, 6)) ||
          Number(longitude) !== Number(formatPosition(currentLongitude, 6));
        if (positionChanged) {
          AISMapCtx.state.ref.panTo([longitude, latitude], { duration: 2000 });
        }
      }
    }
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      {!AISMapCtx.state.isLocked && isVisible && (
        <div className="absolute bg-white gap-2 grid grid-cols-2 p-2 pr-0 right-full rounded-l-lg top-0 -translate-x-2 -translate-y-2 w-100">
          <CornerHack
            className="right-0 top-0 -translate-y-full"
            type="bottom-right"
          />
          <div className="bg-grey-200 flex gap-2 h-10 overflow-hidden rounded-lg text-grey-400">
            <span className="font-semibold p-2 text-sm">LAT</span>
            <input
              type="text"
              placeholder="55.9746"
              className="grow outline-none p-2"
              value={latitude}
              onChange={(event) => setLatitude(event.target.value)}
            />
          </div>
          <div className="bg-grey-200 flex gap-2 h-10 overflow-hidden rounded-lg text-grey-400">
            <span className="font-semibold p-2 text-sm">LNG</span>
            <input
              type="text"
              placeholder="-4.8194"
              className="grow outline-none p-2"
              value={longitude}
              onChange={(event) => setLongitude(event.target.value)}
            />
          </div>
          <CornerHack
            className="bottom-0 right-0 translate-y-full"
            type="top-right"
          />
        </div>
      )}
      <button
        className={`bg-grey-200 flex items-center justify-center rounded-lg size-10 text-grey-500 ${
          AISMapCtx.state.isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        title="Set Position"
        disabled={AISMapCtx.state.isLocked}
        onClick={onClick}
      >
        <FaLocationArrow className="pointer-events-none" />
      </button>
    </div>
  );
};

export default AISLatLngInput;
