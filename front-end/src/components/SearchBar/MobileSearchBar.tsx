import React from "react";
import styled from "styled-components";
import { IoSearch, IoFilter } from "react-icons/io5";

export default function MobileSearchBar() {
  return (
    <Container>
      <SearchBarWrapper>
        <IoSearch />
        <SearchInput placeholder="Pesquisar" />
      </SearchBarWrapper>
      <FilterButton>
        <IoFilter />
      </FilterButton>
    </Container>
  );
}

const Container = styled.div`
  width: 88vw;
  display: none;

  @media (max-width: 758px) {
    display: flex;
    gap: 13px;
    margin-top: 32px;
  }
`;

const SearchBarWrapper = styled.div`
  width: 85%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
  background: #f7f7f7;
  border-radius: 24px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));

  svg {
    font-size: 17px;
    color: #a2a2a2;
  }
`;

const SearchInput = styled.input`
  width: 85%;
  height: 45px;
  background: #f7f7f7;
  outline: none;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  &::placeholder {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #a2a2a2;
  }
`;

const FilterButton = styled.button`
  width: 50px;
  height: 50px;
  background: #f7f7f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 18px;
    color: #4a4a4a;
  }
`;
