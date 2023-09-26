import React, { useContext } from "react";
import styled from "styled-components";
import NearYouSection from "../components/NearYouSession/NearYouSection";
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
import ProfileDrawer from "../components/ProfileDrawer";

interface ContainerProps {
  showCart: boolean | undefined;
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const [disableScrolling, setDisableScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  

  const [drawerOpen, setDrawerOpen] = useState(false);
  

  useEffect(() => {
    renderRestaurants();
  }, []);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  async function renderRestaurants() {
    try {
      const response = await restaurantsApi.getRestaurants();
      const data: RestaurantResponse[] = response.data;
      setRestaurants(data);
      setIsLoading(false);
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  return (
    <Container showCart={cartContext?.showCart}>
      <NavBar onPersonIconClick={handleDrawerOpen}/>
      <ProfileDrawer open={drawerOpen} onClose={handleDrawerClose} />
      {isLoading ? (
        <LoadingContainer>
          <Triangle
            height="50"
            width="50"
            color="#2065D1"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </LoadingContainer>
      ) : (
        <>
          <Header />
          <MobileSearchBar />
          <NearYouSection restaurants={restaurants} />
        </>
      )}
      <Footer setDisableScrolling={setDisableScrolling} setScrollPosition={setScrollPosition}/>
      <Cart setDisableScrolling={setDisableScrolling} scrollPosition={scrollPosition}/>
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 100vw;
  min-height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 40px;
  margin-top: 68px;
  background: #F9FAFB;

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
