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
  
  input, textarea, select {
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

const AdminProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Vitamina C 1000mg',
      price: 49.90,
      category: 'Vitaminas',
      stock: 100
    },
    // Adicione mais produtos conforme necessário
  ]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de salvar produto
    setShowModal(false);
  };

  return (
    <AdminLayout title="Gerenciar Produtos">
      <Container>
        <ActionBar>
          <Button onClick={handleAddProduct}>Adicionar Produto</Button>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>R$ {product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>
                  <Button onClick={() => handleEditProduct(product)}>Editar</Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeleteProduct(product.id)}
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
            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Nome</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Preço</label>
                <input 
                  type="number" 
                  step="0.01" 
                  defaultValue={editingProduct?.price} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Categoria</label>
                <select defaultValue={editingProduct?.category}>
                  <option value="Vitaminas">Vitaminas</option>
                  <option value="Medicamentos">Medicamentos</option>
                  <option value="Cosméticos">Cosméticos</option>
                  <option value="Higiene">Higiene</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Estoque</label>
                <input 
                  type="number" 
                  defaultValue={editingProduct?.stock} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Descrição</label>
                <textarea rows="4" defaultValue={editingProduct?.description} />
              </FormGroup>
              <FormGroup>
                <label>Imagem</label>
                <input type="file" accept="image/*" />
              </FormGroup>
              <ButtonGroup>
                <Button variant="danger" type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Salvar' : 'Adicionar'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminProducts; 