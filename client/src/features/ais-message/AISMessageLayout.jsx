import { AISMessageFilter, AISMessageList } from '.';

const AISMessageLayout = () => {
  return (
    <div className="gap-2 grid grid-rows-[auto_1fr] lg:order-1 order-2 overflow-hidden">
      <AISMessageFilter />
      <AISMessageList />
    </div>
  );
};

export default AISMessageLayout;
