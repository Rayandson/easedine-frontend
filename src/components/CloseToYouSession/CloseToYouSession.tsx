import React from "react";
import styled from "styled-components";
import RestaurantCard from "./RestaurantCard";
import { RestaurantResponse } from "../../types";

interface SectionProps {
  restaurants: RestaurantResponse[]
}

export default function CloseToYouSection({ restaurants }: SectionProps) {

  return (
    <Section>
      <Title>Perto de você</Title>
      <CardsContainer>
        {restaurants.map((r) => (
          <RestaurantCard data={r} />
        ))}
      </CardsContainer>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 35px;
  margin-bottom: 85px;
`;

const Title = styled.h1`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 758;
  font-size: 16px;
  color: #000000;
  margin-bottom: 15px;
`;

const CardsContainer = styled.div`
  width: 88vw;
  display: flex;
  gap: 22px;

  @media (max-width: 758px) {
    width: 82vw;
    flex-direction: column;
  }
`;
