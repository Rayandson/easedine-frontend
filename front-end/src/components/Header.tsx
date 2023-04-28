import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const userContext = useContext(UserContext);
  return (
    <Container>
      {userContext?.user?.firstName ? <p>Olá, {userContext.user?.firstName}</p> : <p>Bem-vindo!</p>}
      <h1>Onde quer comer hoje?</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 88vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  /* margin-top: 600px; */

  p {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    color: #000000;
  }

  h1 {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 758;
    font-size: 26px;
    color: #000000;
  }

  @media (max-width: 758px) {
    width: 88vw;
    margin-top: 0px;
  }
`;
