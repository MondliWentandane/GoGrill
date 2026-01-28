import BackgroundComp from '@/components/BackgroundComp'
import TextComp from '@/components/TextComp'
import React, { useEffect } from 'react'
import { Image, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import locationIcon from '@/assets/Icons/locationIconWHITE.png';
import cartIcon from "@/assets/Icons/cartUnfoIcon.png";
import profileIcon from "@/assets/Icons/profileIcon.png";
import IconHolder from '@/components/IconHolder';
import SearchComp from '@/components/SearchComp';
import DiscountCard from '@/components/dataComponents/DiscountCard';
import PopulerMealsCard from '@/components/dataComponents/PopulerMealsCard';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMeals, fetchCategories } from '@/store/slices/mealsSlice';
import { addToCart } from '@/store/slices/cartSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const { user } = useAppSelector((state) => state.auth);
  const { 
    popularMeals, 
    discountedMeals 
  } = useAppSelector((state) => state.meals);
  const { items: cartItems } = useAppSelector((state) => state.cart);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchMeals());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Navigation handlers
  const handleProfilePress = () => {
    router.push('/(dashboard)/ProfilePage');
  };

  const handleCartPress = () => {
    router.push('/(dashboard)/CartPage');
  };

  // Add to cart handler
  const handleAddToCart = (meal: any) => {
    dispatch(addToCart(meal));
  };

  // Calculate cart items count
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BackgroundComp style={{paddingTop:"5%"}}>
      {/* Header with Location and Icons - YOUR ORIGINAL STYLE */}
      <View style={styles.sectionOne}>
        <View style={styles.oneOfL}>
          <IconHolder style={{backgroundColor:"#f7990c"}} source={locationIcon}/>
          <View style={{height:"100%"}}>
            <TextComp style={{fontSize:19, lineHeight:20}}>Location</TextComp>
            <TextComp style={{fontSize:15, lineHeight:19, color:"#000000"}}>
              {user?.address || "159 Marshal Str, Pol, Limp"}
            </TextComp>
          </View>
        </View>
        <View style={styles.oneOfR}>
          <Pressable onPress={handleCartPress} style={{position: 'relative'}}>
            <IconHolder style={{backgroundColor:"#f7990c"}} source={cartIcon}/>
            {cartItemsCount > 0 && (
              <View style={styles.cartBadge}>
                <TextComp style={styles.cartBadgeText}>{cartItemsCount}</TextComp>
              </View>
            )}
          </Pressable>
          <Pressable onPress={handleProfilePress}>
            <IconHolder style={{backgroundColor:"#f7990c"}} source={profileIcon}/>
          </Pressable>
        </View>
      </View>

      {/* Search Component - YOUR STYLE WITH NEW FUNCTIONALITY */}
      <SearchComp/>

      {/* Discount Cards Horizontal Scroll - YOUR ORIGINAL STYLE */}
      <View style={{ height:"21.3%"}}>
        <ScrollView 
          horizontal={true} 
          style={{height:20}} 
          contentContainerStyle={{alignItems:"center"}}
          showsHorizontalScrollIndicator={false}
        >
          {discountedMeals.map((meal) => (
            <DiscountCard 
              key={meal.id}
              mealName={meal.name} 
              mealDescr={meal.description} 
              price={meal.discountPercentage || 20}
              image={meal.image}
              onAddToCart={() => handleAddToCart(meal)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Popular Meals Section - YOUR ORIGINAL STYLE */}
      <TextComp>Populer meals</TextComp>
      <View style={{width:"100%", height:"58%"}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {popularMeals.map((meal) => (
            <PopulerMealsCard 
              key={meal.id}
              theImage={meal.image} 
              name={meal.name} 
              descr={meal.description} 
              time={meal.preparationTime || 23}
              price={meal.price}
              onAddToCart={() => handleAddToCart(meal)}
            />
          ))}
        </ScrollView>
      </View>
    </BackgroundComp>
  )
}

export default HomePage;

const styles = StyleSheet.create({
  sectionOne: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    height:"9%",
    paddingTop:"2%"
  },
  oneOfL: {
    display:"flex",
    flexDirection:"row",
    height:"100%",
    width:"auto",
    gap:"1%"
  },
  oneOfR: {
    display:"flex",
    flexDirection:"row",
    height:"100%",
    width:"25%",
    gap:"9%" 
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});