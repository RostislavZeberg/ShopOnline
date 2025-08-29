'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart, removeFromCart, removeAllOfItem } from '@/store/slices/cartSlice';
import { IProductTotal } from '@/types/productsTypes';
import styles from './cart.module.scss';

export default function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems || {});
  
  // Получаем все товары из состояния (предполагая, что они хранятся в productsSlice)
  const allProducts = useAppSelector((state) => state.productsSlice.items || []);
  
  const [products, setProducts] = useState<{product: IProductTotal, quantity: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка данных о товарах в корзине
  useEffect(() => {
    setIsLoading(true);
    try {
      const productData = [];
      for (const [productId, quantity] of Object.entries(cartItems)) {
        const product = allProducts.find(p => p.id === parseInt(productId));
        if (product) {
          productData.push({ product, quantity });
        }
      }
      setProducts(productData);
    } catch (error) {
      console.error('Error loading cart products:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cartItems, allProducts]);

  // Функции для управления количеством товаров
  const handleIncrement = (productId: number) => {
    dispatch(addToCart(productId));
  };

  const handleDecrement = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleRemoveAll = (productId: number) => {
    dispatch(removeAllOfItem(productId));
  };

  // Вычисление общей стоимости
  const calculateTotal = () => {
    return products.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка корзины...</div>
      </div>
    );
  }

  return (
    <div className={`${styles.cart} container`}>
      <h1 className={styles.title}>Корзина</h1>
      
      {products.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2 className={styles.emptyTitle}>Ваша корзина пуста</h2>
          <p className={styles.emptyText}>Добавьте товары из каталога, чтобы сделать заказ</p>
          <Link 
            href="/" 
            className={styles.catalogLink}
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.items}>
            {products.map(({ product, quantity }) => (
              <div key={product.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image
                    src={product.image.file.url}
                    alt={product.title}
                    width={120}
                    height={120}
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.itemInfo}>
                  <Link href={`/product/${product.id}`} className={styles.itemTitle}>
                    {product.title}
                  </Link>
                  <p className={styles.itemCategory}>Категория: {product.category.title}</p>
                  
                  <div className={styles.itemColors}>
                    <span>Цвет: </span>
                    {product.colors.map((color) => (
                      <span
                        key={color.id}
                        className={styles.colorMarker}
                        style={{ backgroundColor: color.code }}
                        title={color.title}
                      />
                    ))}
                  </div>
                </div>
                
                <div className={styles.itemControls}>
                  <div className={styles.quantity}>
                    <button
                      onClick={() => handleDecrement(product.id)}
                      className={styles.quantityButton}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      onClick={() => handleIncrement(product.id)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className={styles.price}>
                    {formatPrice(product.price * quantity)}
                  </div>
                  
                  <button
                    onClick={() => handleRemoveAll(product.id)}
                    className={styles.removeButton}
                    title="Удалить товар"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Ваш заказ</h2>
            
            <div className={styles.summaryItems}>
              {products.map(({ product, quantity }) => (
                <div key={product.id} className={styles.summaryItem}>
                  <span>{product.title} × {quantity}</span>
                  <span>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.total}>
              <span>Итого:</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            
            <button 
              className={styles.checkoutButton}
              onClick={() => router.push('/checkout')}
            >
              Оформить заказ
            </button>
            
            <Link 
              href="/" 
              className={styles.continueShopping}
            >
              ← Продолжить покупки
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}