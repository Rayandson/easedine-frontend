import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SlArrowDown, SlArrowLeft } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { CartContext } from '../contexts/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

interface ContainerProps {
  showCart: boolean | undefined;
}

interface CartProps {
  setDisableScrolling?: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
}

export default function Cart({ setDisableScrolling, scrollPosition }: CartProps) {
  const cartContext = useContext(CartContext);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);
  

  return (
    <Container showCart={cartContext?.showCart}>
      {checkoutIsOpen ? (
       <Checkout setCheckoutIsOpen={setCheckoutIsOpen} setDisableScrolling={setDisableScrolling}/> 
      ) : (
        <>
          <Header>
            <ArrowIcon
              onClick={() => {
                cartContext?.setShowCart(false);
                setDisableScrolling && setDisableScrolling(false);
                setTimeout(() => window.scrollTo(0, scrollPosition), 50);
              }}
            >
              <SlArrowDown />
            </ArrowIcon>
            <CloseIcon
              onClick={() => {
                cartContext?.setShowCart(false);
                setDisableScrolling && setDisableScrolling(false);
                setTimeout(() => window.scrollTo(0, scrollPosition), 50);
              }}
            >
              <VscChromeClose />
            </CloseIcon>
            <Title>Sua sacola</Title>
          </Header>
          <ContentContainer>
            <CartContent>
              {cartContext?.cart.total !== undefined && cartContext?.cart.total > 0 ? (
                <>
                  {cartContext?.cart.items.map((i, index) => (
                    <CartItem key={index} itemData={i} />
                  ))}
                  <DivisionLine />
                  <TotalContainer>
                    <Total>TOTAL:</Total>
                    <TotalValue>R$ {(cartContext?.cart.total / 100).toFixed(2)}</TotalValue>
                  </TotalContainer>
                </>
              ) : (
                <MsgDiv>
                  <EmptyCartMsg>Sua Sacola está vazia</EmptyCartMsg>
                </MsgDiv>
              )}
            </CartContent>
          </ContentContainer>
          <Footer>
            <OrderButton onClick={() => setCheckoutIsOpen(true)}>Quero pedir</OrderButton>
          </Footer>
        </>
      )}
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 500px;
  height: 100%;
  background-color: #ffffff;
  z-index: 100;
  position: fixed;
  bottom: 0;
  right: ${(props) => (props.showCart ? '0' : '-500px')};
  transition: right 0.3s ease-in-out;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    width: 100vw;
    height: 100%;
    left: 0;
    transition: bottom 0.3s ease-in-out;
    bottom: ${(props) => (props.showCart ? '0' : '-100vh')};
  }
`;

const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5e2bc4;
  text-align: center;
  margin-bottom: 20px;
`;

const ArrowIcon = styled.div`
  display: none;

  svg {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc((55px / 2) - 9px);

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 600px) {
    display: block;
  }
`;

const CloseIcon = styled.div`
  display: block;

  svg {
    font-size: 20px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc((55px / 2) - 9px);

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Title = styled.p`
  width: 65%;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

const ContentContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  margin-bottom: 83px;
  padding: 20px 30px 50px 30px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: -moz-scrollbars-none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    padding: 0 12px;
  }
`;

const CartContent = styled.div`
  width: 100%;
  /* height: 100%; */
`;

const TotalContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const DivisionLine = styled.div`
  width: 90%;
  height: 1px;
  background-color: #cfcfcf;
  margin: 30px auto;
`;

const Total = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  color: #777777;
`;

const TotalValue = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  color: #000000;
`;

const MsgDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: calc(50vh - 72px);
`;

const EmptyCartMsg = styled.h1`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  color: #000000;
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
    /* position: fixed; */
  }
`;

const OrderButton = styled.button`
  width: 80%;
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
