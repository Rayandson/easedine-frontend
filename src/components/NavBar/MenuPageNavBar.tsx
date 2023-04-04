import React, { useContext } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RestaurantMenuSearchBar from '../SearchBar/RestaurantMenuSearchBar';
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { CartContext } from '../../contexts/CartContext';

interface ItemsQuantityDivProps {
  quantity: number | null | undefined;
}

interface NavbarProps {
  restaurantName: string | undefined;
  themeColor: string | undefined;
}

export default function MenuPageNavBar({ restaurantName, themeColor }: NavbarProps) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  return (
    <Container>
      <GoBackButton onClick={() => navigate('/')}>
        <SlArrowLeft />
      </GoBackButton>
      <RestaurantMenuSearchBar restaurantName={restaurantName} themeColor={themeColor} />
      <IconsWrapper>
        <CartButton>
        <IoBagOutline onClick={() => cartContext?.setShowCart(true)}/>
        <ItemsQuantityDiv quantity={cartContext?.cart.quantity}>
            <ItemsQuantity>{cartContext?.cart.quantity}</ItemsQuantity>
          </ItemsQuantityDiv>
        </CartButton>
      </IconsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 758px) {
    height: 55px;
  }
`;

const GoBackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 22px;
  top: calc((67px) / 2 - 9px);

  svg {
    font-size: 18px;
    color: #000000;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 758px) {
    top: calc((55px) / 2 - 9px);
  }
`;

const IconsWrapper = styled.div`
  width: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  position: fixed;
  right: 15px;
  top: 20px;

  svg {
    font-size: 24px;
    color: #5836bc;
  }

  &:hover {
    cursor: pointer;
  }
`;

const CartButton = styled.div`
display: flex;
  position: relative;
  top: 0px;
  right: 15px;

  @media (max-width: 758px) {
    display: none;
  }

`

const ItemsQuantityDiv = styled.div<ItemsQuantityDivProps>`
  width: 15px;
  height: 15px;
  display: ${props => props.quantity !=null && props.quantity > 0 ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: #5836bc;
  border-radius: 50%;
  position: absolute;
  bottom: 0px;
  right: -6px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ItemsQuantity = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  color: #FFFFFF;
`;