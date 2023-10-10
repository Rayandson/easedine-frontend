import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Cart from "../components/Cart";
import ProgressBar from "../components/ProgressBar";
import { OrderContext } from "../contexts/OrderContext";
import ordersApi from "../services/ordersApi";
import { Triangle } from "react-loader-spinner";
import CashIcon from "../assets/images/cash_outline.svg";
import TimeIcon from "../assets/images/time_icon.svg";
import { OrderResponse } from "../types";

export default function OrderPage() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const orderContext = useContext(OrderContext);
  // const [orderStatus, setOrderStatus] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [order, setOrder] = useState<OrderResponse>();

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, []);

  async function fetchOrder() {
    if (orderContext?.order?.id) {
      const orderResponse = await ordersApi.getOrder(orderContext.order.id);
      orderContext.setOrder(orderResponse.data);
      setIsLoading(false);
    }
  }

  function status() {
    switch (orderContext?.order?.status) {
      case "ORDERED":
        return (
          <>
            <Msg>Aguardando o início do preparo.</Msg>
            <ProgressBarWrapper>
              <ProgressBar />
              <EmptyProgressBar />
            </ProgressBarWrapper>
          </>
        );
      case "PREPARING":
        return (
          <>
            <Msg>O seu pedido está sendo preparado.</Msg>
            <ProgressBarWrapper>
              <FullProgressBar />
              <ProgressBar />
            </ProgressBarWrapper>
          </>
        );
      case "FINISHED":
        return (
          <>
            <Msg>
              O seu pedido está pronto! <br />
              Aguarde o garçom.
            </Msg>
            <ProgressBarWrapper>
              <FullProgressBar />
              <FullProgressBar />
            </ProgressBarWrapper>
          </>
        );
      default:
        return "";
    }
  }

  return (
    <Container>
      <NavBar />
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
          <Header>Acompanhe o seu pedido</Header>
          {status()}
          <div className="w-[90%] md:w-[554px] mt-[50px] mb-[60px] flex flex-col px-[20px] md:px-[40px] py-[30px] md:py-[40px] bg-white rounded-[10px] shadow-custom">
            <div className="w-full flex gap-[10px] items-center mb-[26px]">
              <img
                className="w-[45px] rounded-[50%] border border-black border-opacity-10"
                src={orderContext?.order?.Restaurant.picture}
              />
              <p className="w-36 text-neutral-700 text-[17.5px] font-medium font-['Inter'] leading-normal">
                {orderContext?.order?.Restaurant.name}
              </p>
            </div>
            <h2 className="w-40 h-[23px] mb-[26px] text-neutral-700 text-base font-medium font-['Inter'] leading-none">
              Detalhes do pedido
            </h2>
            <div className="flex flex-col gap-[11px] mb-[22px]">
              <div className="w-full flex justify-between">
                <p className="mb-[4px] text-neutral-400 text-base font-normal font-['Inter'] leading-none">Itens</p>
                <p className="text-neutral-400 text-base font-normal font-['Inter'] leading-none">Preço</p>
              </div>
              {orderContext?.order?.items.map((item) => {
                return (
                  <div key={item.itemInfo.id} className="w-full flex justify-between">
                    <p className="text-center text-neutral-700 text-sm font-normal font-['Inter'] leading-none">
                      <span>{item.quantity}x</span> {item.itemInfo.itemName}
                    </p>
                    <p className="text-center text-neutral-700 text-sm font-normal font-['Inter'] leading-none">
                      R$ {(item.itemInfo.price / 100).toFixed(2).toString().replace(".", ",")}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-between mb-[26px]">
              <p className="text-zinc-800 text-base font-medium font-['Inter'] leading-none">TOTAL</p>
              <p className="text-center text-neutral-700 text-sm font-medium font-['Inter'] leading-none">R$ {orderContext?.order?.total && (orderContext?.order?.total / 100).toFixed(2).toString().replace(".", ",")}</p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <p className="mb-[4px] text-neutral-400 text-base font-normal font-['Inter'] leading-none">Pagamento</p>
              <div className="flex items-center gap-[10px]">
                <img src={CashIcon} alt="cash icon" />
                <p className="text-neutral-700 text-sm font-normal font-['Inter'] leading-none">Pagar no caixa</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <img src={TimeIcon} alt="cash icon" />
                <p className="text-neutral-700 text-sm font-normal font-['Inter'] leading-none">
                  {orderContext?.order?.isPaid ? "Pago" : "Pagamento ainda não realizado"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer setScrollPosition={setScrollPosition} />
      <Cart scrollPosition={scrollPosition} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 75px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 75px;
  padding: 40px 0;
  background: #f9fafb;

  @media (max-width: 758px) {
    margin-top: 0px;
  }
`;

const Header = styled.h1`
  font-family: "Work Sans";
  font-weight: 500;
  font-size: 24px;
  color: #000000;
  text-align: center;
  margin-bottom: 70px;

  @media (max-width: 780px) {
    margin-bottom: 60px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: calc((100vh) / 2 - 88px);
`;

const Msg = styled.p`
  width: 85vw;
  font-family: "Work Sans";
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  text-align: center;
  margin-bottom: 40px;
`;
const ProgressBarWrapper = styled.div`
  width: 554px;
  display: flex;
  justify-content: center;
  gap: 3px;

  @media(max-width: 600px) {
    width: 100%;
  }
`;

const EmptyProgressBar = styled.div`
  width: 43%;
  height: 4px;
  background-color: #d6d6d6;

  @media (min-width: 600px) {
    width: 30%;
  }

  @media (min-width: 960px) {
    width: 276px;
  }
`;

const FullProgressBar = styled.div`
  width: 43%;
  height: 4px;
  background-color: #1976d2;

  @media (min-width: 600px) {
    width: 30%;
  }

  @media (min-width: 960px) {
    width: 276px;
  }
`;
