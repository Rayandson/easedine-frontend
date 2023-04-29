import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cart from "../components/Cart";
import { TokenContext } from "../contexts/TokenContext";
import usersApi from "../services/usersApi";
import { HistoryItemType } from "../types";
import HistoryItem from "../components/HistoryItem";
import { Triangle } from "react-loader-spinner";

export default function HistoryPage() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tokenContext = useContext(TokenContext);
  const [items, setItems] = useState<HistoryItemType[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [tokenContext?.token]);

  async function fetchItems() {
    if (tokenContext?.token) {
      const response = await usersApi.getUserHistory(tokenContext?.token);
      console.log(response.data);
      setItems(response.data);
      setIsLoading(false);
    }
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
      <Content>
        <Title>Histórico</Title>
        <ItemsContainer>
        {items.length === 0 ? (
          <NoOrdersMsg>Você não possui pedidos</NoOrdersMsg>
        ) : (
          items.map((item) => <HistoryItem item={item}/>)
        )}
        </ItemsContainer>
      </Content>
      )}
      <Footer setScrollPosition={setScrollPosition} />
      <Cart scrollPosition={scrollPosition} />
    </Container>
  );
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh)/2 - 88px);
`;

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 63px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 68px;
  padding: 50px 0;

  @media (max-width: 758px) {
    margin-top: 0px;
    padding: 50px 12px;
  }
`;

const Content = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 758px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  color: #000000;
  margin-bottom: 30px;
`;

const NoOrdersMsg = styled.p`
font-family: "Work Sans";
font-style: normal;
font-weight: 500;
font-size: 20px;
`

const ItemsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 758px) {
      flex-direction: column;
      justify-content: flex-start;
    }
`

