import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Cutlery from "../assets/images/cutlery.png";

const markers = [
  {
    location: {
      lat: -5.8840197,
      lng: -35.1994381,
    },
  },
  {
    location: {
      lat: -5.8140197,
      lng: -35.1994381,
    },
  },
  {
    location: {
      lat: -5.8840197,
      lng: -35.2894381,
    },
  },
  {
    location: {
      lat: -5.8890197,
      lng: -35.1954381,
    },
  },
  {
    location: {
      lat: -5.8760197,
      lng: -35.1904381,
    },
  },
  {
    location: {
      lat: -5.8543197,
      lng: -35.1994381,
    },
  },
  {
    location: {
      lat: -5.8840197,
      lng: -35.1971381,
    },
  },
  {
    location: {
      lat: -5.8740197,
      lng: -35.1994381,
    },
  },
  {
    location: {
      lat: -5.8140197,
      lng: -35.2294381,
    },
  },
  {
    location: {
      lat: -5.8895197,
      lng: -35.2624381,
    },
  },
  {
    location: {
      lat: -5.8440197,
      lng: -35.2394381,
    },
  },
  {
    location: {
      lat: -5.8640197,
      lng: -35.2194381,
    },
  },
  {
    location: {
      lat: -5.8640997,
      lng: -35.2054381,
    },
  },
];

const mapOptions = {
  styles: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
  ],
  disableDefaultUI: true,
};

const mapStyles = {
  width: "100%",
  height: "100%",
};

interface MapProps {
  isLoaded: boolean;
  lat: number;
  lng: number;
}

const Map: React.FC<MapProps> = ({ isLoaded, lat, lng }) => {
  return isLoaded ? (
    <GoogleMap center={{ lat, lng }} zoom={15} mapContainerStyle={mapStyles} options={mapOptions}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.location}
          options={{
            icon: {
              url: Cutlery,
              scaledSize: new window.google.maps.Size(32, 32),
            },
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <div></div>
  );
};

export default Map;
