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
  max-width: 600px;
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

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => props.active ? '#e8f5e9' : '#ffebee'};
  color: ${props => props.active ? '#43a047' : '#c62828'};
`;

const AdminPromotions = () => {
  const [showModal, setShowModal] = useState(false);
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: 'Semana da Saúde',
      description: 'Até 50% de desconto em vitaminas',
      discountType: 'percentage',
      discountValue: 50,
      startDate: '2024-01-28',
      endDate: '2024-02-04',
      active: true,
      categories: ['Vitaminas'],
      minimumPurchase: 100
    },
    {
      id: 2,
      title: 'Frete Grátis',
      description: 'Frete grátis para compras acima de R$ 150',
      discountType: 'shipping',
      discountValue: 100,
      startDate: '2024-01-28',
      endDate: '2024-02-28',
      active: true,
      categories: ['Todos'],
      minimumPurchase: 150
    }
  ]);
  const [editingPromotion, setEditingPromotion] = useState(null);

  const handleAddPromotion = () => {
    setEditingPromotion(null);
    setShowModal(true);
  };

  const handleEditPromotion = (promotion) => {
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleDeletePromotion = (promotionId) => {
    if (window.confirm('Tem certeza que deseja excluir esta promoção?')) {
      setPromotions(promotions.filter(p => p.id !== promotionId));
    }
  };

  const handleToggleStatus = (promotionId) => {
    setPromotions(promotions.map(promotion => 
      promotion.id === promotionId 
        ? { ...promotion, active: !promotion.active }
        : promotion
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const promotionData = {
      title: formData.get('title'),
      description: formData.get('description'),
      discountType: formData.get('discountType'),
      discountValue: Number(formData.get('discountValue')),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      categories: formData.get('categories').split(',').map(c => c.trim()),
      minimumPurchase: Number(formData.get('minimumPurchase'))
    };

    if (editingPromotion) {
      // Atualizar promoção existente
      setPromotions(promotions.map(promotion =>
        promotion.id === editingPromotion.id
          ? { ...promotion, ...promotionData }
          : promotion
      ));
    } else {
      // Adicionar nova promoção
      setPromotions([
        ...promotions,
        {
          id: promotions.length + 1,
          ...promotionData,
          active: true
        }
      ]);
    }
    
    setShowModal(false);
  };

  return (
    <AdminLayout title="Gerenciar Promoções">
      <Container>
        <ActionBar>
          <Button onClick={handleAddPromotion}>Adicionar Promoção</Button>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Período</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map(promotion => (
              <tr key={promotion.id}>
                <td>
                  <strong>{promotion.title}</strong>
                  <br />
                  <small>{promotion.description}</small>
                </td>
                <td>
                  {promotion.discountType === 'percentage' ? 'Desconto %' : 'Frete Grátis'}
                </td>
                <td>
                  {promotion.discountType === 'percentage' 
                    ? `${promotion.discountValue}%` 
                    : `R$ ${promotion.discountValue.toFixed(2)}`
                  }
                </td>
                <td>
                  {new Date(promotion.startDate).toLocaleDateString()} até
                  <br />
                  {new Date(promotion.endDate).toLocaleDateString()}
                </td>
                <td>
                  <Badge 
                    active={promotion.active}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggleStatus(promotion.id)}
                  >
                    {promotion.active ? 'Ativa' : 'Inativa'}
                  </Badge>
                </td>
                <td>
                  <Button onClick={() => handleEditPromotion(promotion)}>
                    Editar
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => handleDeletePromotion(promotion.id)}
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
            <h2>{editingPromotion ? 'Editar Promoção' : 'Nova Promoção'}</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label>Título</label>
                <input 
                  type="text" 
                  name="title"
                  defaultValue={editingPromotion?.title} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Descrição</label>
                <textarea 
                  name="description"
                  rows="3"
                  defaultValue={editingPromotion?.description}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Tipo de Desconto</label>
                <select 
                  name="discountType"
                  defaultValue={editingPromotion?.discountType}
                >
                  <option value="percentage">Desconto em Porcentagem</option>
                  <option value="shipping">Frete Grátis</option>
                </select>
              </FormGroup>
              <FormGroup>
                <label>Valor do Desconto</label>
                <input 
                  type="number" 
                  name="discountValue"
                  defaultValue={editingPromotion?.discountValue}
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Data de Início</label>
                <input 
                  type="date" 
                  name="startDate"
                  defaultValue={editingPromotion?.startDate}
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Data de Término</label>
                <input 
                  type="date" 
                  name="endDate"
                  defaultValue={editingPromotion?.endDate}
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Categorias (separadas por vírgula)</label>
                <input 
                  type="text" 
                  name="categories"
                  defaultValue={editingPromotion?.categories.join(', ')}
                  required 
                />
              </FormGroup>
              <FormGroup>
                <label>Valor Mínimo de Compra</label>
                <input 
                  type="number" 
                  name="minimumPurchase"
                  defaultValue={editingPromotion?.minimumPurchase}
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
                  {editingPromotion ? 'Salvar' : 'Adicionar'}
                </Button>
              </ButtonGroup>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminPromotions; 