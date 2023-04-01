import React from "react";
import styled from "styled-components";
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
// import Logo from "../../assets/images/logofood.png";
import Logo from "../../assets/images/logofood.png";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftContent>
        <LogoImg src={Logo} />
        <Menu>
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          <MenuItem onClick={() => navigate("/unauthorized")}>Restaurantes</MenuItem>
          <MenuItem onClick={() => navigate("/unauthorized")}>Histórico</MenuItem>
        </Menu>
      </LeftContent>
      <SearchBar />
      <IconsWrapper>
        <IoPersonOutline onClick={() => navigate("/unauthorized")}/>
        <IoBagOutline onClick={() => navigate("/unauthorized")}/>
      </IconsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  padding: 0 38px;
  background-color: #ffffff;
  /* box-shadow: 0px 1px 5px rgba(71, 71, 71, 0.15); */
  border-bottom: solid 1px rgba(71, 71, 71, 0.15);
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
  justify-content: space-between;
  gap: 20px;
`

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
`;

const Menu = styled.ul`
width: 80%;
  display: flex;
  justify-content: center;
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
    color: #5836bc;
  }

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
    color: #5836bc;
  }

  &:hover {
    cursor: pointer;
  }
`;
