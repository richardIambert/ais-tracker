import PropTypes from 'prop-types';
import { useAppContext } from '../app';
import { useCallback } from 'react';

const AISMapControl = ({ className = '', children, ...rest }) => {
  const { dispatch } = useAppContext();

  const handleClick = useCallback((event) => {
    dispatch({ type: event.target.dataset.action });
  }, []);

  return (
    <button
      className={`size-10 flex items-center justify-center rounded-lg bg-grey-300 text-grey-500 ${className}`}
      {...rest}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

AISMapControl.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMapControl;
