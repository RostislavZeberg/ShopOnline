'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { OrderItem } from '@/store/slices/ordersSlice';
import styles from './orders.module.scss';

export const Orders = () => {
  const orders = useAppSelector((state) => state.ordersSlice.orders || []);
  const [groupedOrders, setGroupedOrders] = useState<Record<string, OrderItem[]>>({});
  const currentCurrency = useAppSelector((state) => state.currencySlice.currentCurrency);

  useEffect(() => {
    // Группируем заказы по orderId
    const grouped = orders.reduce((acc, order) => {
      if (!acc[order.orderId]) {
        acc[order.orderId] = [];
      }
      acc[order.orderId].push(order);
      return acc;
    }, {} as Record<string, OrderItem[]>);

    setGroupedOrders(grouped);
  }, [orders]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateOrderTotal = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (orders.length === 0) {
    return (
      <div className={`${styles.orders} container`}>
        <h1 className={styles.title}>Мои заказы</h1>
        <div className={styles.empty}>
          <p>У вас пока нет заказов</p>
          <Link href="/" className={styles.link}>
            Перейти к покупкам
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.orders} container`}>
      <h1 className={styles.title}>Мои заказы</h1>

      <div className={styles.ordersList}>
        {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
          <div key={orderId} className={styles.order}>
            <div className={styles.orderHeader}>
              <div className={styles.orderInfo}>
                <h2>Заказ #{orderId.split('-')[1]}</h2>
                <p className={styles.orderDate}>{formatDate(orderItems[0].orderDate)}</p>
                <p className={styles.orderStatus}>
                  Статус: {getStatusText(orderItems[0].status)}
                </p>
              </div>
              <div className={styles.orderTotal}>
                Итого: {new Intl.NumberFormat('ru-RU').format(calculateOrderTotal(orderItems))} {currentCurrency.symbol}
              </div>
            </div>

            <div className={styles.orderItems}>
              {orderItems.map((item, index) => (
                <div key={index} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.product.image.file.url}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className={styles.image}
                    />
                  </div>

                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.product.title}</h3>
                    <p className={styles.itemCategory}>{item.product.category.title}</p>
                    <p className={styles.itemQuantity}>Количество: {item.quantity}</p>
                    <p className={styles.itemPrice}>
                      Цена: {new Intl.NumberFormat('ru-RU').format(item.product.price * currentCurrency.rate)} {currentCurrency.symbol}
                    </p>
                  </div>

                  <div className={styles.itemTotal}>
                    {new Intl.NumberFormat('ru-RU').format(item.totalPrice)} {currentCurrency.symbol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Link href={'/'} className={`${styles['btn-orders']} btn btn-reset`}>← Продолжить покупки</Link>
    </div>
  );
}

function getStatusText(status: string) {
  const statusMap: Record<string, string> = {
    'pending': 'В обработке',
    'completed': 'Завершен',
    'cancelled': 'Отменен'
  };
  return statusMap[status] || status;
}