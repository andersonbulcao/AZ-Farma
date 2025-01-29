import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  background-color: #1a237e;
  color: white;
  padding: 2rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
`;

const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: #b71c1c;
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

const PageTitle = styled.h2`
  color: #1a237e;
`;

const LogoutButton = styled.button`
  background-color: #b71c1c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c62828;
  }
`;

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>AZ Farma Admin</Logo>
        <Menu>
          <MenuItem to="/admin/dashboard">Dashboard</MenuItem>
          <MenuItem to="/admin/produtos">Produtos</MenuItem>
          <MenuItem to="/admin/categorias">Categorias</MenuItem>
          <MenuItem to="/admin/pedidos">Pedidos</MenuItem>
          <MenuItem to="/admin/usuarios">Usuários</MenuItem>
          <MenuItem to="/admin/promocoes">Promoções</MenuItem>
          <MenuItem to="/admin/configuracoes">Configurações</MenuItem>
        </Menu>
      </Sidebar>
      <MainContent>
        <Header>
          <PageTitle>{title}</PageTitle>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </Header>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default AdminLayout; 