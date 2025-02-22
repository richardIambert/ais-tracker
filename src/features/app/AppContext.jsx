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
  isMapLocked: false,
  mapAttributes: {
    mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    mapStyle: import.meta.env.VITE_MAPBOX_STYLE,
    style: { width: '100%', height: '100%' },
    interactive: false,
    minPitch: 0,
    maxPitch: 0,
    minZoom: 10,
    maxZoom: 16,
  },
  mapViewState: {
    latitude: 55.97457945987327,
    longitude: -4.8194054976762,
    zoom: 11,
  },
};

// Setup reducer funtion
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'lockMap':
      return {
        ...state,
        isMapLocked: true,
      };
    case 'unlockMap':
      return {
        ...state,
        isMapLocked: false,
      };
    case 'updateMapViewState':
      return {
        ...state,
        mapViewState: {
          ...payload,
        },
      };
    case 'panMapUp':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          latitude: state.mapViewState.latitude + 0.05,
        },
      };
    case 'panMapDown':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          latitude: state.mapViewState.latitude - 0.05,
        },
      };
    case 'panMapLeft':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          longitude: state.mapViewState.longitude - 0.05,
        },
      };
    case 'panMapRight':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          longitude: state.mapViewState.longitude + 0.05,
        },
      };
    case 'zoomMapIn':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          zoom: state.mapViewState.zoom + 0.5,
        },
      };
    case 'zoomMapOut':
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          zoom: state.mapViewState.zoom - 0.5,
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

export { AppContextProvider, useAppContext };
