import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AISMapContext = createContext(null);

const useAISMapContext = () => {
  return useContext(AISMapContext);
};

const initialState = {
  attributes: {
    mapboxAccessToken: import.meta.env.VITE_MAPBOX_API_KEY,
    mapStyle: import.meta.env.VITE_MAPBOX_STYLE_URL,
    style: { width: '100%', height: '100%' },
    attributionControl: false,
    interactive: false,
    minPitch: 0,
    maxPitch: 0,
    minZoom: 11,
    maxZoom: 13,
  },
  BoundingBoxes: null,
  delta: {
    pan: 0.1,
    zoom: 1,
  },
  viewState: {
    latitude: 55.97457945987327,
    longitude: -4.8194054976762,
    zoom: 11,
  },
  isLocked: false,
  ref: null,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setBoundingBoxes': {
      return {
        ...state,
        BoundingBoxes: payload,
      };
    }
    case 'setRef': {
      return {
        ...state,
        ref: payload,
      };
    }
    case 'setViewState': {
      return {
        ...state,
        delta: {
          ...state.delta,
          pan: { 11: 0.1, 12: 0.05, 13: 0.025 }[payload.zoom],
        },
        viewState: {
          ...payload,
        },
      };
    }
    case 'toggleIsLocked': {
      return {
        ...state,
        isLocked: !state.isLocked,
      };
    }
    default: {
      return state;
    }
  }
};

const AISMapContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AISMapContext.Provider value={{ dispatch, state }}>{children}</AISMapContext.Provider>;
};

AISMapContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export { AISMapContextProvider, useAISMapContext };
