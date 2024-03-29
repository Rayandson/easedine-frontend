import React, { useContext } from "react";
import styled from "styled-components";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import Logo from "../../assets/images/logo-blue.svg";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from "../../contexts/UserContext";

interface ItemsQuantityDivProps {
  quantity: number | null | undefined;
}

type NavbarProps = {
  onPersonIconClick?: () => void;
};

export default function NavBar({ onPersonIconClick }: NavbarProps) {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);

  return (
    <Container>
      <LeftContent>
        <LogoImg src={Logo} />
        <Menu>
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigate("/map")}>Mapa</MenuItem>
          <MenuItem onClick={() => userContext?.user === undefined ? navigate("/unauthorized") : navigate("/history")}>Histórico</MenuItem>
        </Menu>
      </LeftContent>
      <SearchBar />
      <IconsWrapper>
        {userContext?.user ? <IoPersonOutline onClick={onPersonIconClick}/> : <SignInOption onClick={() => navigate("/signin")}>Entrar ou cadastrar-se</SignInOption>}
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
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 38px;
  background-color: #ffffff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: 758px) {
    display: none;
  }
`;

const LeftContent = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-start;
  gap: 90px;
`

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;

const Menu = styled.ul`
  width: 80%;
  display: flex;
  align-items: center;
  gap: 45px;
`;

const MenuItem = styled.li`
  font-family: "Inter";
  font-weight: 500;
  font-size: 13px;
  color: #000000;

  svg {
    font-size: 24px;
    color: #103996;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SignInOption = styled.p`
  font-family: "Inter";
  font-weight: 500;
  font-size: 13px;
  color: #000000;

  &:hover {
    cursor: pointer;
  }
`;

const IconsWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;

  svg {
    font-size: 24px;
    color: #2065D1;
  }

  &:hover {
    cursor: pointer;
  }
`;

const CartButton = styled.div`
  position: relative;
`

const ItemsQuantityDiv = styled.div<ItemsQuantityDivProps>`
  width: 15px;
  height: 15px;
  display: ${props => props.quantity !=null && props.quantity > 0 ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  background-color: #103996;
  border-radius: 50%;
  /* border: solid 1px #5836bc; */
  position: absolute;
  bottom: 0;
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