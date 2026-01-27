import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { OrdersState, Order, CartItem } from '@/types/restaurant.types';

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (
    orderData: {
      items: CartItem[];
      totalAmount: number;
      deliveryAddress: string;
      deliveryType: 'delivery' | 'pickup';
      paymentMethod: 'cash' | 'card' | 'mobile';
      specialInstructions?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const orderNumber = `ORD${Date.now().toString().slice(-8)}`;
      
      const order: Order = {
        id: `order_${Date.now()}`,
        userId: 'current_user_id', // Will be replaced with actual user ID
        items: orderData.items.map(item => ({
          mealId: item.mealId,
          mealName: item.mealName,
          quantity: item.quantity,
          price: item.mealPrice,
          total: item.mealPrice * item.quantity,
        })),
        totalAmount: orderData.totalAmount,
        deliveryAddress: orderData.deliveryAddress,
        deliveryType: orderData.deliveryType,
        status: 'pending',
        paymentMethod: orderData.paymentMethod,
        paymentStatus: 'pending',
        orderNumber,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes from now
        specialInstructions: orderData.specialInstructions,
      };
      
      return order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock orders - will be replaced with API call
      const mockOrders: Order[] = [
        {
          id: 'order_1',
          userId: 'user_1',
          items: [
            { mealId: '1', mealName: 'StreetWise Burger', quantity: 2, price: 76.99, total: 153.98 },
            { mealId: '2', mealName: 'Chicken Listern', quantity: 1, price: 26.99, total: 26.99 },
          ],
          totalAmount: 180.97,
          deliveryAddress: '159 Marshal Str, Pol, Limp',
          deliveryType: 'delivery',
          status: 'delivered',
          paymentMethod: 'card',
          paymentStatus: 'paid',
          orderNumber: 'ORD12345678',
          createdAt: '2024-01-15T10:30:00Z',
          estimatedDelivery: '2024-01-15T11:15:00Z',
        },
      ];
      
      return mockOrders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { setCurrentOrder, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;