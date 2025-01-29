import React, { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from '../Layout';

const Container = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  h2 {
    color: #1a237e;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 600px;
  
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
  
  .description {
    font-size: 0.875rem;
    color: #666;
  }
`;

const Button = styled.button`
  background-color: #1a237e;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #283593;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: #1a237e;
    }
    
    &:checked + span:before {
      transform: translateX(26px);
    }
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
    
    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }
`;

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'AZ Farma',
    storeEmail: 'contato@azfarma.com.br',
    storePhone: '(92) 9999-9999',
    storeAddress: 'Rua Principal, 123',
    storeCity: 'Parintins',
    storeState: 'AM',
    storeZipCode: '69151-000',
    enableRegistration: true,
    enableCheckout: true,
    enableReviews: true,
    minimumOrderValue: 50,
    shippingFee: 10,
    freeShippingThreshold: 150,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    analyticsCode: '',
    pixKey: '',
    bankAccount: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      whatsapp: ''
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementar salvamento das configurações
    alert('Configurações salvas com sucesso!');
  };

  return (
    <AdminLayout title="Configurações">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Section>
            <h2>Informações da Loja</h2>
            <Grid>
              <FormGroup>
                <label>Nome da Loja</label>
                <input
                  type="text"
                  name="storeName"
                  value={settings.storeName}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Email</label>
                <input
                  type="email"
                  name="storeEmail"
                  value={settings.storeEmail}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Telefone</label>
                <input
                  type="tel"
                  name="storePhone"
                  value={settings.storePhone}
                  onChange={handleChange}
                />
              </FormGroup>
            </Grid>
            <Grid>
              <FormGroup>
                <label>Endereço</label>
                <input
                  type="text"
                  name="storeAddress"
                  value={settings.storeAddress}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Cidade</label>
                <input
                  type="text"
                  name="storeCity"
                  value={settings.storeCity}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Estado</label>
                <input
                  type="text"
                  name="storeState"
                  value={settings.storeState}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>CEP</label>
                <input
                  type="text"
                  name="storeZipCode"
                  value={settings.storeZipCode}
                  onChange={handleChange}
                />
              </FormGroup>
            </Grid>
          </Section>

          <Section>
            <h2>Configurações de Vendas</h2>
            <Grid>
              <FormGroup>
                <label>Valor Mínimo do Pedido</label>
                <input
                  type="number"
                  name="minimumOrderValue"
                  value={settings.minimumOrderValue}
                  onChange={handleChange}
                />
                <span className="description">Valor mínimo para realizar um pedido</span>
              </FormGroup>
              <FormGroup>
                <label>Taxa de Entrega</label>
                <input
                  type="number"
                  name="shippingFee"
                  value={settings.shippingFee}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Valor para Frete Grátis</label>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  value={settings.freeShippingThreshold}
                  onChange={handleChange}
                />
              </FormGroup>
            </Grid>
          </Section>

          <Section>
            <h2>Pagamentos</h2>
            <Grid>
              <FormGroup>
                <label>Chave PIX</label>
                <input
                  type="text"
                  name="pixKey"
                  value={settings.pixKey}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Dados Bancários</label>
                <textarea
                  name="bankAccount"
                  value={settings.bankAccount}
                  onChange={handleChange}
                  rows="3"
                />
              </FormGroup>
            </Grid>
          </Section>

          <Section>
            <h2>Redes Sociais</h2>
            <Grid>
              <FormGroup>
                <label>Facebook</label>
                <input
                  type="url"
                  name="socialMedia.facebook"
                  value={settings.socialMedia.facebook}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Instagram</label>
                <input
                  type="url"
                  name="socialMedia.instagram"
                  value={settings.socialMedia.instagram}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>Twitter</label>
                <input
                  type="url"
                  name="socialMedia.twitter"
                  value={settings.socialMedia.twitter}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <label>WhatsApp</label>
                <input
                  type="tel"
                  name="socialMedia.whatsapp"
                  value={settings.socialMedia.whatsapp}
                  onChange={handleChange}
                />
              </FormGroup>
            </Grid>
          </Section>

          <Section>
            <h2>Configurações do Sistema</h2>
            <Grid>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="enableRegistration"
                      checked={settings.enableRegistration}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Permitir Cadastro de Usuários
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="enableCheckout"
                      checked={settings.enableCheckout}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Habilitar Checkout
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="enableReviews"
                      checked={settings.enableReviews}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Permitir Avaliações
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Modo Manutenção
                </label>
              </FormGroup>
            </Grid>
          </Section>

          <Section>
            <h2>Notificações</h2>
            <Grid>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Notificações por Email
                </label>
              </FormGroup>
              <FormGroup>
                <label>
                  <ToggleSwitch>
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleChange}
                    />
                    <span></span>
                  </ToggleSwitch>
                  {' '}Notificações por SMS
                </label>
              </FormGroup>
            </Grid>
          </Section>

          <Button type="submit">Salvar Configurações</Button>
        </Form>
      </Container>
    </AdminLayout>
  );
};

export default AdminSettings; 