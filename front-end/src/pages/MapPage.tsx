import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cart from "../components/Cart";
import { useJsApiLoader } from "@react-google-maps/api";
import Map from "../components/Map";
import { PageContext } from '../contexts/PageContext';
import restaurantsApi from "../services/restaurantsApi";
// import { mapOptions } from "./components/MapConfiguration";

interface MapPageProps {
  lat: number;
  lng: number;
}

export default function MapPage({lat, lng}: MapPageProps) {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  // const [restaurants, setRestaurants] = useState([]);
  const pageContext = useContext(PageContext);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if(pageContext?.page !== "location") {
      pageContext?.setPage("location");
    }

    // fetchRestaurants();
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: apiKey,
    googleMapsApiKey: apiKey ? apiKey : "",
  });

  // async function fetchRestaurants() {
  //     const response = await restaurantsApi.getRestaurants();
  //     setRestaurants(response.data);
  // }

  return (
    <Container>
      <NavBar />
      {/* <Map isLoaded={isLoaded} lat={lat} lng={lng} restaurants={restaurants}/> */}
      <Map isLoaded={isLoaded} lat={lat} lng={lng} />
      <Footer setScrollPosition={setScrollPosition} />
      <Cart scrollPosition={scrollPosition} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 63px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 68px;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;
