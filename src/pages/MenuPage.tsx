import React, { useContext } from 'react';
import styled from 'styled-components';
import MenuPageNavBar from '../components/NavBar/MenuPageNavBar';
import MenuItem from '../components/MenuItem';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import restaurantsApi from '../services/restaurantsApi';
import { MenuItemType, MostOrdered, RestaurantInfo } from '../types';
import StarImg from '../assets/images/star.svg';
import { Triangle } from 'react-loader-spinner';
import AddItemDiv from '../components/AddItemDiv';
import Cart from "../components/Cart";
import { CartContext } from '../contexts/CartContext';

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
  showCart: boolean | undefined;
}

interface MenuContainerProps {
  isScreenUp: boolean;
}

export default function MenuPage() {
  const { profileName } = useParams();
  const [itemsToShow, setItemsToShow] = useState<MenuItemType[] | MostOrdered>([]);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>();
  const [isAtTop, setIsAtTop] = useState(false);
  const [activeCategory, setActiveCategory] = useState('OS MAIS PEDIDOS');
  const [isLoading, setIsLoading] = useState(true);
  const [isScreenUp, setIsScreenUp] = useState(false);
  const cartContext = useContext(CartContext);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  async function fetchRestaurant() {
    if (profileName) {
      const response = await restaurantsApi.getRestaurantInfo(profileName);

      setRestaurantInfo(response.data);
      setItemsToShow(response.data.mostOrdered);
      setIsLoading(false);
    }
  }

  const starsArray = [];
  if (restaurantInfo?.restaurant.rating) {
    for (let i = 1; i <= restaurantInfo?.restaurant.rating; i++) {
      starsArray.push(i);
    }
  }

  return (
    <Container themeColor={restaurantInfo?.restaurant.themeColor} isScreenUp={isScreenUp} showCart={cartContext?.showCart}>
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
          <MenuPageNavBar
            restaurantName={restaurantInfo?.restaurant.name}
            themeColor={restaurantInfo?.restaurant.themeColor}
          />
          <RestaurantCover img={restaurantInfo?.restaurant.cover}>
            <OuterCircle>
              <Picture src={restaurantInfo?.restaurant.picture} onClick={() => setIsScreenUp(true)} />
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
                {restaurantInfo?.restaurant.address.street} {restaurantInfo?.restaurant.address.number},{' '}
                {restaurantInfo?.restaurant.address.neighborhood} - {restaurantInfo?.restaurant.address.city}/
                {restaurantInfo?.restaurant.address.state}
              </Address>
            </Info>
          </RestaurantInfoDiv>
          <MenuContainer isScreenUp={isScreenUp}>
            <Categories isAtTop={isAtTop} themeColor={restaurantInfo?.restaurant.themeColor}>
              <CategoryDiv
                onClick={() => {
                  if (restaurantInfo?.mostOrdered) {
                    setItemsToShow(restaurantInfo?.mostOrdered);
                  }
                  setActiveCategory('OS MAIS PEDIDOS');
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
            <Title themeColor={restaurantInfo?.restaurant.themeColor}>{activeCategory}</Title>
            <MenuItemsContainer ref={categoriesRef}>
              {itemsToShow.map((i) => (
                <MenuItem item={i} themeColor={restaurantInfo?.restaurant.themeColor} setIsScreenUp={setIsScreenUp} />
              ))}
            </MenuItemsContainer>
          </MenuContainer>
        </>
      )}
      <AddItemDiv isScreenUp={isScreenUp} setIsScreenUp={setIsScreenUp}/>
      <Footer />
      <Cart />
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  margin-top: 68px;

  @media (max-width: 758px) {
    width: 100%;
    /* height: ${props => props.isScreenUp || props.showCart ? 'calc(100vh - 63px - 55px)' : 'auto'}; */
    height: calc(100vh - 63px - 55px);
    position: absolute;
    top: 55px;
    overflow-y: ${props => props.isScreenUp || props.showCart ? 'hidden' : 'auto'};
    margin-top: 0px;
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
  font-family: 'Work Sans';
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
  font-family: 'Work Sans';
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
  background: ${(props) =>
    `linear-gradient(180deg, rgba(0, 0, 0, 0) 40.1%, rgba(0, 0, 0, 0.3) 100%), url(${props.img})`};
  background-size: cover;
  background-position: center;

  @media (max-width: 758px) {
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
  position: ${(props) => (props.isAtTop ? 'fixed' : 'absolute')};
  background-color: #ffffff;
  top: ${(props) => (props.isAtTop ? '54px' : '0')};
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
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 13.5px;
  color: ${(props) => (props.categoryName === props.activeCategory ? `${props.themeColor}` : '#6D6D6D')};
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
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  /* color: ${(props) => props.themeColor}; */
  color: #2b2b2b;
  margin-top: 80px;
  margin-left: 30px;

  @media (max-width: 758px) {
    margin-left: 10px;
    margin-top: 75px;
  }
`;

