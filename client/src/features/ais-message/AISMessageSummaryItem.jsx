import PropTypes from 'prop-types';

const AISMessageSummaryItem = ({ children, title }) => {
  return (
    <span
      className="bg-grey-200 cursor-help flex gap-2 h-10 items-center px-4 py-2 rounded-lg text-grey-500"
      title={title}
    >
      {children}
    </span>
  );
};

AISMessageSummaryItem.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
  title: PropTypes.string,
};

export default AISMessageSummaryItem;
