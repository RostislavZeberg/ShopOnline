'use client';

import { useState } from 'react';

import styles from './ProductActions.module.scss';
import { addToCart } from '@/services/api';

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
    <div className={styles.actions}>
      <div className={styles.quantity}>
        <button 
          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      </div>

      <button
        className={styles.add_to_cart}
        onClick={handleAddToCart}
        disabled={!available || isLoading}
      >
        {isLoading ? 'Добавляем...' : 'Добавить в корзину'}
      </button>

      {!available && (
        <p className={styles.not_available}>Товар временно отсутствует</p>
      )}
    </div>
  );
};