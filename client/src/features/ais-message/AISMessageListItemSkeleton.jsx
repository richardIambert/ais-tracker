import { CornerHack } from '../../components';

const AISMessageListItemSkeleton = () => {
  return (
    <li className="animate-pulse relative p-4 space-y-4 rounded-lg bg-grey-200">
      <div className="absolute top-0 right-0 pl-2 pb-2 rounded-bl-lg bg-white">
        <CornerHack
          className="left-0 top-0 -translate-x-full"
          type="top-right"
        />
        <div className="bg-grey-200 rounded-lg size-10"></div>
        <CornerHack
          className="bottom-0 right-0 translate-y-full"
          type="top-right"
        />
      </div>
      <div className="bg-white h-4 rounded-full w-48"></div>
      <div className="space-y-2">
        <div className="bg-white h-6 rounded-full w-56"></div>
        <div className="bg-white h-4 rounded-full w-24"></div>
      </div>
      <div className="flex gap-1 items-center justify-end">
        <div className="bg-white h-6 rounded-full w-12"></div>
        <div className="bg-white h-6 rounded-full w-12"></div>
        <div className="bg-white h-6 rounded-full w-12"></div>
        <div className="bg-white h-6 rounded-full w-12"></div>
      </div>
    </li>
  );
};

export default AISMessageListItemSkeleton;
