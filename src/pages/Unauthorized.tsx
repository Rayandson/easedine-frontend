import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import SignUpSvg from "../assets/images/signup.svg";
import Cart from "../components/Cart";

export default function Unauthorized() {
  return (
    <Container>
      <NavBar />
      <SignUpImg src={SignUpSvg}/>
      <Msg>Entre agora ou cadastre-se para aproveitar o app ao máximo</Msg>
      <SignUpButton>Entrar ou cadastrar-se</SignUpButton>
      <Footer />
      <Cart />
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
const SignUpImg = styled.img`
  width: 300px;
  margin-bottom: 50px;

   @media (max-width: 758px) {
    width: 80vw;
  }
`

const Msg = styled.p`
  width: 85vw;
  font-family: "Work Sans";
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  text-align: center;
  margin-bottom: 50px;
`

const SignUpButton = styled.button`
  width: 260px;
  height: 50px;
  background-color: #7C347A;
  border-radius: 10px;
  border: none;
  font-family: "Work Sans";
  font-weight: 500;
  font-size: 20px;
  color: #FFFFFF;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 758px) {
    width: 85vw;
    height: 50px;
  }
`;
