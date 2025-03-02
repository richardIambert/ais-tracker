import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';
import { useAISMessageContext } from '.';

const AISMessageFilter = () => {
  const AISMessageCtx = useAISMessageContext();

  const handleChange = (event) => {
    AISMessageCtx.dispatch({
      type: 'setSearchTerm',
      payload: event.target.value.trim(),
    });
  };

  const handleClick = () => {
    AISMessageCtx.dispatch({ type: 'setSearchTerm', payload: '' });
  };

  return (
    <div className="relative text-grey-400">
      <FaMagnifyingGlass className="absolute left-2 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        className="bg-grey-200 h-10 outline-none pl-8 py-2 rounded-lg w-full"
        placeholder="Search AIS Messages"
        value={AISMessageCtx.state.searchTerm}
        onChange={handleChange}
      />
      <button
        className={`absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 ${
          AISMessageCtx.state.searchTerm.length ? '' : 'hidden'
        }`}
        onClick={handleClick}
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default AISMessageFilter;
