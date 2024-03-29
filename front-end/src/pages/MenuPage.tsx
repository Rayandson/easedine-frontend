import React, { useContext } from "react";
import styled from "styled-components";
import MenuPageNavBar from "../components/NavBar/MenuPageNavBar";
import MenuItem from "../components/MenuItem";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import restaurantsApi from "../services/restaurantsApi";
import { MenuItemType, MostOrdered } from "../types";
import StarImg from "../assets/images/star.svg";
import { Triangle } from "react-loader-spinner";
import AddItemDiv from "../components/AddItemDiv";
import Cart from "../components/Cart";
import { CartContext } from "../contexts/CartContext";
import { RestaurantContext } from "../contexts/RestaurantContext";

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

interface ContainerProps {
  themeColor: string | undefined;
  isScreenUp: boolean;
  disableScrolling: boolean;
  showCart: boolean | undefined;
}

interface MainProps {
  isLoading: boolean;
}

interface MenuContainerProps {
  isScreenUp: boolean;
  disableScrolling: boolean;
}

export default function MenuPage() {
  const { profileName } = useParams();
  const [itemsToShow, setItemsToShow] = useState<MenuItemType[] | MostOrdered>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const restaurantContext = useContext(RestaurantContext);
  const [isAtTop, setIsAtTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Os mais pedidos");
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenUp, setIsScreenUp] = useState(false);
  const [disableScrolling, setDisableScrolling] = useState(false);
  const cartContext = useContext(CartContext);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (categoriesRef.current !== null) {
        const elementTop = categoriesRef.current.getBoundingClientRect().top;
        const isTop = elementTop <= 145;
        setIsAtTop(isTop);
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

      restaurantContext?.setRestaurant(response.data);

      setItemsToShow(response.data.mostOrdered);
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  const starsArray = [1];
  if (restaurantContext?.restaurant?.restaurantInfo) {
    for (let i = 1; i <= restaurantContext?.restaurant?.restaurantInfo.rating; i++) {
      starsArray.push(i);
    }
  }

  return (
    <Main isLoading>
      <Container
        themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}
        isScreenUp={isScreenUp}
        disableScrolling={disableScrolling}
        showCart={cartContext?.showCart}
      >
        {isLoading ? (
          <LoadingContainer>
            <Triangle
              height="50"
              width="50"
              color="#2065D1"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              visible={true}
            />
          </LoadingContainer>
        ) : (
          <>
            <MenuPageNavBar
              restaurantName={restaurantContext?.restaurant?.restaurantInfo.name}
              themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}
            />
            <RestaurantCover img={restaurantContext?.restaurant?.restaurantInfo.cover}>
              <OuterCircle>
                <Picture
                  src={restaurantContext?.restaurant?.restaurantInfo.picture}
                  onClick={() => setIsScreenUp(true)}
                />
              </OuterCircle>
            </RestaurantCover>
            <RestaurantInfoDiv>
              <Info>
                <MainInfo>
                  <Name themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}>
                    {restaurantContext?.restaurant?.restaurantInfo.name}
                  </Name>
                  <Rating>
                    {starsArray.map((s, index) => (
                      <img key={index} src={StarImg} />
                    ))}
                  </Rating>
                </MainInfo>
                <Address>
                  {restaurantContext?.restaurant?.restaurantInfo.address.street}{" "}
                  {restaurantContext?.restaurant?.restaurantInfo.address.number},{" "}
                  {restaurantContext?.restaurant?.restaurantInfo.address.neighborhood} -{" "}
                  {restaurantContext?.restaurant?.restaurantInfo.address.city}/
                  {restaurantContext?.restaurant?.restaurantInfo.address.state}
                </Address>
              </Info>
            </RestaurantInfoDiv>
            <MenuContainer isScreenUp={isScreenUp} disableScrolling={disableScrolling}>
              <Categories isAtTop={isAtTop} themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}>
                <CategoryDiv
                  onClick={() => {
                    if (restaurantContext?.restaurant?.mostOrdered) {
                      setItemsToShow(restaurantContext?.restaurant.mostOrdered);
                    }
                    setActiveCategory("Os mais pedidos");
                  }}
                >
                  <CategoryName
                    themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}
                    activeCategory={activeCategory}
                    categoryName="Os mais pedidos"
                  >
                    Os mais pedidos
                  </CategoryName>
                </CategoryDiv>
                {restaurantContext?.restaurant?.restaurantInfo.itemCategories.map((c, i) => {
                  return (
                    <CategoryDiv
                      key={i}
                      onClick={() => {
                        setItemsToShow(c.items);
                        setActiveCategory(c.name);
                      }}
                    >
                      <CategoryName
                        themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}
                        activeCategory={activeCategory}
                        categoryName={c.name}
                      >
                        {c.name}
                      </CategoryName>
                    </CategoryDiv>
                  );
                })}
              </Categories>
              <Title themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}>{activeCategory}</Title>
              <MenuItemsContainer ref={categoriesRef}>
                {itemsToShow.map((i, index) => (
                  <MenuItem
                    item={i}
                    key={index}
                    themeColor={restaurantContext?.restaurant?.restaurantInfo.themeColor}
                    setIsScreenUp={setIsScreenUp}
                    setDisableScrolling={setDisableScrolling}
                    setScrollPosition={setScrollPosition}
                  />
                ))}
              </MenuItemsContainer>
            </MenuContainer>
          </>
        )}
        <AddItemDiv
          isScreenUp={isScreenUp}
          setIsScreenUp={setIsScreenUp}
          setDisableScrolling={setDisableScrolling}
          scrollPosition={scrollPosition}
        />
        <Footer setDisableScrolling={setDisableScrolling} setScrollPosition={setScrollPosition} />
        <Cart setDisableScrolling={setDisableScrolling} scrollPosition={scrollPosition} />
      </Container>
    </Main>
  );
}

const Main = styled.div<MainProps>`
  width: 100vw;
  min-height: ${props => props.isLoading ? "100vh" : "calc(100vh - 75px)"};
  background: #f9fafb;
`;

const Container = styled.div<ContainerProps>`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 75px;

  @media (max-width: 758px) {
    width: 100%;
    height: ${(props) => (props.disableScrolling ? "calc(100vh - 63px - 55px)" : "auto")};
    /* height: calc(100vh - 63px - 55px); */
    position: ${(props) => (props.disableScrolling ? "absolute" : "static")};
    /* position: absolute; */
    top: 0;
    overflow-y: ${(props) => (props.disableScrolling ? "hidden" : "auto")};
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
  background: #fff;
  padding-left: 12px;
  padding-right: 10px;

  @media (max-width: 758px) {
    width: 100%;
  }
`;

const OuterCircle = styled.div`
  width: 128px;
  height: 128px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 900px) {
    width: 58px;
    height: 58px;
  }
`;
const Picture = styled.img`
  width: 125px;
  height: 125px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  @media (max-width: 900px) {
    width: 55px;
    height: 55px;
  }
`;

const Info = styled.div`
  width: 100%;
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
  color: ${(props) => props.themeColor};
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
  height: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    `linear-gradient(180deg, rgba(0, 0, 0, 0) 40.1%, rgba(0, 0, 0, 0.3) 100%), url(${props.img})`};
  background-size: cover;
  background-position: center;

  @media (max-width: 758px) {
    height: 150px;
    min-height: 150px;
  }
`;

const MenuContainer = styled.div<MenuContainerProps>`
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
  background-color: #ffffff;
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
  font-weight: 600;
  font-size: 14.5px;
  color: ${(props) => (props.categoryName === props.activeCategory ? `${props.themeColor}` : "#6D6D6D")};
`;

const MenuItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 0px;
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
  font-weight: 600;
  font-size: 17px;
  color: ${(props) => props.themeColor};
  /* color: #2b2b2b; */
  margin-top: 80px;
  margin-left: 30px;

  @media (max-width: 758px) {
    margin-left: 10px;
    margin-top: 75px;
  }
`;
