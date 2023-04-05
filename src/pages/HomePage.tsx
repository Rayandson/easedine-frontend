import React, { useContext } from "react";
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
import Cart from "../components/Cart";
import { CartContext } from "../contexts/CartContext";

interface ContainerProps {
  showCart: boolean | undefined;
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cartContext = useContext(CartContext);

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
    <Container showCart={cartContext?.showCart}>
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
      <Cart />
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40px;
  margin-top: 68px;

  @media (max-width: 758px) {
    height: calc(100% - 63px);
    align-items: center;
    position: absolute;
    top: 0;
    overflow-y: ${props => props.showCart ? 'hidden' : 'auto'};
    margin-top: 0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh)/2 - 88px);
`;
