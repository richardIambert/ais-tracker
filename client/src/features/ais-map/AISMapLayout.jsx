import {
  AISMap,
  AISMapControls,
  AISMapLatLngInput,
  AISMapMovementControl,
  AISMapToggleLockControl,
} from '.';
import { AISMessageSummary, AISMessageSummaryItem, useAISMessageContext } from '../ais-message';
import {
  FaCaretDown,
  FaCaretLeft,
  FaCaretRight,
  FaCaretUp,
  FaLocationDot,
  FaMinus,
  FaPlus,
  FaTowerBroadcast,
} from 'react-icons/fa6';

const AISMapLayout = () => {
  const AISMessageCtx = useAISMessageContext();

  const recievedAISMessageCount = AISMessageCtx.state.messages.length;
  const receivedAISMessagesTitle = `${recievedAISMessageCount} AIS ${
    recievedAISMessageCount === 1 ? 'message' : 'messages'
  } recieved`;

  const pinnedAISMessageCount = AISMessageCtx.state.messages.filter(
    ({ isPinned }) => isPinned
  ).length;
  const pinnedAISMessagesTitle = `${pinnedAISMessageCount} AIS ${
    pinnedAISMessageCount === 1 ? 'message' : 'messages'
  } pinned`;

  return (
    <div className="h-full lg:order-2 order-1 overflow-hidden relative rounded-lg w-full">
      <AISMessageSummary>
        <AISMessageSummaryItem title={receivedAISMessagesTitle}>
          <FaTowerBroadcast />
          {recievedAISMessageCount}
        </AISMessageSummaryItem>
        <AISMessageSummaryItem title={pinnedAISMessagesTitle}>
          <FaLocationDot />
          {pinnedAISMessageCount}
        </AISMessageSummaryItem>
      </AISMessageSummary>
      <AISMapControls>
        <AISMapMovementControl
          title="Pan Up"
          data-action="pan-up"
        >
          <FaCaretUp className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapMovementControl
          title="Pan Left"
          data-action="pan-left"
        >
          <FaCaretLeft className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapMovementControl
          title="Pan Right"
          data-action="pan-right"
        >
          <FaCaretRight className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapMovementControl
          data-action="pan-down"
          title="Pan Down"
        >
          <FaCaretDown className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapMovementControl
          data-action="zoom-in"
          title="Zoom In"
        >
          <FaPlus className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapMovementControl
          data-action="zoom-out"
          title="Zoom Out"
        >
          <FaMinus className="pointer-events-none" />
        </AISMapMovementControl>
        <AISMapLatLngInput />
        <AISMapToggleLockControl />
      </AISMapControls>
      <AISMap />
    </div>
  );
};

export default AISMapLayout;
