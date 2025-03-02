import {
  AISMessageListItem,
  AISMessageListItemSkeleton,
  useAISMessageContext,
} from '.';
import { filterAISMessages } from '../../utilities';

const AISMessageList = () => {
  const AISMessageCtx = useAISMessageContext();

  if (AISMessageCtx.state.messages.length === 0) {
    return (
      <ul className="space-y-2 overflow-scroll scrollbar-hide">
        <AISMessageListItemSkeleton />
        <AISMessageListItemSkeleton />
        <AISMessageListItemSkeleton />
        <AISMessageListItemSkeleton />
        <AISMessageListItemSkeleton />
      </ul>
    );
  }

  const searchTerm = AISMessageCtx.state.searchTerm;
  const allMessages = filterAISMessages(
    AISMessageCtx.state.messages,
    searchTerm
  );
  const pinnedMessages = allMessages.filter(({ isPinned }) => isPinned);
  const unpinnedMessages = allMessages.filter(({ isPinned }) => !isPinned);
  const sortedMessages = [...pinnedMessages, ...unpinnedMessages];

  return (
    <ul className="space-y-2 overflow-scroll scrollbar-hide">
      {sortedMessages.map((message) => (
        <AISMessageListItem
          key={message.MMSI}
          message={message}
        />
      ))}
    </ul>
  );
};

export default AISMessageList;
