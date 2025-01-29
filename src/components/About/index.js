import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a237e 0%, #b71c1c 100%);
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BenefitCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const About = () => {
  const benefits = [
    {
      title: 'Envio Rápido',
      description: 'Entrega expressa para toda Parintins, garantindo que você receba seus medicamentos o mais rápido possível.'
    },
    {
      title: 'Atendimento Especializado',
      description: 'Nossa equipe de farmacêuticos está sempre pronta para tirar suas dúvidas e oferecer o melhor atendimento.'
    },
    {
      title: 'Produtos de Qualidade',
      description: 'Trabalhamos apenas com produtos de marcas reconhecidas e aprovadas pela ANVISA.'
    }
  ];

  return (
    <AboutSection>
      <Container>
        <Title>Sobre a AZ Farma</Title>
        <Description>
          A AZ Farma nasceu da união entre tradição e inovação, inspirada nas cores e na força cultural dos bois Garantido e Caprichoso. 
          Nossa missão é proporcionar saúde e bem-estar para todos os parintinenses, com produtos de qualidade e atendimento humanizado. 
          Somos mais que uma farmácia - somos parte da comunidade.
        </Description>
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </AboutSection>
  );
};

export default About; 