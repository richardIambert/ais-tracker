import PropTypes from 'prop-types';
import cornerHackBottomLeft from '../assets/corner-hack-bottom-left.svg';
import cornerHackBottomRight from '../assets/corner-hack-bottom-right.svg';
import cornerHackTopLeft from '../assets/corner-hack-top-left.svg';
import cornerHackTopRight from '../assets/corner-hack-top-right.svg';

const CornerHack = ({ className, type }) => {
  const types = {
    'bottom-left': cornerHackBottomLeft,
    'bottom-right': cornerHackBottomRight,
    'top-left': cornerHackTopLeft,
    'top-right': cornerHackTopRight,
  };

  return (
    <img
      className={`absolute size-2 ${className}`}
      src={types[type]}
    />
  );
};

CornerHack.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf([
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ]),
};

export default CornerHack;
