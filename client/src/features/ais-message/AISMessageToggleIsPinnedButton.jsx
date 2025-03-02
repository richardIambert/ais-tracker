import { FaLocationDot } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { useAISMessageContext } from '.';

const AISMessageToggleIsPinnedButton = ({ isPinned, MMSI }) => {
  const AISMessageCtx = useAISMessageContext();

  const onClick = () => {
    AISMessageCtx.dispatch({
      type: 'toggleIsMessagePinned',
      payload: { MMSI, isPinned: !isPinned },
    });
  };

  return (
    <button
      className={`size-10 flex items-center justify-center border-2 border-orange-500 rounded-lg cursor-pointer ${
        isPinned ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'
      }`}
      title={isPinned ? 'Unpin AIS Message' : 'Pin AIS Message'}
      onClick={onClick}
    >
      <FaLocationDot />
    </button>
  );
};

AISMessageToggleIsPinnedButton.propTypes = {
  isPinned: PropTypes.bool.isRequired,
  MMSI: PropTypes.string.isRequired,
};

export default AISMessageToggleIsPinnedButton;
