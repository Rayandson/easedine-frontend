import React from "react";
import styled from "styled-components";
import StarImg from "../assets/images/star.svg";
import { MenuItemType } from "../types";

interface MenuItemProps {
  item: MenuItemType;
  fontColor: string | undefined
}

interface FontColor {
  fontColor: string | undefined
}

interface ItemImgProps {
  img: string | null;
}

export default function MenuItem({ item, fontColor }:MenuItemProps) {
  return (
    <Container>
      <ItemDiv fontColor={fontColor}>
        <ItemImg img={item.image}/>
        <ItemInfo>
          <ItemMainInfo>
            <ItemNameDiv>
              <ItemName>{item.itemName}</ItemName>
              <RatingDiv>
                <img src={StarImg} />
                <p>{(item.rating/10).toFixed(1)}</p>
              </RatingDiv>
            </ItemNameDiv>
            <PriceDiv>
              {item.price ? <Price>R$ {(item.price/100).toFixed(2)}</Price> : <Price>Ver mais</Price> }
            </PriceDiv>
          </ItemMainInfo>
          <DescriptionContainer>
            <Description>
              {item.description}
            </Description>
          </DescriptionContainer>
        </ItemInfo>
      </ItemDiv>
      <DivisionLine />
    </Container>
  );
}

const Container = styled.div`
  width: 48%;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  @media (max-width: 758px) {
    width: 100%;
  }

`;
const ItemDiv = styled.div<FontColor>`
  width: 100%;
  height: 127px;
  display: flex;
  align-items: center;
  color: ${props => props.fontColor};
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ItemImg = styled.div<ItemImgProps>`
  width: 100px;
  height: 100px;
  background: ${props => props.img ? `url(${props.img})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const ItemInfo = styled.div`
  width: calc(100% - 120px);
  height: 103px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
`;
const ItemMainInfo = styled.div`
  width: 100%;
  display: flex;
`;
const ItemNameDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
`;
const ItemName = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }
`;
const RatingDiv = styled.div`
  display: flex;
  gap: 3px;
  img {
    width: 10px;
  }

  p {
    font-family: "Work Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    color: #fcbb00;
  }
`;

const PriceDiv = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
`;
const Price = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 758;
  font-size: 14px;
`;
const DescriptionContainer = styled.div`
  width: 100%;
`;

const Description = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

const DivisionLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f5f0eb;

  @media (max-width: 758px) {
    width: 90%;
  }
`;
