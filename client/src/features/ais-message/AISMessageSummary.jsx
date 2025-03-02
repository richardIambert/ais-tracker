import { CornerHack } from '../../components';
import PropTypes from 'prop-types';

const AISMessagesSummary = ({ children }) => {
  return (
    <div className="absolute bg-white bottom-0 flex gap-2 left-0 lg:bottom-auto lg:pb-2 lg:pt-0 lg:rounded-br-lg lg:rounded-tr-none lg:top-0 pr-2 pt-2 rounded-tr-lg z-10">
      <CornerHack
        className="bottom-0 right-0 translate-x-full -rotate-90 lg:rotate-0 lg:bottom-auto lg:top-0"
        type="top-left"
      />
      {children}
      <CornerHack
        className="left-0 lg:bottom-0 lg:rotate-0 lg:top-auto lg:translate-y-full -rotate-90 top-0 -translate-y-full"
        type="top-left"
      />
    </div>
  );
};

AISMessagesSummary.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMessagesSummary;
