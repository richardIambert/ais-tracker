import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

// AppContext
const AppContext = createContext(null);

// useAppContext hook
const useAppContext = () => {
  return useContext(AppContext);
};

// Setup initial app state
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
  AISReportsFilter: '',
  AISReports: [],
  webSocket: null,
  webSocketSubscription: {
    boundingBoxes: [],
    filterMessageTypes: ['PositionReport'],
    filterShipMMSI: [],
  },
};

// Setup reducer function
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'lockMap': {
      return {
        ...state,
        isMapLocked: true,
      };
    }
    case 'unlockMap': {
      return {
        ...state,
        isMapLocked: false,
      };
    }
    case 'updateMapViewState': {
      return {
        ...state,
        mapViewState: {
          ...payload,
        },
      };
    }
    case 'panMapUp': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          latitude: state.mapViewState.latitude + 0.05,
        },
      };
    }
    case 'panMapDown': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          latitude: state.mapViewState.latitude - 0.05,
        },
      };
    }
    case 'panMapLeft': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          longitude: state.mapViewState.longitude - 0.05,
        },
      };
    }
    case 'panMapRight': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          longitude: state.mapViewState.longitude + 0.05,
        },
      };
    }
    case 'zoomMapIn': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          zoom: state.mapViewState.zoom + 0.5,
        },
      };
    }
    case 'zoomMapOut': {
      return {
        ...state,
        mapViewState: {
          ...state.mapViewState,
          zoom: state.mapViewState.zoom - 0.5,
        },
      };
    }
    case 'updateAISReports': {
      const existingAISReport = state.AISReports.find(
        (AISReport) => AISReport.MMSI === payload.MMSI
      );
      if (existingAISReport) {
        return {
          ...state,
          AISReports: state.AISReports.map((AISReport) =>
            AISReport.MMSI === payload.MMSI
              ? { ...AISReport, ...payload, isPinned: AISReport.isPinned || false }
              : AISReport
          ),
        };
      } else {
        return {
          ...state,
          AISReports: [{ ...payload }, ...state.AISReports],
        };
      }
    }
    case 'updateAISReportsFilter': {
      return {
        ...state,
        AISReportsFilter: payload,
      };
    }
    case 'toggleIsAISReportPinned': {
      return {
        ...state,
        AISReports: [
          ...state.AISReports.map((AISReport) =>
            AISReport.MMSI === payload.MMSI
              ? { ...AISReport, isPinned: !AISReport.isPinned }
              : AISReport
          ),
        ],
      };
    }
    case 'initialiseWebSocket': {
      return {
        ...state,
        webSocket: payload.webSocket,
      };
    }
    case 'updateWebSocketSubscription': {
      return {
        ...state,
        webSocketSubscription: {
          ...state.webSocketSubscription,
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// AppContextProvider wrapper
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const webSocket = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);
    dispatch({ type: 'initialiseWebSocket', payload: { webSocket } });

    webSocket.addEventListener('open', () => {
      console.log(`WebSocket connection opened: client <-> ${import.meta.env.VITE_WEB_SOCKET_URL}`);
    });

    webSocket.addEventListener('message', (message) => {
      const { MessageType: type, Message, MetaData } = JSON.parse(message.data);
      const {
        Cog: COG,
        Latitude: latitude,
        Longitude: longitude,
        Sog: SOG,
        TrueHeading: HDG,
      } = Message[type];
      const { MMSI, ShipName: name, time_utc: timestamp } = MetaData;
      dispatch({
        type: 'updateAISReports',
        payload: {
          COG,
          HDG,
          isPinned: false,
          latitude,
          longitude,
          MMSI,
          name,
          SOG,
          timestamp,
          type,
        },
      });
    });

    webSocket.addEventListener('close', ({ code }) => {
      console.log(
        `WebSocket connection closed: client <-X-> ${import.meta.env.VITE_WEB_SOCKET_URL}: ${code}`
      );
    });

    webSocket.addEventListener('error', (error) => {
      console.log(
        `WebSocket connection error: client <-X-> ${import.meta.env.VITE_WEB_SOCKET_URL}: ${error}`
      );
    });

    return () => {
      webSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (state.webSocket && state.webSocket.readyState === 1) {
      state.webSocket.send(JSON.stringify(state.webSocketSubscription));
    }
  }, [state.webSocket, state.webSocketSubscription]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export { AppContextProvider, useAppContext };
