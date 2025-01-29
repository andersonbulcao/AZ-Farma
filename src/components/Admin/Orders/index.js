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

const FilterSelect = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-left: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a237e;
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

const Status = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: ${props => {
    switch (props.status) {
      case 'Pendente':
        return '#fff3e0';
      case 'Confirmado':
        return '#e8f5e9';
      case 'Enviado':
        return '#e3f2fd';
      case 'Entregue':
        return '#e8eaf6';
      case 'Cancelado':
        return '#ffebee';
      default:
        return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Pendente':
        return '#f57c00';
      case 'Confirmado':
        return '#43a047';
      case 'Enviado':
        return '#1976d2';
      case 'Entregue':
        return '#1a237e';
      case 'Cancelado':
        return '#c62828';
      default:
        return '#333';
    }
  }};
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
  max-height: 90vh;
  overflow-y: auto;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DetailSection = styled.div`
  h3 {
    color: #1a237e;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0.25rem 0;
  }
`;

const ProductList = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  
  .product-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders] = useState([
    {
      id: 1,
      customer: 'João Silva',
      date: '28/01/2024',
      total: 289.90,
      status: 'Pendente',
      items: [
        { id: 1, name: 'Vitamina C 1000mg', quantity: 2, price: 49.90 },
        { id: 2, name: 'Protetor Solar FPS 50', quantity: 1, price: 89.90 }
      ],
      address: {
        street: 'Rua Principal, 123',
        city: 'Parintins',
        state: 'AM',
        zipCode: '69151-000'
      },
      payment: {
        method: 'Cartão de Crédito',
        status: 'Aprovado'
      }
    },
    // Adicione mais pedidos conforme necessário
  ]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // Implementar atualização de status
    setShowModal(false);
  };

  return (
    <AdminLayout title="Gerenciar Pedidos">
      <Container>
        <ActionBar>
          <div>
            <SearchInput placeholder="Buscar pedido..." />
            <FilterSelect>
              <option value="">Todos os status</option>
              <option value="Pendente">Pendente</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Enviado">Enviado</option>
              <option value="Entregue">Entregue</option>
              <option value="Cancelado">Cancelado</option>
            </FilterSelect>
          </div>
        </ActionBar>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>R$ {order.total.toFixed(2)}</td>
                <td><Status status={order.status}>{order.status}</Status></td>
                <td>
                  <Button onClick={() => handleViewOrder(order)}>
                    Ver Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showModal && selectedOrder && (
        <Modal>
          <ModalContent>
            <h2>Detalhes do Pedido #{selectedOrder.id}</h2>
            <OrderDetails>
              <DetailSection>
                <h3>Informações do Cliente</h3>
                <p><strong>Nome:</strong> {selectedOrder.customer}</p>
                <p><strong>Data do Pedido:</strong> {selectedOrder.date}</p>
              </DetailSection>

              <DetailSection>
                <h3>Endereço de Entrega</h3>
                <p>{selectedOrder.address.street}</p>
                <p>{selectedOrder.address.city} - {selectedOrder.address.state}</p>
                <p>CEP: {selectedOrder.address.zipCode}</p>
              </DetailSection>

              <DetailSection>
                <h3>Produtos</h3>
                <ProductList>
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="product-item">
                      <div>
                        <strong>{item.name}</strong>
                        <p>Quantidade: {item.quantity}</p>
                      </div>
                      <div>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </ProductList>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Total:</strong> R$ {selectedOrder.total.toFixed(2)}
                </p>
              </DetailSection>

              <DetailSection>
                <h3>Pagamento</h3>
                <p><strong>Método:</strong> {selectedOrder.payment.method}</p>
                <p><strong>Status:</strong> {selectedOrder.payment.status}</p>
              </DetailSection>

              <DetailSection>
                <h3>Status do Pedido</h3>
                <select 
                  defaultValue={selectedOrder.status}
                  style={{ padding: '0.5rem', marginTop: '0.5rem' }}
                  onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value)}
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Confirmado">Confirmado</option>
                  <option value="Enviado">Enviado</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </DetailSection>

              <ButtonGroup>
                <Button 
                  variant="danger" 
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </Button>
                <Button onClick={() => window.print()}>
                  Imprimir
                </Button>
              </ButtonGroup>
            </OrderDetails>
          </ModalContent>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default AdminOrders; 