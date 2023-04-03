import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SlArrowDown } from 'react-icons/sl';
import { CartContext } from '../contexts/CartContext';
import CartItem from "./CartItem";

interface ContainerProps {
  showCart: boolean | undefined;
}

interface ImgDivProps {
  img: string | null | undefined;
}

export default function Cart() {
  const cartContext = useContext(CartContext);

  return (
    <Container showCart={cartContext?.showCart}>
      <Header>
        <SlArrowDown
          onClick={() => {
            cartContext?.setShowCart(false);
          }}
        />
        <Title>Sua sacola</Title>
      </Header>
      <Content>
        {cartContext?.cart.items.map((i) => <CartItem itemData={i}/>)}
      </Content>
      <Footer>
        <OrderButton
        //   onClick={() => addItem()}
        >
          Finalizar pedido
        </OrderButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 50vw;
  max-width: 600px;
  height: 80vh;
  background-color: #ffffff;
  z-index: 100;
  position: fixed;
  bottom: ${(props) => (props.showCart ? '10vh' : '-100vh')};
  left: calc(50% - 300px);
  transition: bottom 0.3s ease-in-out;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;

  @media (max-width: 1200px) {
    left: calc(50% - 25vw);
    padding: 0 12px;
  }

  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    left: 0;
    bottom: ${(props) => (props.showCart ? '0' : '-100vh')};
    padding: 0 2vw;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #5e2bc4;
  text-align: center;
  margin-bottom: 20px;

  svg {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc(50% - 9px);

    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.p`
  width: 65%;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 75px;
`;

const ImgDiv = styled.div<ImgDivProps>`
  width: 450px;
  height: 280px;
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 280px;
    height: 180px;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 75vw;
  }
`;

const ItemName = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #1d1d1d;
  margin-top: 18px;
`;

const Description = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: grey;
  margin-top: 18px;
`;

const Price = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #1d1d1d;
  margin-top: 18px;
`;

const NoteLabel = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: grey;
  margin-top: 48px;
`;

const Note = styled.textarea`
  width: 100%;
  height: 12vh;
  outline: none;
  border: solid 1px #cac9c9;
  border-radius: 5px;
  margin-top: 10px;
  padding: 5px 10px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
  box-shadow: 0px -2px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 0 18px;

  @media (max-width: 600px) {
    width: 100vw;
    height: 83px;
  }
`;

const CounterContainer = styled.div`
  width: 30%;
  min-width: 90px;
  max-width: 120px;
  height: 45px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 1px #e4e4e4;
  border-radius: 3px;

  svg {
    font-size: 14px;
    color: #5e2bc4;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Quantity = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
`;

const OrderButton = styled.button`
  width: 90%;
  max-width: 500px;
  height: 45px;
  background-color: #5e2bc4;
  border: none;
  border-radius: 5px;

  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
