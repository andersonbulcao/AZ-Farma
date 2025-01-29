import React from 'react';
import styled from 'styled-components';

const ProductsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f5f5f5;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: #1a237e;
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f8f8f8;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    margin: 0 0 0.5rem;
    color: #333;
  }
  
  .price {
    color: #1a237e;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #666;
    font-size: 1rem;
  }
`;

const BuyButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #c62828;
  }
`;

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Vitamina C 1000mg',
      price: 49.90,
      originalPrice: 69.90,
      image: 'https://source.unsplash.com/random/400x400/?vitamin'
    },
    {
      id: 2,
      name: 'Protetor Solar FPS 50',
      price: 89.90,
      originalPrice: 119.90,
      image: 'https://source.unsplash.com/random/400x400/?sunscreen'
    },
    {
      id: 3,
      name: 'Ômega 3',
      price: 69.90,
      originalPrice: 89.90,
      image: 'https://source.unsplash.com/random/400x400/?omega'
    },
    {
      id: 4,
      name: 'Colágeno Hidrolisado',
      price: 79.90,
      originalPrice: 99.90,
      image: 'https://source.unsplash.com/random/400x400/?collagen'
    }
  ];

  return (
    <ProductsSection>
      <SectionTitle>Produtos em Destaque</SectionTitle>
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id}>
            <ProductImage>
              <img src={product.image} alt={product.name} />
            </ProductImage>
            <ProductInfo>
              <h3>{product.name}</h3>
              <div className="original-price">
                De: R$ {product.originalPrice.toFixed(2)}
              </div>
              <div className="price">
                Por: R$ {product.price.toFixed(2)}
              </div>
            </ProductInfo>
            <BuyButton>Comprar Agora</BuyButton>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ProductsSection>
  );
};

export default FeaturedProducts; 