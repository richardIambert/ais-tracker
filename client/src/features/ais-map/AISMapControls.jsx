import { CornerHack } from '../../components';
import PropTypes from 'prop-types';

const AISMapControls = ({ children }) => {
  return (
    <div className="p-2 pr-0 absolute z-10 right-0 top-1/2 -translate-y-1/2 grid gap-2 rounded-l-lg bg-white">
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
