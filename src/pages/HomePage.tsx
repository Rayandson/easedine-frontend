import React from "react";
import styled from "styled-components";
import CloseToYouSection from "../components/CloseToYouSession/CloseToYouSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MobileSearchBar from "../components/SearchBar/MobileSearchBar";
import NavBar from "../components/NavBar/NavBar";
import { RestaurantResponse } from "../types";
import { useState, useEffect } from "react";
import restaurantsApi from "../services/restaurantsApi";
import { Triangle } from "react-loader-spinner";

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    renderRestaurants();
  }, []);

  async function renderRestaurants() {
    const response = await restaurantsApi.getRestaurants();
    const data: RestaurantResponse[] = response.data;
    setRestaurants(data);
    setIsLoading(false);
  }

  return (
    <Container>
      <NavBar />
      {isLoading ? (
        <LoadingContainer>
          <Triangle
            height="50"
            width="50"
            color="#5836bc"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </LoadingContainer>
      ) : (
        <>
          <Header />
          <MobileSearchBar />
          <CloseToYouSection restaurants={restaurants} />
        </>
      )}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 68px;

  @media (max-width: 758px) {
    justify-content: center;
    align-items: center;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh)/2 - 88px);
`;
