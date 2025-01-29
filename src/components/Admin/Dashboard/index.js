import React from 'react';
import styled from 'styled-components';
import AdminLayout from '../Layout';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  h3 {
    color: #666;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .value {
    color: #1a237e;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .trend {
    color: ${props => props.trend > 0 ? '#4caf50' : '#f44336'};
    font-size: 0.9rem;
    margin-top: 0.5rem;
    
    &::before {
      content: '${props => props.trend > 0 ? '↑' : '↓'}';
      margin-right: 4px;
    }
  }
`;

const ChartContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  
  h3 {
    color: #1a237e;
    margin-bottom: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    color: #1a237e;
  }
  
  tr:last-child td {
    border-bottom: none;
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
      default:
        return '#333';
    }
  }};
`;

const AdminDashboard = () => {
  const stats = {
    vendas: { valor: 15789.90, trend: 12.5 },
    pedidos: { valor: 156, trend: 8.3 },
    clientes: { valor: 2345, trend: 15.7 },
    produtos: { valor: 489, trend: -2.1 }
  };

  const recentOrders = [
    { id: 1, cliente: 'João Silva', valor: 289.90, status: 'Pendente', data: '28/01/2024' },
    { id: 2, cliente: 'Maria Santos', valor: 567.80, status: 'Confirmado', data: '28/01/2024' },
    { id: 3, cliente: 'Pedro Oliveira', valor: 189.90, status: 'Enviado', data: '27/01/2024' },
    { id: 4, cliente: 'Ana Costa', valor: 459.90, status: 'Entregue', data: '27/01/2024' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <Grid>
        <Card trend={stats.vendas.trend}>
          <h3>Vendas do Mês</h3>
          <div className="value">R$ {stats.vendas.valor.toFixed(2)}</div>
          <div className="trend">{stats.vendas.trend}% em relação ao mês anterior</div>
        </Card>
        
        <Card trend={stats.pedidos.trend}>
          <h3>Pedidos do Mês</h3>
          <div className="value">{stats.pedidos.valor}</div>
          <div className="trend">{stats.pedidos.trend}% em relação ao mês anterior</div>
        </Card>
        
        <Card trend={stats.clientes.trend}>
          <h3>Total de Clientes</h3>
          <div className="value">{stats.clientes.valor}</div>
          <div className="trend">{stats.clientes.trend}% em relação ao mês anterior</div>
        </Card>
        
        <Card trend={stats.produtos.trend}>
          <h3>Produtos em Estoque</h3>
          <div className="value">{stats.produtos.valor}</div>
          <div className="trend">{stats.produtos.trend}% em relação ao mês anterior</div>
        </Card>
      </Grid>

      <ChartContainer>
        <h3>Vendas dos Últimos 7 Dias</h3>
        {/* Aqui você pode adicionar um componente de gráfico */}
        <div style={{ height: '300px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Gráfico de Vendas
        </div>
      </ChartContainer>

      <ChartContainer>
        <h3>Pedidos Recentes</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.cliente}</td>
                <td>R$ {order.valor.toFixed(2)}</td>
                <td><Status status={order.status}>{order.status}</Status></td>
                <td>{order.data}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ChartContainer>
    </AdminLayout>
  );
};

export default AdminDashboard; 