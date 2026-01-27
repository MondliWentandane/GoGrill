import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MealsState, Meal, Category } from '@/types/restaurant.types';

const initialState: MealsState = {
  meals: [],
  categories: [],
  popularMeals: [],
  discountedMeals: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
};

// Mock data - Will be replaced with API calls
const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'StreetWise Burger',
    description: 'BurgerKing with fried chips Hot like source',
    price: 76.99,
    image: require('@/assets/food/burger.png'),
    categoryId: '1',
    categoryName: 'Food',
    preparationTime: 15,
    isPopular: true,
    rating: 4.5,
    ingredients: ['Beef patty', 'Lettuce', 'Tomato', 'Special sauce'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Chicken Listern',
    description: 'BurgerKing with fried chips Hot like source',
    price: 26.99,
    image: require('@/assets/food/chicken.png'),
    categoryId: '1',
    categoryName: 'Food',
    preparationTime: 20,
    isPopular: true,
    rating: 4.2,
    ingredients: ['Chicken breast', 'Spices', 'Herbs'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'The Leder Crush',
    description: 'BurgerKing with fried chips Hot like source',
    price: 49.99,
    image: require('@/assets/food/crush.png'),
    categoryId: '1',
    categoryName: 'Food',
    preparationTime: 25,
    isPopular: true,
    rating: 4.7,
    ingredients: ['Beef', 'Cheese', 'Bacon', 'Onions'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '4',
    name: 'Unwise Street',
    description: 'Chilly Burger',
    price: 31.99,
    image: require('@/assets/food/unWise.png'),
    categoryId: '1',
    categoryName: 'Food',
    preparationTime: 18,
    isPopular: false,
    rating: 4.0,
    ingredients: ['Beef', 'Chili', 'Cheese'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '5',
    name: 'Cruncher Sand',
    description: 'Sandwitch chilly PiePoolit',
    price: 19.99,
    image: require('@/assets/food/sand.png'),
    categoryId: '4',
    categoryName: 'Snack',
    preparationTime: 10,
    isPopular: false,
    rating: 3.8,
    ingredients: ['Chicken', 'Lettuce', 'Mayo'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '6',
    name: 'Stir-Fry Soludan',
    description: 'Red Bury with fried potato, columane with stake grilled Viniger',
    price: 89.99,
    image: require('@/assets/food/Stir-FryedSalad.png'),
    categoryId: '3',
    categoryName: 'Salad',
    preparationTime: 23,
    isPopular: true,
    isDiscounted: true,
    discountPercentage: 15,
    rating: 4.8,
    ingredients: ['Salad greens', 'Grilled steak', 'Potatoes', 'Vinaigrette'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
  {
    id: '7',
    name: 'Denzel GG',
    description: 'Delicious Fast Food Meal With Burgers Fries And Coke',
    price: 30,
    image: require('@/assets/food/burdersWithDrink.png'),
    categoryId: '1',
    categoryName: 'Food',
    preparationTime: 15,
    isPopular: true,
    isDiscounted: true,
    discountPercentage: 20,
    rating: 4.6,
    ingredients: ['Burger', 'Fries', 'Coke'],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
  },
];

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Food',
    icon: require('@/assets/Icons/fastfoodIcon.png'),
    description: 'Delicious food items',
    mealCount: 5,
  },
  {
    id: '2',
    name: 'Drinks',
    icon: require('@/assets/Icons/drinkIcon.png'),
    description: 'Refreshing beverages',
    mealCount: 0,
  },
  {
    id: '3',
    name: 'Salad',
    icon: require('@/assets/Icons/saladIcon.png'),
    description: 'Healthy salads',
    mealCount: 1,
  },
  {
    id: '4',
    name: 'Snack',
    icon: require('@/assets/Icons/snakIcon.png'),
    description: 'Quick snacks',
    mealCount: 1,
  },
];

export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (categoryId?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredMeals = mockMeals;
    if (categoryId) {
      filteredMeals = mockMeals.filter(meal => meal.categoryId === categoryId);
    }
    
    return {
      meals: filteredMeals,
      popularMeals: mockMeals.filter(meal => meal.isPopular),
      discountedMeals: mockMeals.filter(meal => meal.isDiscounted),
    };
  }
);

export const fetchCategories = createAsyncThunk(
  'meals/fetchCategories',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCategories;
  }
);

export const searchMeals = createAsyncThunk(
  'meals/searchMeals',
  async (searchTerm: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const filtered = mockMeals.filter(meal =>
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered;
  }
);

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals = action.payload.meals;
        state.popularMeals = action.payload.popularMeals;
        state.discountedMeals = action.payload.discountedMeals;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch meals';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.meals = action.payload;
      });
  },
});

export const { setSelectedCategory, clearError } = mealsSlice.actions;
export default mealsSlice.reducer;