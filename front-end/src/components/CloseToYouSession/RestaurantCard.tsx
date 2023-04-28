import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StarImg from "../../assets/images/star.svg";
import { RestaurantResponse } from "../../types";

interface RestaurantCardProps {
  data: RestaurantResponse
}

interface imageDivProps {
  img: string;
}

export default function RestaurantCard({ data }:RestaurantCardProps) {
  const navigate = useNavigate();

  return (
    <Container onClick={() => {
      navigate(`/restaurants/${data.profileName}`)
      window.scrollTo(0, 0);
    }}>
      <ImageDiv img={data.picture}>
        <RatingDiv>
          <Star src={StarImg} />
          <Rating>{data.rating}.0</Rating>
        </RatingDiv>
      </ImageDiv>
      <InfoDiv>
        <Name>{data.name}</Name>
        <CategoriesContainer>
          {data.restaurantCategories.map((c, index) => <CategoryCard key={index}>{c.name}</CategoryCard>)}
        </CategoriesContainer>
      </InfoDiv>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 758px) {
    width: 82vw;
  }
`;

const ImageDiv = styled.div<imageDivProps>`
  width: 300px;
  height: 180px;
  position: relative;
  background: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 16px 16px 0px 0px;

  @media (max-width: 758px) {
    width: 82vw;
  }
`;

const RatingDiv = styled.div`
  width: 88px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  position: absolute;
  right: 13px;
  bottom: 13px;
  background: rgba(82, 82, 82, 0.8);
  backdrop-filter: blur(2.5px);
  border-radius: 8px;

`;

const Star = styled.img`
  width: 17px;
`;
const Rating = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #fcbb00;
`;

const InfoDiv = styled.div`
  width: 300px;
  height: 85px;
  background: #F7F7F7;
  border-radius: 0px 0px 10px 10px;
  padding: 9px 12px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 758px) {
    width: 82vw;
  }
`;

const Name = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #000000;
  margin-bottom: 15px;
`;

const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 9px;
`;
const CategoryCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 57px;
  height: 26px;
  background: #eeeeee;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  font-family: "Work Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
`;
