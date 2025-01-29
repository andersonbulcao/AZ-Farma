import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a237e 0%, #b71c1c 100%);
  padding: 1rem;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.h1`
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  background: linear-gradient(45deg, #fff 30%, #f5f5f5 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MenuItems = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 0 10px rgba(255,255,255,0.5);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
  
  input {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    width: 200px;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>AZ Farma</Logo>
        <MenuItems>
          <MenuItem>Home</MenuItem>
          <MenuItem>Sobre</MenuItem>
          <MenuItem>Produtos</MenuItem>
          <MenuItem>Contato</MenuItem>
          <MenuItem>Promoções</MenuItem>
        </MenuItems>
        <SearchBar>
          <input type="text" placeholder="Buscar produtos..." />
          <button>Buscar</button>
        </SearchBar>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 