import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';
import { useAppContext } from '../app';
import { useCallback } from 'react';

const AISReportFilter = () => {
  const { state, dispatch } = useAppContext();
  const { AISReportsFilter } = state;

  const handleChange = useCallback(
    (event) => {
      dispatch({
        type: 'updateAISReportsFilter',
        payload: event.target.value.trim(),
      });
    },
    [dispatch]
  );

  const handleClick = useCallback(() => {
    dispatch({ type: 'updateAISReportsFilter', payload: '' });
  }, [dispatch]);

  return (
    <div className="relative text-grey-400">
      <FaMagnifyingGlass className="absolute left-2 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search AIS reports"
        className="bg-grey-200 h-10 outline-none pl-8 py-2 rounded-lg w-full"
        value={AISReportsFilter}
        onChange={handleChange}
      />
      <button
        className={`absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 ${
          AISReportsFilter.length ? '' : 'hidden'
        }`}
        onClick={handleClick}
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default AISReportFilter;
