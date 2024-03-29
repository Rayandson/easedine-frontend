import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { IoBag, IoPerson, IoHomeSharp, IoNewspaper } from 'react-icons/io5';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PageContext } from '../contexts/PageContext';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';

interface MenuItemProps {
  name?: string;
  selectedItem?: string;
}

interface ItemsQuantityDivProps {
  quantity: number | null | undefined;
}

interface FooterProps {
  setDisableScrolling?: React.Dispatch<React.SetStateAction<boolean>>;
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

export default function Footer({setDisableScrolling, setScrollPosition}: FooterProps) {
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  return (
    <Container>
      <MenuItem
        name="home"
        selectedItem={pageContext ? pageContext.page : ''}
        onClick={() => {
          pageContext?.setPage('home');
          navigate('/');
        }}
      >
        <IoHomeSharp />
      </MenuItem>
      <MenuItem
        name="location"
        selectedItem={pageContext ? pageContext.page : ''}
        onClick={() => {
          pageContext?.setPage('location');
          navigate('/map');
        }}
      >
        <FaMapMarkedAlt />
      </MenuItem>
      <MenuItem></MenuItem>
      <MenuItem
        name="orders"
        selectedItem={pageContext ? pageContext.page : ''}
        onClick={() => {
          pageContext?.setPage('orders');
          userContext?.user === undefined ? navigate("/unauthorized") : navigate("/history")
        }}
      >
        <IoNewspaper />
      </MenuItem>
      <MenuItem
        name="profile"
        selectedItem={pageContext ? pageContext.page : ''}
        onClick={() => {
          pageContext?.setPage('profile');
          userContext?.user === undefined ? navigate("/unauthorized") : navigate("/bookmarks")
        }}
      >
        <IoPerson />
      </MenuItem>
      <OutsideCircle>
        <CartButton onClick={() => {
          cartContext?.setShowCart(true);
          setTimeout(() => setDisableScrolling && setDisableScrolling(true), 300)
          setScrollPosition(window.pageYOffset);
        }}>
          <IoBag />
          <ItemsQuantityDiv quantity={cartContext?.cart.quantity}>
            <ItemsQuantity>{cartContext?.cart.quantity}</ItemsQuantity>
          </ItemsQuantityDiv>
        </CartButton>
      </OutsideCircle>
    </Container>
  );
}

const Container = styled.footer`
  display: none;
  position: relative;
  box-shadow: 0px -2px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;

  @media (max-width: 758px) {
    width: 100vw;
    height: 63px;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 20;
  }
`;

const MenuItem = styled.div<MenuItemProps>`
  width: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 26px;
    color: ${(props) => (props.name === props.selectedItem ? '#000000' : '#858585')};
  }
`;

const OutsideCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 72px;
  height: 72px;
  left: calc(50vw - 36px);
  bottom: 7px;
  background: #f0f0f0;
  border-radius: 50%;
`;

const CartButton = styled.button`
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #62A0F4 0%, #0D58CD 85%);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.5px);
  border-radius: 50%;
  border: none;
  font-size: 25px;
  color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
`;

const ItemsQuantityDiv = styled.div<ItemsQuantityDivProps>`
  width: 22px;
  height: 22px;
  display: ${props => props.quantity !=null && props.quantity > 0 ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: solid 1px #0D58CD;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ItemsQuantity = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #0D58CD;
`;
