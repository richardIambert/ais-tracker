import PropTypes from 'prop-types';

const Pill = ({ children, className = '' }) => {
  return (
    <span
      className={`bg-white font-bold px-2 py-1 rounded-full text-grey-400 text-xs uppercase ${className}`}
    >
      {children}
    </span>
  );
};

Pill.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
  className: PropTypes.string,
};

export default Pill;
