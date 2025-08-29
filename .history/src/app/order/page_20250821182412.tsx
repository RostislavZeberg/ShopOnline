'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/slices/cartSlice';
import { IProductTotal } from '@/types/productsTypes';
import styles from './order.module.scss';

// Интерфейс для данных формы
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cash';
  comments: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems || {});
  
  // Получаем все товары из состояния
  const allProducts = useAppSelector((state) => state.productsSlice.items || []);
  
  const [products, setProducts] = useState<{product: IProductTotal, quantity: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
    comments: ''
  });

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

  // Если корзина пуста, перенаправляем на страницу корзины
  useEffect(() => {
    if (Object.keys(cartItems).length === 0 && !isLoading) {
      router.push('/cart');
    }
  }, [cartItems, isLoading, router]);

  // Обработка изменений в форме
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  // Оформление заказа
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Здесь будет логика отправки заказа на сервер
      const orderData = {
        ...formData,
        products: products.map(({ product, quantity }) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity
        })),
        total: calculateTotal()
      };
      
      console.log('Order data:', orderData);
      
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Очистка корзины после успешного оформления
      dispatch(clearCart());
      
      // Перенаправление на страницу успешного оформления
      router.push('/order-success');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return null; // Редирект произойдет в useEffect
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Оформление заказа</h1>
      
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Контактная информация</h2>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>Имя *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>Фамилия *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Адрес доставки</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Адрес *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>Город *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="postalCode" className={styles.label}>Почтовый индекс</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Способ оплаты</h2>
            
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Банковская карта</span>
              </label>
              
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Наличные при получении</span>
              </label>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Комментарий к заказу</h2>
            
            <div className={styles.formGroup}>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className={styles.textarea}
                rows={4}
                placeholder="Дополнительные пожелания к заказу..."
              />
            </div>
          </div>
          
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
          </button>
        </form>
        
        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Ваш заказ</h2>
          
          <div className={styles.summaryItems}>
            {products.map(({ product, quantity }) => (
              <div key={product.id} className={styles.summaryItem}>
                <div className={styles.itemImage}>
                  <Image
                    src={product.image.file.url}
                    alt={product.title}
                    width={60}
                    height={60}
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{product.title}</h3>
                  <p className={styles.itemQuantity}>Количество: {quantity}</p>
                </div>
                
                <div className={styles.itemPrice}>
                  {formatPrice(product.price * quantity)}
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.total}>
            <span>Итого:</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>
          
          <Link 
            href="/cart" 
            className={styles.backLink}
          >
            ← Вернуться в корзину
          </Link>
        </div>
      </div>
    </div>
  );
}