import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RestaurantMenuSearchBar from "../SearchBar/RestaurantMenuSearchBar";

interface NavbarProps {
  restaurantName: string | undefined
}

export default function MenuPageNavBar({ restaurantName }:NavbarProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <GoBackButton onClick={() => navigate("/")}>
        <SlArrowLeft />
      </GoBackButton>
      <RestaurantMenuSearchBar restaurantName={restaurantName}/>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: #ffffff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.1);
`;

const GoBackButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 22px;
    top: 18px;

    svg {
        font-size: 18px;
        color: #000000;
    }
`