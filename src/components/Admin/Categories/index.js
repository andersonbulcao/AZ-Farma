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
  
  input, textarea {
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

const AdminCategories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Medicamentos',
      description: 'Medicamentos em geral',
      active: true,
      productCount: 45
    },
    {
      id: 2,
      name: 'Vitaminas',
      description: 'Suplementos e vitaminas',
      active: true,
      productCount: 30
    },
    {
      id: 3,
      name: 'Cosméticos',
      description: 'Produtos de beleza',
      active: true,
      productCount: 25
    }
  ]);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleToggleStatus = (categoryId) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, active: !category.active }
        : category
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (editingCategory) {
      // Atualizar categoria existente
      setCategories(categories.map(category =>
        category.id === editingCategory.id
          ? {
              ...category,
              name: formData.get('name'),
              description: formData.get('description')
            }
          : category
      ));
    } else {
      // Adicionar nova categoria
      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          name: formData.get('name'),
          description: formData.get('description'),
          active: true,
          productCount: 0
        }
      ]);
    }
    
    setShowModal(false);
  };

  return (
    <AdminLayout title="Gerenciar Categorias">
      <Container>
        <ActionBar>
          <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Produtos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <Badge 
                    active={category.active}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggleStatus(category.id)}
                  >
                    {category.active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </td>
                <td>{category.productCount}</td>
                <td>
                  <Button onClick={() => handleEditCategory(category)}>
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteCategory(category.id)}
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
            <h2>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Nome</label>
                <input 
                  type="text" 
                  name="name"
                  defaultValue={editingCategory?.name} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Descrição</label>
                <textarea 
                  name="description"
                  rows="4" 
                  defaultValue={editingCategory?.description}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button 
                  variant="danger" 
                  type="button" 
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingCategory ? 'Salvar' : 'Adicionar'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminCategories; 