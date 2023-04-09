import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar/NavBar';
import Cart from '../components/Cart';
import ProgressBar from '../components/ProgressBar';
import { OrderContext } from '../contexts/OrderContext';
import ordersApi from '../services/ordersApi';

export default function OrderPage() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const orderContext = useContext(OrderContext);
  const [orderStatus, setOrderStatus] = useState<string | undefined>();

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, []);

  async function fetchOrder() {
    if (orderContext?.order?.id) {
      const order = await ordersApi.getOrder(orderContext.order.id);

      setOrderStatus(order.data.status);
    }
  }

  return (
    <Container>
      <NavBar />
      <Header>Acompanhe o seu pedido</Header>
      {orderStatus === 'ORDERED' ? (
        <>
          <Msg>Aguardando início do preparo.</Msg>
          <ProgressBarWrapper>
            <ProgressBar />
            <EmptyProgressBar />
          </ProgressBarWrapper>
        </>
      ) : orderStatus === 'PREPARING' ? (
        <>
          <Msg>O seu pedido está sendo preparado.</Msg>
          <ProgressBarWrapper>
            <FullProgressBar />
            <ProgressBar />
          </ProgressBarWrapper>
        </>
      ) : orderStatus === 'FINISHED' ? (
        <>
          <Msg>
            O seu pedido está pronto! <br />
            Aguarde o garçom.
          </Msg>
          <ProgressBarWrapper>
            <FullProgressBar />
            <FullProgressBar />
          </ProgressBarWrapper>
        </>
      ) : (
        <p>Loading</p>
      )}
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
  padding: 40px 0;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;

const Header = styled.h1`
  /* width: 85vw; */
  font-family: 'Work Sans';
  font-weight: 500;
  font-size: 24px;
  color: #000000;
  text-align: center;
  margin-bottom: 80px;
`;

const Msg = styled.p`
  width: 85vw;
  font-family: 'Work Sans';
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  text-align: center;
  margin-bottom: 40px;
`;
const ProgressBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3px;
`;

const EmptyProgressBar = styled.div`
  width: 40%;
  height: 4px;
  background-color: #d6d6d6;

  @media (min-width: 600px) {
    width: 30%;
  }

  @media (min-width: 960px) {
    width: 20%;
  }
`;

const FullProgressBar = styled.div`
  width: 40%;
  height: 4px;
  background-color: #1976d2;

  @media (min-width: 600px) {
    width: 30%;
  }

  @media (min-width: 960px) {
    width: 20%;
  }
`;
