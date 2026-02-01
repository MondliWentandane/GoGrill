// mobile-app/store/slices/mealsSlice.ts - COMPLETE FIXED VERSION
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MealsState, Meal, Category } from '@/types/restaurant.types';
import ApiService from '@/services/appwriteService';

const initialState: MealsState = {
  meals: [],
  categories: [],
  popularMeals: [],
  discountedMeals: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
};

// Fetch all meals (public - no auth required)
export const fetchMeals = createAsyncThunk(
  'meals/fetchMeals',
  async (categoryId?: string) => {
    try {
      const meals = await ApiService.getMeals(categoryId);
      const popularMeals = await ApiService.getPopularMeals();
      const discountedMeals = await ApiService.getDiscountedMeals();
      
      return {
        meals,
        popularMeals,
        discountedMeals,
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch meals');
    }
  }
);

// Fetch categories (public - no auth required)
export const fetchCategories = createAsyncThunk(
  'meals/fetchCategories',
  async () => {
    try {
      return await ApiService.getCategories();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch categories');
    }
  }
);

// Search meals
export const searchMeals = createAsyncThunk(
  'meals/searchMeals',
  async (searchTerm: string) => {
    try {
      // For now, filter client-side. You could add search to API later.
      const allMeals = await ApiService.getMeals();
      return allMeals.filter(meal =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error: any) {
      throw new Error(error.message || 'Failed to search meals');
    }
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
      // Fetch Meals
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
      
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      })
      
      // Search Meals
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.meals = action.payload;
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to search meals';
      });
  },
});

export const { setSelectedCategory, clearError } = mealsSlice.actions;
export default mealsSlice.reducer;