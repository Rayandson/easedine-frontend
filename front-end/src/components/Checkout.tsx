import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SlArrowLeft } from "react-icons/sl";
import SelectComponent from "./SelectComponent";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import ordersApi from "../services/ordersApi";
import { Oval } from "react-loader-spinner";
import { RestaurantContext } from "../contexts/RestaurantContext";
import { OrderContext } from "../contexts/OrderContext";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

interface CheckoutProps {
  setCheckoutIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableScrolling?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FinishOrderButtonProps {
  userName: string | undefined | unknown;
  selectedTable: number | undefined | unknown;
  paymentMethod: string | undefined | unknown;
}

export default function Checkout({ setCheckoutIsOpen, setDisableScrolling }: CheckoutProps) {
  const [selectedTable, setSelectedTable] = useState<number | undefined | unknown>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined | unknown>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const restaurantContext = useContext(RestaurantContext);
  const orderContext = useContext(OrderContext);
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate(); 

  const tables = restaurantContext?.restaurant?.restaurantInfo.tables.map((t) => t.number);
  const tablesId = restaurantContext?.restaurant?.restaurantInfo.tables.map((t) => t.id);

  async function finishOrder() {
    setIsLoading(true);
    let tableId;

    if (tables && tablesId) {
      for (let i = 0; i < tables.length; i++) {
        if (tables[i] === selectedTable) {
          tableId = tablesId[i];
          break;
        }
      }
    }

    const items = cartContext?.cart.items.map((i) => {
      return { itemId: i.id, quantity: i.quantity };
    });

    const body = {
      orderInfo: {
        userId: userContext?.user?.id ? userContext?.user?.id : null,
        userName: userName,
        total: cartContext?.cart.total,
        restaurantId: restaurantContext?.restaurant?.restaurantInfo.id,
        tableId: tableId,
      },
      items: items,
    };  

    try {
      const response = await ordersApi.postOrder(body); 
      setIsLoading(false);
      orderContext?.setOrder(response.data.order);
      cartContext?.setShowCart(false);
      cartContext?.setCart({ quantity: 0, total: 0, items: [] });
      navigate(`/restaurants/${restaurantContext?.restaurant?.restaurantInfo.profileName}/order`);
    } catch (err) {
      console.log((err as Error).message);
    }
  } 

  return (
    <>
      <Header>
        <ArrowIcon
          onClick={() => {
            setCheckoutIsOpen(false);
            if (setDisableScrolling) {
              setDisableScrolling(false);
            }
          }}
        >
          <SlArrowLeft />
        </ArrowIcon>
        <CloseIcon onClick={() => setCheckoutIsOpen(false)}>
          <SlArrowLeft />
        </CloseIcon>
        <Title>Checkout</Title>
      </Header>
      <ContentContainer>
        <CheckoutContent>
          <InputWrapper>
            <InputLabel>{"1) Informe seu nome e sobrenome:"}</InputLabel>
            <TextInput userName={userName} setUserName={setUserName} />
          </InputWrapper>
          <TableSelectWrapper>
            <SelectLabel>{"2) Selecione a sua mesa:"}</SelectLabel>
            <SelectComponent values={tables} label="Mesa" state={selectedTable} setState={setSelectedTable} />
          </TableSelectWrapper>
          <PaymentSelectWrapper>
            <SelectLabel>{"3) Selecione a forma de pagamento:"}</SelectLabel>
            <SelectComponent
              values={["Pagar no caixa", "Pix"]}
              label="Pagamento"
              state={paymentMethod}
              setState={setPaymentMethod}
            />
          </PaymentSelectWrapper>
        </CheckoutContent>
      </ContentContainer>
      <Footer>
        <FinishOrderButton
          userName={userName}
          selectedTable={selectedTable}
          paymentMethod={paymentMethod}
          onClick={finishOrder}
          disabled={userName && selectedTable && paymentMethod ? false : true}
        >
          {isLoading ? (
            <Oval
              height={30}
              width={30}
              color="#FEFEFE"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#cfcfcf"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            "Finalizar pedido"
          )}
        </FinishOrderButton>
      </Footer>
    </>
  );
}

const Header = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #0177ff 0%, #2065D1 100%);
  text-align: center;
  margin-bottom: 20px;
`;

const ArrowIcon = styled.div`
  display: none;

  svg {
    font-size: 18px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc((55px / 2) - 9px);

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 600px) {
    display: block;
  }
`;

const CloseIcon = styled.div`
  display: block;

  svg {
    font-size: 20px;
    color: #ffffff;
    position: absolute;
    left: 20px;
    top: calc((55px / 2) - 9px);

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Title = styled.p`
  width: 65%;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`;

const ContentContainer = styled.div`
  width: 100%;
  /* height: 100%; */
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
`;

const CheckoutContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-top: 25px;
`;

const InputLabel = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TableSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const PaymentSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SelectLabel = styled.p`
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const Footer = styled.footer`
  width: 100%;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
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
    /* position: fixed; */
  }
`;

const FinishOrderButton = styled.button<FinishOrderButtonProps>`
  width: 80%;
  max-width: 500px;
  height: 45px;
  background: ${(props) =>
    props.userName && props.selectedTable && props.paymentMethod ? "linear-gradient(120deg, #0177ff 0%, #2065D1 100%)" : "#c0c4c7"};
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;
