import React, { useEffect, useState } from 'react';
import {ECMWFStation,selectModel} from './StationLocation'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const minimapStyle: React.CSSProperties = {
  width: 300,
  height: 200,
  position: 'relative',
};

const positions = ECMWFStation

interface MapButtonsProps {
  
  positions: typeof positions;
  onLabelSelect: (label: string) => void;
}

const MapButtons: React.FC<MapButtonsProps> = ({ positions, onLabelSelect }) => {
  const map = useMap();
  const [buttonPositions, setButtonPositions] = useState<{ left: number; top: number }[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = positions.map(pos => {
        const point = map.latLngToContainerPoint([pos.lat, pos.lng]);
        return { left: point.x, top: point.y };
      });
      setButtonPositions(newPositions);
    };

    updatePositions();

    map.on('move', updatePositions);
    map.on('zoom', updatePositions);

    return () => {
      map.off('move', updatePositions);
      map.off('zoom', updatePositions);
    };
  }, [map, positions]);

  return (
    <>
      {buttonPositions.map((pos, idx) => {
        // Check if the position exists
        const position = positions[idx];
        if (!position) {
          console.warn(`Position at index ${idx} is undefined.`);
          return null; // Skip rendering if undefined
        }

        return (
          <button
            key={idx}
            style={{
              position: 'absolute',
              left: pos.left - 15,
              top: pos.top - 15,
              zIndex: 1000,
              width: '25px',
              height: '25px',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              userSelect: 'none',
            }}
            onClick={() => onLabelSelect(`${position.value}`)}
            title={`Click to select station ${position.label}`}
            type="button"
          >
            {position.label}
          </button>
        );
      })}
    </>
  );
};

interface MiniMapProps {
  model:string
  positions: typeof positions; // or define the type explicitly
  onLabelSelect: (label: string) => void;
}

const MiniMap: React.FC<MiniMapProps> = ({model,positions, onLabelSelect }) => {
  const modelPositions = selectModel(model) 

  console.log(model)
  return (

    <div style={minimapStyle}>
      <MapContainer
        center={[22.35, 114.15]}
        zoom={9}
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
        doubleClickZoom={false}  // disable zoom on double-click

      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapButtons positions={modelPositions} onLabelSelect={onLabelSelect} />
      </MapContainer>
    </div>
  );
};

export default MiniMap;
