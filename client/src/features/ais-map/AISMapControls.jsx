import { CornerHack } from '../../components';
import PropTypes from 'prop-types';

const AISMapControls = ({ children }) => {
  return (
    <div className="absolute bg-white gap-2 grid p-2 pr-0 right-0 rounded-l-lg top-1/2 -translate-y-1/2 z-10">
      <CornerHack
        className="top-0 right-0 -translate-y-full"
        type="bottom-right"
      />
      {children}
      <CornerHack
        className="bottom-0 right-0 translate-y-full"
        type="top-right"
      />
    </div>
  );
};

AISMapControls.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMapControls;
