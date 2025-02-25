import { AISReportMarker } from '../ais-report';
import Map from 'react-map-gl/mapbox';
import { useAppContext } from '../app';
import { useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const AISMap = () => {
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
      {state.AISReports.map((AISReport) => (
        <AISReportMarker
          key={AISReport.MMSI}
          report={AISReport}
        />
      ))}
    </Map>
  );
};

export default AISMap;
