import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// AppContext
const AppContext = createContext(null);

// useAppContext hook
const useAppContext = () => {
  return useContext(AppContext);
};

// Setup inital app state
const initialState = {
  mapAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  mapStyle: import.meta.env.VITE_MAPBOX_STYLE,
  mapViewState: {
    latitude: 55.97457945987327,
    longitude: -4.8194054976762,
    zoom: 11,
  },
};

// Setup reducer funtion
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'updateMapViewState':
      return {
        ...state,
        mapViewState: {
          ...payload,
        },
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
