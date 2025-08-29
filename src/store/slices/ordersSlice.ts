import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductTotal } from '@/types/productsTypes';

export interface OrderItem {
  product: IProductTotal;
  quantity: number;
  orderDate: string;
  orderId: string;
  status: 'pending' | 'completed' | 'cancelled';
  totalPrice: number;
}

interface OrdersState {
  orders: OrderItem[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderItem>) => {
      state.orders.push(action.payload);
    },
    setOrders: (state, action: PayloadAction<OrderItem[]>) => {
      state.orders = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, setOrders, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;