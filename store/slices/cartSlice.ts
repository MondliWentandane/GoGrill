// store/slices/cartSlice.ts - COMPLETE UPDATED VERSION
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Meal } from '@/types/restaurant.types';

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
  deliveryAddress: '159 Marshal Str, Pol, Limp',
  deliveryType: 'delivery',
};

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (meal: Meal, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      return meal;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }: { itemId: string; quantity: number }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return { itemId, quantity };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId: string, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return itemId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.mealPrice * item.quantity), 0);
  return { totalItems, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setDeliveryAddress: (state, action: PayloadAction<string>) => {
      state.deliveryAddress = action.payload;
    },
    setDeliveryType: (state, action: PayloadAction<'delivery' | 'pickup'>) => {
      state.deliveryType = action.payload;
    },
    updateCartItemLocal: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
      const { itemId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        
        const { totalItems, totalAmount } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Meal>) => {
        const meal = action.payload;
        const existingItem = state.items.find(item => item.mealId === meal.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          const newCartItem: CartItem = {
            id: `cart_${Date.now()}`,
            mealId: meal.id,
            mealName: meal.name,
            mealDescription: meal.description,
            mealPrice: meal.price,
            mealImage: meal.image, // This is a string URL
            quantity: 1,
            addedAt: new Date().toISOString(),
          };
          state.items.push(newCartItem);
        }
        
        const { totalItems, totalAmount } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
      })
      
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { itemId, quantity } = action.payload;
        const itemIndex = state.items.findIndex(item => item.id === itemId);
        
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;
          const { totalItems, totalAmount } = calculateTotals(state.items);
          state.totalItems = totalItems;
          state.totalAmount = totalAmount;
        }
      })
      
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        const { totalItems, totalAmount } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalAmount = totalAmount;
      })
      
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.totalAmount = 0;
      });
  },
});

export const { 
  setDeliveryAddress, 
  setDeliveryType, 
  updateCartItemLocal,
  clearError 
} = cartSlice.actions;
export default cartSlice.reducer;