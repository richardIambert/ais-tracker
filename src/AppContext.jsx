import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';

// AppContext
const AppContext = createContext(null);

// useAppContext hook
const useAppContext = () => {
  return useContext(AppContext);
};

// Setup inital app state
const initialState = {
  test: false,
};

// Setup reducer funtion
const reducer = (state, action) => {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: !state.test,
      };
    default:
      return state;
  }
};

// AppContextProvider wrapper
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

// Declare prop types for AppContextProvider
AppContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export { AppContextProvider as default, useAppContext };
