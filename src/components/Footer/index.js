import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a237e;
  color: white;
  padding: 4rem 2rem 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.8rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #b71c1c;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Contato</h3>
          <ul>
            <li>Rua Principal, 123</li>
            <li>Parintins - AM</li>
            <li>CEP: 69151-000</li>
            <li>Tel: (92) 9999-9999</li>
            <li>Email: contato@azfarma.com.br</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Links Úteis</h3>
          <ul>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#promocoes">Promoções</a></li>
            <li><a href="#blog">Blog de Saúde</a></li>
            <li><a href="#trabalhe">Trabalhe Conosco</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Políticas</h3>
          <ul>
            <li><a href="#privacidade">Política de Privacidade</a></li>
            <li><a href="#termos">Termos de Uso</a></li>
            <li><a href="#trocas">Política de Trocas</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Redes Sociais</h3>
          <p>Siga-nos nas redes sociais e fique por dentro das novidades!</p>
          <SocialLinks>
            <a href="#facebook" aria-label="Facebook">FB</a>
            <a href="#instagram" aria-label="Instagram">IG</a>
            <a href="#twitter" aria-label="Twitter">TW</a>
            <a href="#whatsapp" aria-label="WhatsApp">WA</a>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Copyright>
        © {new Date().getFullYear()} AZ Farma. Todos os direitos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 