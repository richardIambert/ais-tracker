import cornerHackTopRight from '../../assets/corner-hack-top-right.svg';
import { FaLocationDot } from 'react-icons/fa6';
import { formatCOG, formatHDG, formatPosition, formatSOG } from '../../utilities';
import { Pill, Pills } from '../../components';
import PropTypes from 'prop-types';
import { useAppContext } from '../app/AppContext';
import { useCallback } from 'react';

const AISReportListItem = ({ COG, HDG, isPinned, latitude, longitude, MMSI, name, SOG, type }) => {
  const { dispatch } = useAppContext();

  const handleClick = useCallback(() => {
    dispatch({ type: 'toggleIsAISReportPinned', payload: { MMSI } });
  }, [dispatch, MMSI]);

  return (
    <li className="relative p-4 space-y-2 rounded-lg bg-grey-200 text-grey-400">
      <div className="absolute top-0 right-0 pl-2 pb-2 rounded-bl-lg bg-white">
        <img
          src={cornerHackTopRight}
          className="size-2 absolute top-0 left-0 -translate-x-full"
        />
        <button
          className={`size-10 flex items-center justify-center border-2 border-orange-500 rounded-lg cursor-pointer ${
            isPinned ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
          }`}
          title={isPinned ? 'Unpin AIS report' : 'Pin AIS report'}
          onClick={handleClick}
        >
          <FaLocationDot />
        </button>
        <img
          src={cornerHackTopRight}
          className="size-2 absolute bottom-0 right-0 translate-y-full"
        />
      </div>
      <div className="text-sm">
        <p>{type}</p>
      </div>
      <div className="font-semibold">
        <h3 className="text-xl text-grey-500">{name}</h3>
        <p>{MMSI}</p>
      </div>
      <Pills>
        <Pill>LAT: {formatPosition(latitude)}</Pill>
        <Pill>LNG: {formatPosition(longitude)}</Pill>
        <Pill>SOG: {formatSOG(SOG)}</Pill>
        <Pill>COG: {formatCOG(COG)}</Pill>
        <Pill>HDG: {formatHDG(HDG)}</Pill>
      </Pills>
    </li>
  );
};

AISReportListItem.propTypes = {
  COG: PropTypes.number,
  HDG: PropTypes.number,
  isPinned: PropTypes.bool.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  MMSI: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  SOG: PropTypes.number,
  type: PropTypes.oneOf([
    'AidsToNavigationReport',
    'PositionReport',
    'StandardClassBPositionReport',
  ]),
};

export default AISReportListItem;
