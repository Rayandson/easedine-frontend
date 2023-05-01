import React, { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import SignUpSvg from "../assets/images/signup.svg";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  return (
    <Container>
      <NavBar />
      <ImgWrapper>
        <SignUpImg src={SignUpSvg} />
      </ImgWrapper>
      <Msg>Entre agora ou cadastre-se para aproveitar o app ao máximo</Msg>
      <Link to="/signin">
        <SignUpButton>Entrar ou cadastrar-se</SignUpButton>
      </Link>
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
  justify-content: center;
  align-items: center;
  margin-top: 68px;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;

const ImgWrapper = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 758px) {
    width: 85vw;
    height: 75vw;
  }
`;

const SignUpImg = styled.img`
  width: 500px;
  @media (max-width: 758px) {
    width: 80vw;
  }
`;

const Msg = styled.p`
  width: 85vw;
  font-family: "Work Sans";
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-bottom: 50px;
`;

const SignUpButton = styled.button`
  width: 260px;
  height: 50px;
  background-color: #5e2bc4;
  border-radius: 10px;
  border: none;
  font-family: "Work Sans";
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 758px) {
    width: 85vw;
    height: 50px;
  }
`;
