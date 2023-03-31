import React from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  restaurantName: string | undefined
}

export default function RestaurantMenuSearchBar({
  restaurantName,
}: SearchBarProps) {
  return (
    <Container>
      <SearchInput placeholder={`Pesquisar em ${restaurantName}`} />
      <IoSearch />
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  border-radius: 24px;
  padding-left: 20px;
  padding-right: 20px;

  svg {
    font-size: 17px;
    color: #9570dd;
  }

  @media (max-width: 758px) {
    width: 60%;
    height: 40px;
  }
`;

const SearchInput = styled.input`
  width: 88%;
  height: 35px;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  background: #f7f7f7;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::placeholder {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    align-items: center;
    color: #525252;
  }
`;
