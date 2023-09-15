import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Cutlery from "../assets/images/cutlery.png";
import { RestaurantResponse } from "../types";
import restaurantsApi from "../services/restaurantsApi";

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

function Map ({ isLoaded, lat, lng }: MapProps) {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[] | []>([]);

  useEffect(() => {
    fetchRestaurants();
  }, [])

  async function fetchRestaurants() {
      const response = await restaurantsApi.getRestaurants();
      setRestaurants(response.data);
  }

  console.log(restaurants.length)
  return (isLoaded && restaurants.length > 0) ? (
    <GoogleMap center={{ lat, lng }} zoom={15} mapContainerStyle={mapStyles} options={mapOptions}>
      {restaurants.map((restaurant, index) => (
        restaurant.address?.latitute &&
        <Marker
          key={index}
          position={{lat: Number(restaurant.address.latitute), lng: Number(restaurant.address.longitude)}}
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
