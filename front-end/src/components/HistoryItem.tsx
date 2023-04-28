import React from "react";
import styled from "styled-components";
import { HistoryItemType } from "../types";

interface HistoryItemProps {
  item: HistoryItemType;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  return (
    <ItemContainer>
      <Image src={item.Restaurant.picture} />
      <InfoContainer>
        <OrderInfo>
        <TopInfo>
          <RestaurantName>{item.Restaurant.name}</RestaurantName>
          <Status>{`${
            item.status === "FINISHED" && item.isPaid === true ? "Concluido" : "Em andamento"
          }`}</Status>
        </TopInfo>
        <Date>Data: 12/04/2023</Date>
        </OrderInfo>
        <ButtonsContainer>
          <p>Detalhes</p>
          <p>Pedir novamente</p>
        </ButtonsContainer>
      </InfoContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 48%;
  min-height: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 35px;
  padding: 15px 15px;

  @media (max-width: 1200px) {
    width: 100%;
    min-height: 130px;
    align-items: flex-start;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;

  @media (max-width: 1200px) {
    width: 80px;
    height: 80px;
  }
`;

const InfoContainer = styled.div`
  width: calc(100% - 120px);
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1200px) {
    width: calc(100% - 80px);
    min-height: 100px;
  }
`;

const TopInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const OrderInfo = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RestaurantName = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`;

const Date = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;

const Status = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  flex-shrink: 0;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5%;
  margin-bottom: 10px;

  p {
    font-family: "Work Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  color: #5e2bc4;

  &:hover {
    cursor: pointer;
  }

  }

  @media (max-width: 1200px) {
    margin-bottom: 0;
  }
`;

// const Button = styled.button`
//   width: 25%;
//   min-width: 120px;
//   height: 30px;
//   background-color: #5e2bc4;
//   border: none;
//   border-radius: 5px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   font-family: "Work Sans";
//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   color: #ffffff;

//   &:hover {
//     cursor: pointer;
//   }
// `;
