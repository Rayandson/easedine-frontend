import React from "react";
import styled from "styled-components";
import MenuPageNavBar from "../components/NavBar/MenuPageNavBar";
import MenuItem from "../components/MenuItem";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import restaurantsApi from "../services/restaurantsApi";
import { MenuItemType, MostOrdered, RestaurantInfo } from "../types";
import StarImg from "../assets/images/star.svg";
import { Triangle } from "react-loader-spinner";

interface CategoriesProps {
  isAtTop: boolean;
  themeColor: string | undefined;
}

interface ImgDivProps {
  img: string | undefined;
}

interface Theme {
  themeColor: string | undefined;
  activeCategory?: string;
  categoryName?: string;
}

export default function MenuPage() {
  const { profileName } = useParams();
  const [itemsToShow, setItemsToShow] = useState<MenuItemType[] | MostOrdered>(
    []
  );
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>();
  const [isAtTop, setIsAtTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("OS MAIS PEDIDOS");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current !== null) {
        const elementTop = categoriesRef.current.getBoundingClientRect().top;
        const isTop = elementTop <= 145;
        setIsAtTop(isTop);
        console.log(elementTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function fetchRestaurant() {
    if (profileName) {
      const response = await restaurantsApi.getRestaurantInfo(profileName);

      setRestaurantInfo(response.data);
      setItemsToShow(response.data.mostOrdered);
      setIsLoading(false);
      console.log(response.data);
    }
  }

  const starsArray = [];
  if (restaurantInfo?.restaurant.rating) {
    for (let i = 1; i <= restaurantInfo?.restaurant.rating; i++) {
      starsArray.push(i);
    }
  }

  return (
    <Container themeColor={restaurantInfo?.restaurant.themeColor}>
      {isLoading ? (
        <LoadingContainer>
          <Triangle
            height="50"
            width="50"
            color="#5836bc"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </LoadingContainer>
      ) : (
        <>
          <MenuPageNavBar restaurantName={restaurantInfo?.restaurant.name} themeColor={restaurantInfo?.restaurant.themeColor}/>
          <RestaurantCover img={restaurantInfo?.restaurant.cover}>
            <OuterCircle>
              <Picture src={restaurantInfo?.restaurant.picture} />
            </OuterCircle>
          </RestaurantCover>
          <RestaurantInfoDiv>
            <Info>
              <MainInfo>
                <Name themeColor={restaurantInfo?.restaurant.themeColor}>{restaurantInfo?.restaurant.name}</Name>
                <Rating>
                  {starsArray.map((s) => (
                    <img src={StarImg} />
                  ))}
                </Rating>
              </MainInfo>
              <Address>
                {restaurantInfo?.restaurant.address.street}{" "}
                {restaurantInfo?.restaurant.address.number},{" "}
                {restaurantInfo?.restaurant.address.neighborhood} -{" "}
                {restaurantInfo?.restaurant.address.city}/
                {restaurantInfo?.restaurant.address.state}
              </Address>
            </Info>
          </RestaurantInfoDiv>
          <MenuContainer>
            <Categories
              isAtTop={isAtTop}
              themeColor={restaurantInfo?.restaurant.themeColor}
            >
              <CategoryDiv
                onClick={() => {
                  if (restaurantInfo?.mostOrdered) {
                    setItemsToShow(restaurantInfo?.mostOrdered);
                  }
                  setActiveCategory("OS MAIS PEDIDOS");
                }}
              >
                <CategoryName
                  themeColor={restaurantInfo?.restaurant.themeColor}
                  activeCategory={activeCategory}
                  categoryName="OS MAIS PEDIDOS"
                >
                  OS MAIS PEDIDOS
                </CategoryName>
              </CategoryDiv>
              {restaurantInfo?.restaurant.itemCategories.map((c, i) => {
                return (
                  <>
                    <CategoryDiv
                      onClick={() => {
                        setItemsToShow(c.items);
                        setActiveCategory(c.name);
                      }}
                    >
                      <CategoryName
                        key={i}
                        themeColor={restaurantInfo?.restaurant.themeColor}
                        activeCategory={activeCategory}
                        categoryName={c.name}
                      >
                        {c.name}
                      </CategoryName>
                    </CategoryDiv>
                  </>
                );
              })}
            </Categories>
            <Title themeColor={restaurantInfo?.restaurant.themeColor}>
              {activeCategory}
            </Title>
            <MenuItemsContainer ref={categoriesRef}>
              {itemsToShow.map((i) => (
                <MenuItem
                  item={i}
                  themeColor={restaurantInfo?.restaurant.themeColor}
                />
              ))}
            </MenuItemsContainer>
          </MenuContainer>
        </>
      )}
      <Footer />
    </Container>
  );
}

const Container = styled.div<Theme>`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 68px;
  background-color: #FFF;
  margin-left: auto;
  margin-right: auto;
  /* background-color: ${(props) => `${props.themeColor}`}; */

  @media (max-width: 758px) {
    width: 100%;
    min-height: calc(100vh - 63px - 55px);
    margin-top: 55px;
    margin-bottom: 63px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh) / 2 - 95px);
`;

const RestaurantInfoDiv = styled.div`
  width: 100%;
  height: 73px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9f9f9;
  padding-left: 12px;
  padding-right: 10px;

  @media (max-width: 758px) {
    width: 100%;
  }
`;

const OuterCircle = styled.div `
   width: 108px;
  height: 108px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;

  @media (max-width: 900px) {
    width: 58px;
  height: 58px;
  }
`
const Picture = styled.img`
  width: 105px;
  height: 105px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  @media (max-width: 900px) {
    width: 55px;
  height: 55px;
  }
`;

const Info = styled.div`
  width: calc(100% - 70px);
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const MainInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.p<Theme>`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  /* color: #3e3e3e; */
  color: ${props => props.themeColor}
`;
const Rating = styled.div`
  display: flex;
  gap: 5px;

  img {
    width: 11px;
  }
`;

const Address = styled.p`
  font-family: "Work Sans";
  font-weight: 500;
  font-size: 11px;
  color: #8a8a8a;
`;

const RestaurantCover = styled.div<ImgDivProps>`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => `linear-gradient(180deg, rgba(0, 0, 0, 0) 40.1%, rgba(0, 0, 0, 0.3) 100%), url(${props.img})`};
  background-size: cover;
  background-position: center;


  @media (max-width: 758px) {
    height: 150px;
  }
`;

const MenuContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 171px);
  position: relative;
`;

const Categories = styled.div<CategoriesProps>`
  width: 100%;
  height: 53px;
  display: flex;
  border-width: 0.1px 0px;
  border-style: solid;
  border-color: #ececec;
  position: ${(props) => (props.isAtTop ? "fixed" : "absolute")};
  background-color: #FFFFFF;
  top: ${(props) => (props.isAtTop ? "54px" : "0")};
  left: 0;
  z-index: 5;
  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: -moz-scrollbars-none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryDiv = styled.div`
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  box-sizing: content-box;
  flex-shrink: 0;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 758px) {
    padding: 0 15px;
  }
`;

const CategoryName = styled.p<Theme>`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 13.5px;
  color: ${(props) =>
      props.categoryName === props.activeCategory
        ? `${props.themeColor}`
        : "#6D6D6D"};
`;

const MenuItemsContainer = styled.div`
  width: 100%;
  /* min-height: calc(100vh - 171px); */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 30px;
  gap: 0px;

  @media (max-width: 758px) {
    padding: 20px 10px;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Title = styled.h2<Theme>`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  /* color: ${(props) => props.themeColor}; */
  color: #2b2b2b;
  margin-top: 80px;
  margin-left: 30px;

  @media (max-width: 758px) {
    margin-left: 10px;
    margin-top: 75px;
  }
`;
