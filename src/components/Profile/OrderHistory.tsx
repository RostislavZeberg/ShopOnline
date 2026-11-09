// src\components\Profile\OrderHistory.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./profile.module.scss";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    // Для демо используем моковые данные
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          date: "2024-01-15",
          total: 12500,
          status: "delivered",
          items: [
            { name: "Смартфон", quantity: 1, price: 12000 },
            { name: "Чехол", quantity: 1, price: 500 }
          ]
        },
        {
          id: "ORD-002",
          date: "2024-01-10",
          total: 4500,
          status: "shipped",
          items: [
            { name: "Наушники", quantity: 1, price: 4500 }
          ]
        }
      ];
      
      const storedOrders = localStorage.getItem("userOrders");
      const userOrders = storedOrders ? JSON.parse(storedOrders) : mockOrders;
      setOrders(userOrders);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      pending: "Ожидает оплаты",
      processing: "В обработке",
      shipped: "Отправлен",
      delivered: "Доставлен",
      cancelled: "Отменен"
    };
    return statusMap[status];
  };

  const getStatusClass = (status: Order["status"]) => {
    const classMap = {
      pending: styles.statusPending,
      processing: styles.statusProcessing,
      shipped: styles.statusShipped,
      delivered: styles.statusDelivered,
      cancelled: styles.statusCancelled
    };
    return classMap[status];
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.orderHistory}>
      <h2>История заказов</h2>
      
      {orders.length === 0 ? (
        <div className={styles.emptyOrders}>
          <p>У вас пока нет заказов</p>
          <button className={`btn-reset ${styles.btn} ${styles.shopBtn}`}>
            Начать покупки
          </button>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderItem}>
              <div className={styles.orderHeader}>
                <div>
                  <h3>Заказ #{order.id}</h3>
                  <p className={styles.orderDate}>{new Date(order.date).toLocaleDateString('ru-RU')}</p>
                </div>
                <div className={styles.orderTotal}>
                  <span className={styles.totalLabel}>Сумма:</span>
                  <span className={styles.totalAmount}>{order.total.toLocaleString()} ₽</span>
                </div>
              </div>
              
              <div className={styles.orderDetails}>
                <div className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                  {getStatusText(order.status)}
                </div>
                
                <div className={styles.orderItems}>
                  <h4>Товары:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItemRow}>
                      <span>{item.name}</span>
                      <span>{item.quantity} × {item.price.toLocaleString()} ₽</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.orderActions}>
                <button className={`btn-reset ${styles.btn} ${styles.detailsBtn}`}>
                  Детали заказа
                </button>
                {order.status === "delivered" && (
                  <button className={`btn-reset ${styles.btn} ${styles.repeatBtn}`}>
                    Повторить заказ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};