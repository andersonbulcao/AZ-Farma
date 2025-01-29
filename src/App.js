import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

// Componentes do site
import Header from './components/Header';
import Banner from './components/Banner';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Footer from './components/Footer';

// Componentes administrativos
import AdminLogin from './components/Admin/Login';
import AdminDashboard from './components/Admin/Dashboard';
import AdminProducts from './components/Admin/Products';
import AdminCategories from './components/Admin/Categories';
import AdminOrders from './components/Admin/Orders';
import AdminUsers from './components/Admin/Users';
import AdminPromotions from './components/Admin/Promotions';
import AdminSettings from './components/Admin/Settings';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    scroll-behavior: smooth;
  }
`;

// Componente para proteger rotas administrativas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Componente para a página inicial
const Home = () => (
  <>
    <Header />
    <Banner />
    <FeaturedProducts />
    <About />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Rotas do site */}
        <Route path="/" element={<Home />} />
        
        {/* Rotas administrativas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/produtos" 
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/categorias" 
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/pedidos" 
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/usuarios" 
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/promocoes" 
          element={
            <ProtectedRoute>
              <AdminPromotions />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/configuracoes" 
          element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirecionar para o dashboard se tentar acessar /admin */}
        <Route 
          path="/admin" 
          element={<Navigate to="/admin/dashboard" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
