import { CornerHack } from '../../components';
import PropTypes from 'prop-types';

const AISMessageListItemButtons = ({ children }) => {
  return (
    <div className="absolute top-0 right-0 pl-2 pb-2 rounded-bl-lg bg-white">
      <CornerHack
        className="top-0 left-0 -translate-x-full"
        type="top-right"
      />
      {children}
      <CornerHack
        className="bottom-0 right-0 translate-y-full"
        type="top-right"
      />
    </div>
  );
};

AISMessageListItemButtons.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMessageListItemButtons;
