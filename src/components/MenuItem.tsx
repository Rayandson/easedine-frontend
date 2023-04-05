import React, { useContext } from 'react';
import styled from 'styled-components';
import StarImg from '../assets/images/star.svg';
import { MenuItemType } from '../types';
import { ChosenItemContext } from '../contexts/ChosenItemContext';

interface MenuItemProps {
  item: MenuItemType;
  themeColor: string | undefined;
  setIsScreenUp: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableScrolling: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeColor {
  themeColor: string | undefined;
}

interface ItemImgProps {
  img: string | null;
}

export default function MenuItem({ item, themeColor, setIsScreenUp, setDisableScrolling }: MenuItemProps) {
  const chosenItemContext = useContext(ChosenItemContext);

  function handleClick() {
    chosenItemContext?.setChosenItem(item);
    setIsScreenUp(true);
    setTimeout(() => setDisableScrolling(true), 300);
  }

  return (
    <Container>
      <ItemDiv onClick={() => handleClick()}>
        <ItemImg img={item.image} />
        <ItemInfo img={item.image}>
          <ItemMainInfo>
            <ItemNameDiv>
              <ItemName>{item.itemName}</ItemName>
              <RatingDiv>
                <img src={StarImg} />
                <p>{(item.rating / 10).toFixed(1)}</p>
              </RatingDiv>
            </ItemNameDiv>
            <PriceDiv>
              {item.price ? (
                <Price themeColor={themeColor}>R$ {(item.price / 100).toFixed(2)}</Price>
              ) : (
                <Price themeColor={themeColor}>Ver mais</Price>
              )}
            </PriceDiv>
          </ItemMainInfo>
          <DescriptionContainer>
            <Description>{item.description}</Description>
          </DescriptionContainer>
        </ItemInfo>
      </ItemDiv>
    </Container>
  );
}

const Container = styled.div`
  width: 48%;
  min-height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;

  @media (max-width: 758px) {
    width: 100%;
    margin-bottom: 8px;
  }
`;
const ItemDiv = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  color: #000000;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ItemImg = styled.div<ItemImgProps>`
  width: 100px;
  height: 100px;
  background: ${(props) => (props.img ? `url(${props.img})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const ItemInfo = styled.div<ItemImgProps>`
  width: ${(props) => (props.img ? 'calc(100% - 100px)' : '100%')};
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
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
`;
const RatingDiv = styled.div`
  display: flex;
  gap: 3px;
  img {
    width: 10px;
  }

  p {
    font-family: 'Work Sans';
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
const Price = styled.p<ThemeColor>`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 758;
  font-size: 14px;
  color: ${(props) => props.themeColor};
`;
const DescriptionContainer = styled.div`
  width: 100%;
`;

const Description = styled.p`
  width: 100%;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;
