import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a237e 0%, #b71c1c 100%);
  padding: 20px;
`;

const LoginBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  color: #1a237e;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #1a237e;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #283593;
  }
  
  &:disabled {
    background-color: #9fa8da;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #b71c1c;
  text-align: center;
  margin-top: 1rem;
`;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Aqui você implementará a lógica de autenticação
      // Por enquanto, vamos simular um login básico
      if (email === 'admin@azfarma.com' && password === 'admin123') {
        // Login bem-sucedido
        localStorage.setItem('adminToken', 'dummy-token');
        window.location.href = '/admin/dashboard';
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Title>Login Administrativo</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
      </LoginBox>
    </LoginContainer>
  );
};

export default AdminLogin; 