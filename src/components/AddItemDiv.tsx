import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { SlArrowDown } from 'react-icons/sl';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ChosenItemContext } from '../contexts/ChosenItemContext';
import { CartContext } from '../contexts/CartContext';

interface ContainerProps {
  isScreenUp: boolean;
}

interface ImgDivProps {
  img: string | null | undefined;
}

interface AddItemDivProps {
  isScreenUp: boolean;
  setIsScreenUp: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableScrolling: React.Dispatch<React.SetStateAction<boolean>>;
  scrollPosition: number;
}

export default function AddItemDiv({ isScreenUp, setIsScreenUp, setDisableScrolling, scrollPosition }: AddItemDivProps) {
  const [counter, setCounter] = useState(1);
  const [note, setNote] = useState("");
  const chosenItemContext = useContext(ChosenItemContext);
  const cartContext = useContext(CartContext);

  function handleCounter(action: string) {
    if (action === 'increase') {
      setCounter(counter + 1);
    } else {
      if (counter > 1) setCounter(counter - 1);
    }
  }

  function addItem() {
    setIsScreenUp(false);
    if(cartContext && chosenItemContext?.chosenItem) {
      const items = [...cartContext.cart.items, {id: chosenItemContext.chosenItem.id, itemName:  chosenItemContext.chosenItem.itemName, image:  chosenItemContext.chosenItem.image, description:  chosenItemContext.chosenItem.description, note: note, price:  chosenItemContext.chosenItem.price, type:  chosenItemContext.chosenItem.type, quantity: counter}]
      if(chosenItemContext.chosenItem.price) {
        const totalPrice = chosenItemContext.chosenItem.price * counter;
        cartContext.setCart({quantity: cartContext.cart.quantity + counter, total: cartContext.cart.total + totalPrice, items: items})
      }
    }
    setNote("");
    setTimeout(() => setCounter(1), 500);
  }

  return (
    <Container isScreenUp={isScreenUp}>
      <Header>
        <SlArrowDown
          onClick={() => {
            setIsScreenUp(false);
            setDisableScrolling(false)
            setTimeout(() => setCounter(1), 500);
            setTimeout(() => window.scrollTo(0, scrollPosition), 50)
          }}
        />
        <Title>{chosenItemContext?.chosenItem?.itemName}</Title>
      </Header>
      <ContentContainer>
      <Content>
        <ImgDiv img={chosenItemContext?.chosenItem?.image} />
        <ItemName>{chosenItemContext?.chosenItem?.itemName}</ItemName>
        <Description>{chosenItemContext?.chosenItem?.description}</Description>
        <Price>
          R$ {chosenItemContext?.chosenItem?.price ? (chosenItemContext?.chosenItem?.price / 100).toFixed(2) : '0,00'}
        </Price>
        <NoteLabel>Alguma observação?</NoteLabel>
        <Note value={note} onChange={(e) => setNote(e.target.value)}/>
      </Content>
      </ContentContainer>
      <Footer>
        <CounterContainer>
          <AiOutlineMinus onClick={() => handleCounter('decrease')} />
          <Quantity>{counter}</Quantity>
          <AiOutlinePlus onClick={() => handleCounter('increase')} />
        </CounterContainer>
        <AddButton
          onClick={() => addItem()}
        >
          Adicionar
        </AddButton>
      </Footer>
    </Container>
  );
}

const Container = styled.div<ContainerProps>`
  width: 50vw;
  max-width: 600px;
  height: 80%;
  background-color: #ffffff;
  z-index: 100;
  position: fixed;
  bottom: ${(props) => (props.isScreenUp ? '10vh' : '-100vh')};
  left: calc(50% - 300px);
  transition: bottom 0.3s ease-in-out;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1200px) {
    left: calc(50% - 25vw);
  }

  @media (max-width: 600px) {
    width: 100vw;
    height: 100%;
    left: 0;
    bottom: ${(props) => (props.isScreenUp ? '0' : '-100vh')};
  }
`;

const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  top: 0;
  left: 0; */
  background-color: #5e2bc4;
  text-align: center;
  margin-bottom: 20px;

  svg {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc((55px/2) - 9px);

    &:hover {
      cursor: pointer;
    }
  }
`;

const Title = styled.p`
  width: 65%;
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

const ContentContainer = styled.div`
width: 100%;
height: calc(100% - 55px - 83px);
margin-bottom: 83px;
padding: 20px 30px 50px 30px;
overflow-y: scroll;
-ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: -moz-scrollbars-none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    padding: 0 12px;
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: red; */
`;

const ImgDiv = styled.div<ImgDivProps>`
  width: 450px;
  height: 280px;
  background: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 280px;
    height: 40%;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 40%;
    flex-shrink: 0;
  }
`;

const ItemName = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #1d1d1d;
  margin-top: 18px;
`;

const Description = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: grey;
  margin-top: 18px;
`;

const Price = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #1d1d1d;
  margin-top: 18px;
`;

const NoteLabel = styled.p`
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: grey;
  margin-top: 48px;
`;

const Note = styled.textarea`
  width: 100%;
  height: 12vh;
  outline: none;
  border: solid 1px #cac9c9;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 5px 10px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
  box-shadow: 0px -2px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 0 18px;

  @media (max-width: 600px) {
    width: 100vw;
    height: 83px;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
`;

const CounterContainer = styled.div`
  width: 30%;
  min-width: 90px;
  max-width: 120px;
  height: 45px;
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

const AddButton = styled.button`
  width: 65%;
  max-width: 500px;
  height: 45px;
  background-color: #5e2bc4;
  border: none;
  border-radius: 5px;

  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
