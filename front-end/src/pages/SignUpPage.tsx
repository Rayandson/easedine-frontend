import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/images/logo-blue.svg";
import { Link, useNavigate } from "react-router-dom";
import { signUpBody } from "../types";
import { Oval } from "react-loader-spinner";
import usersApi from "../services/usersApi";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const defaultFormData: signUpBody = {
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
    password: "",
  };

  const [formData, setFormaData] = useState(defaultFormData);

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsLoading(true);

      await usersApi.signUpUser(formData);

      setIsLoading(false);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormaData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Container>
      <HeaderDiv>
        <Link to="/"><Logo src={LogoImg} /></Link>
        <Title>Cadastre-se agora</Title>
        {/* <div id="buttonDiv"></div>  GOOGLE VAI VIR AQUI*/}
        <p>{"Entrar com o google"}</p>
      </HeaderDiv>
      <ContentDivisor>
        <div></div>
        <p>ou</p>
        <div></div>
      </ContentDivisor>
      <Form onSubmit={signUp}>
        <DoubleInputContainer>
          <SmallInputContainer>
            <InputTitle>Nome</InputTitle>
            <SmallInput placeholder="Nome" name="firstName" required onChange={handleChange} />
          </SmallInputContainer>
          <SmallInputContainer>
            <InputTitle>Sobrenome</InputTitle>
            <SmallInput placeholder="Sobrenome" name="lastName" required onChange={handleChange} />
          </SmallInputContainer>
        </DoubleInputContainer>
        <InputContainer>
          <InputTitle>Informe o seu email</InputTitle>
          <Input placeholder="Informe o email" type="email" name="email" required onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <InputTitle>Informe seu CPF</InputTitle>
          <Input placeholder="Digite seu CPF" name="cpf" required onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <InputTitle>Crie uma senha</InputTitle>
          <Input placeholder="Crie uma senha" type="password" name="password" required onChange={handleChange} />
        </InputContainer>
        <Button>
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
            "Cadastrar"
          )}
        </Button>
      </Form>
      <Footer>
        Já tem um conta?{" "}
        <Link to="/signin" style={{ color: "#2065D1", textDecoration: "none" }}>
          Faça Login
        </Link>
      </Footer>
    </Container>
  );
} 

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 52px;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 35px;
`;
const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 42px;
`;
const ContentDivisor = styled.div`
  width: 384px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
  margin: 42px 0;
  div {
    width: 160px;
    height: 1px;
    background-color: #cccccc;
  }
  p {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #7f7f7f;
  }

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  margin-bottom: 40px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const SmallInputContainer = styled.div`
    width: 220px;
    height: 75px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 0;

    @media (max-width: 500px) {
    width: 48%;
  }
`

const DoubleInputContainer = styled.div`
    width: 450px;
    height: 75px;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 500px) {
    width: 100%;
  }
`

const SmallInput = styled.input`
    width: 100%;
    height: 48px;
    background-color: #F7F8F9;
  border: 1px solid #f0f0f0;
    border-radius: 4px;
    padding-left: 14px;
    flex-shrink: 0;

    &::placeholder {
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #6A6A6A;
    }
` 

const InputContainer = styled.div`
  width: 450px;
  height: 75px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const InputTitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #000000;
`;
const Input = styled.input`
  width: 100%;
  height: 48px;
  background-color: #F7F8F9;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding-left: 14px;
  &::placeholder {
    font-family: "Poppins", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: #99a3ad;
  }
`;

const Button = styled.button`
  width: 286px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #0177ff 0%, #2065D1 100%);
  border-radius: 500px;
  border: none;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
  }
`;

const Footer = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #000000;
  margin-bottom: 60px;
`;
