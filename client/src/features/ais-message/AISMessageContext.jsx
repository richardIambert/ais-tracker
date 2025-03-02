import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AISMessageContext = createContext(null);

const useAISMessageContext = () => {
  return useContext(AISMessageContext);
};

const initialState = {
  messages: [],
  searchTerm: '',
  FilterMessageTypes: ['PositionReport'],
  FiltersShipMMSI: [],
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'addOrReplaceMessage': {
      const existingMessage = state.messages.find((message) => message.MMSI === payload.MMSI);
      if (existingMessage) {
        return {
          ...state,
          messages: state.messages.map((message) =>
            message.MMSI === payload.MMSI
              ? { ...message, ...payload, isPinned: message.isPinned || false }
              : message
          ),
        };
      } else {
        return {
          ...state,
          messages: [payload, ...state.messages],
        };
      }
    }
    case 'removeOutOfBoundsMessages': {
      const [sw, ne] = payload;
      const [swLat, swLng] = sw;
      const [neLat, neLng] = ne;
      return {
        ...state,
        messages: state.messages.filter(
          (message) =>
            message.latitude >= swLat &&
            message.latitude <= neLat &&
            message.longitude >= swLng &&
            message.longitude <= neLng
        ),
      };
    }
    case 'setSearchTerm': {
      return {
        ...state,
        searchTerm: payload,
      };
    }
    case 'toggleIsMessagePinned': {
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.MMSI === payload.MMSI ? { ...message, isPinned: payload.isPinned } : message
        ),
      };
    }
    default: {
      return state;
    }
  }
};

const AISMessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AISMessageContext.Provider value={{ dispatch, state }}>{children}</AISMessageContext.Provider>
  );
};

AISMessageContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export { AISMessageContextProvider, useAISMessageContext };
