import { ImageSourcePropType } from 'react-native';

// Meal/Category types
export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType; // Changed from string to ImageSourcePropType
  categoryId: string;
  categoryName?: string;
  preparationTime?: number; // in minutes
  isPopular?: boolean;
  isDiscounted?: boolean;
  discountPercentage?: number;
  rating?: number;
  ingredients?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: ImageSourcePropType; // Changed from string to ImageSourcePropType
  description?: string;
  mealCount?: number;
}

export interface CartItem {
  id: string;
  mealId: string;
  mealName: string;
  mealDescription: string;
  mealPrice: number;
  mealImage: ImageSourcePropType; // Changed from string to ImageSourcePropType
  quantity: number;
  specialInstructions?: string;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  deliveryType: 'delivery' | 'pickup';
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'mobile';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderNumber: string;
  createdAt: string;
  estimatedDelivery?: string;
  specialInstructions?: string;
}

export interface OrderItem {
  mealId: string;
  mealName: string;
  quantity: number;
  price: number;
  total: number;
}

// User profile extension
export interface UserProfile {
  userId: string;
  phone?: string;
  address?: string;
  favoriteMeals?: string[]; // Array of meal IDs
  dietaryPreferences?: string[];
  defaultDeliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
}

// Redux State Types
export interface MealsState {
  meals: Meal[];
  categories: Category[];
  popularMeals: Meal[];
  discountedMeals: Meal[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string | null;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
  error: string | null;
  deliveryAddress: string;
  deliveryType: 'delivery' | 'pickup';
}

export interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

// Combined App State
export interface AppState {
  auth: any; // Your existing auth state
  meals: MealsState;
  cart: CartState;
  orders: OrdersState;
  userProfile: UserProfileState;
}