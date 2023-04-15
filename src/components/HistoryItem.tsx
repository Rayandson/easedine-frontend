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
        <MainInfo>
          <RestaurantName>{item.Restaurant.name}</RestaurantName>
          <Date>Data do pedido: 12/04/2023</Date>
        </MainInfo>
      <Status>{`Status: ${
          item.status === "FINISHED" && item.isPaid === true ? "Concluido" : "Em andamento"
        }`}</Status>
        </OrderInfo>
        <ButtonsContainer>
            <Button>Detalhes</Button>
            <Button>Pedir novamente</Button>
        </ButtonsContainer>
      </InfoContainer>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  width: 48%;
  height: 150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background: #f7f7f7;
  border-radius: 10px;
  margin-bottom: 35px;
  padding: 0 15px;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 5px;
`;

const InfoContainer = styled.div`
  width: calc(100% - 120px);
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const OrderInfo = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const MainInfo = styled.div`
  width: 50%;
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
  line-height: 20px;
  margin-bottom: 15px;
  flex-shrink: 0;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 25px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  width: 25%;
  min-width: 120px;
  height: 30px;
  background-color: #5e2bc4;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
