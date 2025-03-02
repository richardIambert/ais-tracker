import { FaLock, FaLockOpen } from 'react-icons/fa6';
import { useAISMapContext } from './AISMapContext';

const AISToggleLockControl = () => {
  const AISMapCtx = useAISMapContext();

  const onClick = () => {
    AISMapCtx.dispatch({ type: 'toggleIsLocked' });
  };

  return (
    <button
      className="bg-grey-200 cursor-pointer flex items-center justify-center rounded-lg size-10 text-grey-500"
      onClick={onClick}
    >
      {AISMapCtx.state.isLocked ? (
        <FaLock className="pointer-events-none" />
      ) : (
        <FaLockOpen className="pointer-events-none" />
      )}
    </button>
  );
};

export default AISToggleLockControl;
