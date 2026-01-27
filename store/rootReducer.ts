import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mealsReducer from './slices/mealsSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import userProfileReducer from './slices/userProfileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  meals: mealsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  userProfile: userProfileReducer,
});

export default rootReducer;