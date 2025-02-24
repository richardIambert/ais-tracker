import Map from 'react-map-gl/mapbox';
import PropTypes from 'prop-types';
import { useAppContext } from '../app';
import { useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const AISMap = ({ children }) => {
  const { state, dispatch } = useAppContext();

  const onMove = useCallback(
    ({ viewState }) => {
      dispatch({ type: 'updateMapViewState', payload: viewState });
    },
    [dispatch]
  );

  return (
    <Map
      {...state.mapViewState}
      {...state.mapAttributes}
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
