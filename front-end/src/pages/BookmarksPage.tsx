import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IoPersonOutline } from "react-icons/io5";
import { RiLogoutBoxLine, RiFileList3Line } from "react-icons/ri";
import Footer from "../components/Footer";
import { UserContext } from "../contexts/UserContext";
import { TokenContext } from "../contexts/TokenContext";
import { PageContext } from "../contexts/PageContext";
import { useNavigate } from "react-router-dom";

export default function BookmarksPage() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const userContext = useContext(UserContext);
  const pageContext = useContext(PageContext);
  const tokenContext = useContext(TokenContext);
  const navigate = useNavigate();


  useEffect(() => {
    if(pageContext?.page !== "profile") {
      pageContext?.setPage("profile");
    }
  }, [tokenContext?.token]);
  

  const options = [
    { title: "Conta", icon: IoPersonOutline },
    { title: "Pedidos", icon: RiFileList3Line },
    { title: "Sair", icon: RiLogoutBoxLine },
  ];

  function handleItemClick(item: string) {
    if (item === "Sair") signOut();
    else if (item === "Conta") conta();
    else if (item === "Pedidos") goToHistory();
  }

  function signOut() {
    localStorage.removeItem("userData");
    userContext?.setUser(undefined);
    tokenContext?.setToken("");
    pageContext?.setPage('home');
    navigate('/');
  }

  function goToHistory() {
      pageContext?.setPage('orders');
      navigate('/history');
  }

  function conta() {
    console.log("clicou em conta");
  }

  return (
    <Container>
      {options.map((item, index) => (
        <OptionContainer key={index} onClick={() => handleItemClick(item.title)}>
          <item.icon />
          <OptionTitle>{item.title}</OptionTitle>
        </OptionContainer>
      ))}
      <Footer setScrollPosition={setScrollPosition} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 20px;
`;

const OptionContainer = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 15px;

  svg {
    font-size: 25px;
  }
`;

const OptionTitle = styled.p`
  font-family: "Inter";
  font-size: "22px";
  color: "black";
`;
