import PropTypes from 'prop-types';

const Pills = ({ children, className = '' }) => {
  return <div className={`flex gap-1 items-center justify-end ${className}`}>{children}</div>;
};

Pills.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
  className: PropTypes.string,
};

export default Pills;
