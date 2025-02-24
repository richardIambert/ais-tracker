import PropTypes from 'prop-types';
import { useAppContext } from '../app';
import { useCallback } from 'react';

const AISMapControl = ({ children, className = '', ...rest }) => {
  const { dispatch } = useAppContext();

  const handleClick = useCallback(
    (event) => {
      dispatch({ type: event.target.dataset.action });
    },
    [dispatch]
  );

  return (
    <button
      className={`bg-grey-200 flex items-center justify-center rounded-lg size-10 text-grey-500 ${className}`}
      onClick={handleClick}
      {...rest}
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
