import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../Layout';

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
  }
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'danger' ? '#b71c1c' : '#1a237e'};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? '#c62828' : '#283593'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    color: #1a237e;
  }
  
  tr:hover {
    background-color: #f8f8f8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: bold;
    color: #333;
  }
  
  input, select {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #1a237e;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.active ? '#43a047' : '#c62828'};
`;

const AdminUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(92) 98888-8888',
      role: 'Cliente',
      active: true,
      lastLogin: '28/01/2024'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(92) 97777-7777',
      role: 'Admin',
      active: true,
      lastLogin: '28/01/2024'
    }
  ]);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, active: !user.active }
        : user
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (editingUser) {
      // Atualizar usuário existente
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? {
              ...user,
              name: formData.get('name'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              role: formData.get('role')
            }
          : user
      ));
    } else {
      // Adicionar novo usuário
      setUsers([
        ...users,
        {
          id: users.length + 1,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          role: formData.get('role'),
          active: true,
          lastLogin: '-'
        }
      ]);
    }
    
    setShowModal(false);
  };

  return (
    <AdminLayout title="Gerenciar Usuários">
      <Container>
        <ActionBar>
          <SearchInput placeholder="Buscar usuário..." />
          <Button onClick={handleAddUser}>Adicionar Usuário</Button>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Função</th>
              <th>Status</th>
              <th>Último Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <Badge 
                    active={user.active}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <Button onClick={() => handleEditUser(user)}>
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Nome</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={editingUser?.name} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  defaultValue={editingUser?.email} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Telefone</label>
                <input 
                  type="tel" 
                  name="phone"
                  defaultValue={editingUser?.phone} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Função</label>
                <select 
                  name="role"
                  defaultValue={editingUser?.role}
                >
                  <option value="Cliente">Cliente</option>
                  <option value="Admin">Administrador</option>
                  <option value="Vendedor">Vendedor</option>
                </select>
              </FormGroup>
              {!editingUser && (
                <FormGroup>
                  <label>Senha</label>
                  <input 
                    type="password" 
                    name="password"
                    required 
                  />
                </FormGroup>
              )}
              <ButtonGroup>
                <Button 
                  variant="danger" 
                  type="button" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingUser ? 'Salvar' : 'Adicionar'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminUsers; 