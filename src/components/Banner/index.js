import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.section`
  position: relative;
  height: 500px;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('https://source.unsplash.com/random/1920x1080/?pharmacy') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 800px;
  
  h2 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: #1a237e;
    color: white;
    
    &:hover {
      background-color: #283593;
    }
  }
  
  &.secondary {
    background-color: #b71c1c;
    color: white;
    
    &:hover {
      background-color: #c62828;
    }
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <Content>
        <h2>Bem-vindo à AZ Farma</h2>
        <p>Cuide da sua saúde com a AZ Farma - Sua farmácia de confiança em Parintins</p>
        <ButtonGroup>
          <Button className="primary">Ver Produtos</Button>
          <Button className="secondary">Conheça as Promoções</Button>
        </ButtonGroup>
      </Content>
    </BannerContainer>
  );
};

export default Banner; 