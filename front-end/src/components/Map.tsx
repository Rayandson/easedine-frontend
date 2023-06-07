import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const mapStyles = {
  width: '100%',
  height: '100%',
};

  const center = {
    lat: -22.9035,
    lng: -43.2096,
  };

const markers = [
  {
    location: {
      lat: -22.9035,
      lng: -43.2096,
    },
  },
  {
    location: {
      lat: -22.9135,
      lng: -43.2096,
    },
  },
];


const mapOptions = {
  styles: [
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

interface MapProps {
  isLoaded: boolean;
}

const Map: React.FC<MapProps> = ({ isLoaded }) => {
  return (
    isLoaded ? (
      <GoogleMap
      center={center}
      zoom={15}
      mapContainerStyle={mapStyles}
      options={mapOptions}
    >
      {markers.map((marker, index) => (
        <Marker
        key={index}
        position={marker.location}
      />
      ))}
    </GoogleMap>
    ) : (
      <div></div>
    )
  );
};

export default Map;

