import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CartContext } from '../contexts/CartContext';

interface ImageProps {
  img: string | null;
}

interface CartProps {
  itemData: {
    id: number | undefined;
    itemName: string | undefined;
    image: string | null;
    description: string | undefined;
    price: number | null;
    type: string | undefined;
    quantity: number | undefined;
  };
}

interface ItemType {
  id: number | undefined;
    itemName: string | undefined;
    image: string | null;
    description: string | undefined;
    price: number | null;
    type: string | undefined;
    quantity: number | undefined;
}

export default function CartItem({ itemData }:CartProps) {
  const [counter, setCounter] = useState(itemData.quantity);
  const cartContext = useContext(CartContext);

  function handleCounter(action: string) {
    if (action === 'increase') {
      if(counter) setCounter(counter + 1);
      if (cartContext && itemData.price && itemData.quantity) {
        const cartCurrentQuantity = cartContext.cart.quantity;
        const itemIndex = findIndex(itemData, cartContext.cart.items);
        const newObject = {...itemData, quantity: itemData.quantity + 1}
        const filteredArray = cartContext.cart.items.filter((i) => i.id !== itemData.id ? true : false);
        filteredArray.splice(itemIndex, 0, newObject)
        cartContext.setCart({ items: filteredArray, total: cartContext.cart.total + itemData.price, quantity: cartCurrentQuantity + 1 });
      }
    } else {
      if (counter && counter > 1) {
        setCounter(counter - 1);
        if (cartContext && itemData.price && itemData.quantity) {
          const cartCurrentQuantity = cartContext.cart.quantity;
          const itemIndex = findIndex(itemData, cartContext.cart.items);
          const newObject = {...itemData, quantity: itemData.quantity - 1}
          const filteredArray = cartContext.cart.items.filter((i) => i.id !== itemData.id ? true : false);
          filteredArray.splice(itemIndex, 0, newObject);
          cartContext.setCart({items: filteredArray, total: cartContext.cart.total - itemData.price, quantity: cartCurrentQuantity - 1 });
        }
      } 
    }
  }

  function findIndex(item: ItemType, array: ItemType[]) {
    for(let i=0; i < array.length; i++) {
      if(item.id === array[i].id) {
        return i;
      }
    }
    return -1;
  }

  function removeItem() {
    if(itemData.quantity && itemData.price && cartContext?.cart.items) {
      const newArray = cartContext.cart.items.filter((i) => {
        if(i.id !== itemData.id) return true;
        return false;
      })
      cartContext.setCart({ items: newArray, total: cartContext.cart.total - (itemData.quantity * itemData.price), quantity: cartContext.cart.quantity - itemData.quantity})
    }
  }

  return (
    <Container>
      <Image img={itemData.image} />
      <MainContent>
        <Info>
          <Name>{itemData.itemName}</Name>
          <Price>{itemData.price ? `R$ ${(itemData.price/100).toFixed(2)}` : ''}</Price>
        </Info>
        <ButtonsWrapper>
          <QuantityContainer>
            <AiOutlineMinus onClick={() => handleCounter('decrease')} />
            <Quantity>{counter}</Quantity>
            <AiOutlinePlus onClick={() => handleCounter('increase')} />
          </QuantityContainer>
          <RemoveButton onClick={() => removeItem()}>Remover item</RemoveButton>
        </ButtonsWrapper>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 0 8px;
`;

const MainContent = styled.div`
  width: 75%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Image = styled.div<ImageProps>`
  width: 80px;
  height: 80px;
  background: ${(props) => (props.img ? `url(${props.img})` : 'none')};
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Name = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #1d1d1d;
`;

const Price = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #1d1d1d;
  flex-shrink: 0;
  margin-right: 5px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const RemoveButton = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: red;
  margin-right: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const QuantityContainer = styled.div`
  width: 20%;
  min-width: 90px;
  max-width: 120px;
  height: 35px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: solid 1px #e4e4e4;
  border-radius: 3px;

  svg {
    font-size: 14px;
    color: #5e2bc4;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Quantity = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
`;
