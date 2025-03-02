import {
  AISMessageListItemButtons,
  AISMessageListItemPill,
  AISMessageListItemPills,
  AISMessageToggleIsPinnedButton,
} from '.';
import {
  formatCOG,
  formatHDG,
  formatPosition,
  formatSOG,
} from '../../utilities';
import PropTypes from 'prop-types';

const AISMessageListItem = ({ message }) => {
  const { COG, HDG, isPinned, latitude, longitude, MMSI, name, SOG, type } =
    message;

  return (
    <li className="relative p-4 space-y-2 rounded-lg bg-grey-200 text-grey-400">
      <AISMessageListItemButtons>
        <AISMessageToggleIsPinnedButton
          isPinned={isPinned}
          MMSI={MMSI}
        />
      </AISMessageListItemButtons>
      <div className="text-sm">
        <p>{type}</p>
      </div>
      <div className="font-semibold">
        <h3 className="text-xl text-grey-500">{name}</h3>
        <p>{MMSI}</p>
      </div>
      <AISMessageListItemPills>
        <AISMessageListItemPill>
          LAT: {formatPosition(latitude)}
        </AISMessageListItemPill>
        <AISMessageListItemPill>
          LNG: {formatPosition(longitude)}
        </AISMessageListItemPill>
        <AISMessageListItemPill>SOG: {formatSOG(SOG)}</AISMessageListItemPill>
        <AISMessageListItemPill>COG: {formatCOG(COG)}</AISMessageListItemPill>
        <AISMessageListItemPill>HDG: {formatHDG(HDG)}</AISMessageListItemPill>
      </AISMessageListItemPills>
    </li>
  );
};

AISMessageListItem.propTypes = {
  message: PropTypes.shape({
    COG: PropTypes.number,
    HDG: PropTypes.number,
    isPinned: PropTypes.bool.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    MMSI: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    SOG: PropTypes.number,
    type: PropTypes.oneOf([
      'AidsToNavigationMessage',
      'PositionMessage',
      'StandardClassBPositionMessage',
    ]),
  }),
};

export default AISMessageListItem;
