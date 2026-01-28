import BackgroundComp from '@/components/BackgroundComp'
import CategoriesComp from '@/components/CategoriesComp'
import MealCard from '@/components/dataComponents/MealCard'
import SearchComp from '@/components/SearchComp'
import TextComp from '@/components/TextComp'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchMeals, fetchCategories, setSelectedCategory } from '@/store/slices/mealsSlice'
import { addToCart } from '@/store/slices/cartSlice'

const ItemsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategoryLocal] = useState<string | null>(null);
  
  // Get data from Redux store
  const { 
    meals, 
    categories, 
    isLoading: mealsLoading,
    error: mealsError 
  } = useAppSelector((state) => state.meals);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      // If same category clicked, deselect it
      setSelectedCategoryLocal(null);
      dispatch(setSelectedCategory(null));
      dispatch(fetchMeals()); // Load all meals
    } else {
      // Select new category
      setSelectedCategoryLocal(categoryId);
      dispatch(setSelectedCategory(categoryId));
      dispatch(fetchMeals(categoryId)); // Load meals for this category
    }
  };

  // Handle add to cart
  const handleAddToCart = (meal: any) => {
    dispatch(addToCart(meal));
  };

  // Filter meals by selected category
  const filteredMeals = selectedCategory 
    ? meals.filter(meal => meal.categoryId === selectedCategory)
    : meals;

  // Show loading state
  if (mealsLoading) {
    return (
      <BackgroundComp style={{paddingTop:5, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#ff9a03" />
        <TextComp style={{marginTop: 20, fontSize: 18}}>Loading meals...</TextComp>
      </BackgroundComp>
    );
  }

  return (
    <BackgroundComp style={{paddingTop:5}}>
      <TextComp style={{fontSize:30, paddingHorizontal: 15, marginBottom: 10}}>Our Meals</TextComp>
      
      {/* Search Component */}
      <View style={{paddingHorizontal: 15}}>
        <SearchComp />
      </View>
      
      {/* Categories Section */}
      <TextComp style={{paddingHorizontal: 15, marginTop: 15, marginBottom: 10}}>Categories</TextComp>
      <View style={styles.tabsHo}>
        {categories.map((category) => (
          <CategoriesComp 
            key={category.id}
            catName={category.name}
            iconURL={category.icon}
            isSelected={selectedCategory === category.id}
            onPress={() => handleCategorySelect(category.id)}
          />
        ))}
      </View>
      
      {/* Meals Section */}
      <View style={styles.itemsHolder}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <MealCard 
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                image={meal.image}
                style={{}}
                onAddToCart={() => handleAddToCart(meal)}
              />
            ))
          ) : (
            // Empty state
            <View style={styles.emptyState}>
              <TextComp style={styles.emptyStateText}>
                {selectedCategory 
                  ? `No ${categories.find(c => c.id === selectedCategory)?.name} items available`
                  : 'No meals available'
                }
              </TextComp>
            </View>
          )}
        </ScrollView>
      </View>
    </BackgroundComp>
  )
}

export default ItemsPage;

const styles = StyleSheet.create({
  tabsHo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "9%",
    paddingLeft: "7%",
    paddingRight: "7%"
  },
  itemsHolder: {
    width: "100%",
    height: "72%",
    marginTop: 15
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});