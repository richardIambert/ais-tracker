import Map from 'react-map-gl/mapbox';
import PropTypes from 'prop-types';
import { useAppContext } from './AppContext';
import { useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const AISMap = ({ children }) => {
  const { state, dispatch } = useAppContext();

  const onMove = useCallback(({ viewState }) => {
    console.log(viewState);
    dispatch({ type: 'updateMapViewState', payload: viewState });
  }, []);

  return (
    <Map
      mapboxAccessToken={state.mapAccessToken}
      mapStyle={state.mapStyle}
      style={{ width: '100%', height: '100%' }}
      {...state.mapViewState}
      onMove={onMove}
    >
      {children}
    </Map>
  );
};

AISMap.propTypes = {
  children: PropTypes.arrayOf(PropTypes.elementType),
};

export default AISMap;
