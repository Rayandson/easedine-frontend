import React from "react";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <Container>
      <input placeholder="Pesquisar"/>
      <IoSearch />
    </Container>
  );
}

const Container = styled.div`
  width: 25%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  background-color: #F7F8F9;
  padding: 20px;

  input {
    width: 90%;
    height: 36px;
    font-family: "Inter";
    font-weight: 500;
    font-size: 13px;
    color: #000000;
    outline: none;
    background-color: #F7F8F9;

    &::placeholder {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    align-items: center;
    color: #99a3ad;
  }
  }

  svg {
    font-size: 19px;
    color: #99a3ad;
  }
`;
