import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <div className="h-screen p-2 grid gap-2 grid-rows-[1fr_200px] lg:grid-cols-[500px_1fr] lg:grid-rows-none">
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AppLayout;
