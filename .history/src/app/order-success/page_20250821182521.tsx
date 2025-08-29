'use client';
import Link from 'next/link';
import styles from './order-success.module.scss';

export default function OrderSuccessPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Заказ успешно оформлен!</h1>
        <p className={styles.message}>
          Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.
          Номер вашего заказа: <strong>#{Math.floor(Math.random() * 1000000)}</strong>
        </p>
        <div className={styles.actions}>
          <Link href="/catalog" className={styles.continueShopping}>
            Продолжить покупки
          </Link>
          <Link href="/orders" className={styles.viewOrders}>
            Мои заказы
          </Link>
        </div>
      </div>
    </div>
  );
}