import PropTypes from 'prop-types';

const AISMessageListItemPill = ({ children }) => {
  return (
    <span className="bg-white font-bold px-2 py-1 rounded-full text-grey-400 text-xs uppercase">
      {children}
    </span>
  );
};

AISMessageListItemPill.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMessageListItemPill;
