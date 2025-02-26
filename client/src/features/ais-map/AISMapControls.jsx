import AISMapControl from './AISMapControl';
import cornerHackBottomRight from '../../assets/corner-hack-bottom-right.svg';
import cornerHackTopRight from '../../assets/corner-hack-top-right.svg';
import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
  FaLock,
  FaLockOpen,
  FaMinus,
  FaPlus,
} from 'react-icons/fa6';
import { useAppContext } from '../app/AppContext';

const AISMapControls = () => {
  const {
    state: { isMapLocked },
  } = useAppContext();

  return (
    <div className="p-2 pr-0 absolute z-10 right-0 top-1/2 -translate-y-1/2 grid gap-2 rounded-l-lg bg-white">
      <img
        src={cornerHackBottomRight}
        className="size-2 absolute top-0 right-0 -translate-y-full"
      />
      <AISMapControl
        title="Pan Up"
        data-action="panMapUp"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaCaretUp className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        title="Pan Left"
        data-action="panMapLeft"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaCaretLeft className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        title="Pan Right"
        data-action="panMapRight"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaCaretRight className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        data-action="panMapDown"
        title="Pan Down"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaCaretDown className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        data-action="zoomMapIn"
        title="Zoom In"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaPlus className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        data-action="zoomMapOut"
        title="Zoom Out"
        disabled={isMapLocked}
        className={isMapLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        <FaMinus className="pointer-events-none" />
      </AISMapControl>
      <AISMapControl
        title={isMapLocked ? 'Unlock Map' : 'Lock Map'}
        data-action={isMapLocked ? 'unlockMap' : 'lockMap'}
        className="cursor-pointer"
      >
        {isMapLocked ? (
          <FaLock className="pointer-events-none" />
        ) : (
          <FaLockOpen className="pointer-events-none" />
        )}
      </AISMapControl>
      <img
        src={cornerHackTopRight}
        className="size-2 absolute bottom-0 right-0 translate-y-full"
      />
    </div>
  );
};

export default AISMapControls;
