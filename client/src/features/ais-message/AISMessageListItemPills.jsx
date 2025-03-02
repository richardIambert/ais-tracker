import PropTypes from 'prop-types';

const AISMessageListItemPills = ({ children }) => {
  return <div className="flex gap-1 items-center justify-end">{children}</div>;
};

AISMessageListItemPills.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMessageListItemPills;
