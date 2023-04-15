import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { TokenContext } from "../contexts/TokenContext";
import usersApi from "../services/usersApi";
import { HistoryItemType } from "../types";
import HistoryItem from "../components/HistoryItem";

export default function HistoryPage() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const tokenContext = useContext(TokenContext);
  const [items, setItems] = useState<HistoryItemType[] | []>([]);

  useEffect(() => {
    fetchItems();
  }, [tokenContext?.token]);

  async function fetchItems() {
    if (tokenContext?.token) {
      const response = await usersApi.getUserHistory(tokenContext?.token);
      console.log(response.data);
      setItems(response.data);
    }
  }

  return (
    <Container>
      <NavBar />
      <Content>
        <Title>Histórico</Title>
        <ItemsContainer>
        {items.map((item) => <HistoryItem item={item}/>)}
        </ItemsContainer>
      </Content>
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
  justify-content: flex-start;
  align-items: center;
  margin-top: 68px;
  padding: 50px 0;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;

const Content = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 758;
  font-size: 26px;
  color: #000000;
  margin-bottom: 30px;
`;

const ItemsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

