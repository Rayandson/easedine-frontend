import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";

export default function RestaurantPage() {
  return (
    <Container>
      <NavBar />
      <ImgDiv>
      </ImgDiv>
      <RestaurantMenuButton>Ir para o cardápio</RestaurantMenuButton>
      <Footer />
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
  background-color: #F5B527;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;
const ImgDiv = styled.div`
  width: 300px;
  height: 180px;
  position: relative;
  background: url("https://scontent.fnat1-1.fna.fbcdn.net/v/t39.30808-6/294563667_758558753743903_2365438735680471970_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHvuqMp73bEBoKcmqRxGOedZHEJHHp7C4JkcQkcensLgohgxfSCssnPF8qnV4j6l7jaC0swO_V7zFJpHpezpYo8&_nc_ohc=AgS_yMIgfyUAX-k5FfA&_nc_ht=scontent.fnat1-1.fna&oh=00_AfAq-E_3TleeZvXJaCDqAlAdFlj6GhuzZ8ev6Awho3oWlQ&oe=642428E4");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 16px 16px;
  border: solid 1px white;
  margin-bottom: 30px;

  @media (max-width: 758px) {
    width: 82vw;
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

const RestaurantMenuButton = styled.button`
  width: 260px;
  height: 50px;
  background-color: #000000;
  border-radius: 10px;
  border: none;
  font-family: "Work Sans";
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;

  @media (max-width: 758px) {
    width: 85vw;
    height: 50px;
  }
`;
