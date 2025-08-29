'use client';

import { addToCart } from '@/services/api';
import { useState } from 'react';


interface ProductActionsProps {
  productId: number;
  available: boolean;
}

export const ProductActions = ({ productId, available }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(String(productId), quantity);
      // Можно добавить уведомление об успешном добавлении
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button 
          style={{
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span style={{ minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
        <button 
          style={{
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setQuantity(prev => prev + 1)}
        >
          +
        </button>
      </div>

      <button
        style={{
          padding: '10px 15px',
          backgroundColor: available ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: available ? 'pointer' : 'not-allowed',
          opacity: isLoading ? 0.7 : 1
        }}
        onClick={handleAddToCart}
        disabled={!available || isLoading}
      >
        {isLoading ? 'Добавляем...' : 'Добавить в корзину'}
      </button>

      {!available && (
        <p style={{ color: '#d82c2c', marginTop: '10px' }}>
          Товар временно отсутствует
        </p>
      )}
    </div>
  );
};