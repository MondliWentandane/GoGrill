import BackgroundComp from '@/components/BackgroundComp'
import CategoriesComp from '@/components/CategoriesComp';
import CartMealCard from '@/components/dataComponents/CartMealCard';
import CheckoutLastCard from '@/components/dataComponents/CheckoutLastCard';
import TextComp from '@/components/TextComp';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateCartItemLocal, removeFromCart, setDeliveryType } from '@/store/slices/cartSlice';
import { createOrder } from '@/store/slices/ordersSlice';

const Checkout = () => {
  const dispatch = useAppDispatch();
  const { items, totalAmount, deliveryAddress, deliveryType } = useAppSelector((state) => state.cart);
  const [selectedOption, setSelectedOption] = useState<'Collect' | 'Delivery'>(deliveryType === 'pickup' ? 'Collect' : 'Delivery');

  // Handle quantity changes
  const handleQuantityChange = (itemId: string, change: number) => {
    const item = items.find((item: any) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateCartItemLocal({ itemId, quantity: newQuantity }));
      } else {
        dispatch(removeFromCart(itemId));
      }
    }
  };

  // Handle delivery type change
  const handleDeliveryTypeChange = (type: 'Collect' | 'Delivery') => {
    setSelectedOption(type);
    dispatch(setDeliveryType(type === 'Collect' ? 'pickup' : 'delivery'));
  };

  // Handle buy now
  const handleBuyNow = async () => {
    try {
      await dispatch(createOrder({
        items,
        totalAmount,
        deliveryAddress,
        deliveryType: selectedOption === 'Collect' ? 'pickup' : 'delivery',
        paymentMethod: 'card', // Default to card, can make selectable
      })).unwrap();
      
      router.replace('/(dashboard)/HomePage');
      // Show success message
      alert('Order placed successfully!');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <BackgroundComp style={{ paddingTop:"1%"}}>
        <View style={styles.tabsHolder}>
            <CategoriesComp 
              catName='Collect' 
              iconURL={require("@/assets/Icons/storeIcon.png")}
              isSelected={selectedOption === 'Collect'}
              onPress={() => handleDeliveryTypeChange('Collect')}
            />
            <CategoriesComp 
              catName='Delivery' 
              iconURL={require("@/assets/Icons/deliveryIcon.png")}
              isSelected={selectedOption === 'Delivery'}
              onPress={() => handleDeliveryTypeChange('Delivery')}
            />
        </View>
        <View style={styles.itemsHolder}>
          <ScrollView style={{}}>
            {items.map((item: any) => (
              <CartMealCard
                key={item.id}
                name={item.mealName}
                description={item.mealDescription}
                price={item.mealPrice}
                image={item.mealImage}
                style={{}}
                itemId={item.id}
                quantity={item.quantity}
                onQuantityIncrease={() => handleQuantityChange(item.id, 1)}
                onQuantityDecrease={() => handleQuantityChange(item.id, -1)}
                onRemove={() => dispatch(removeFromCart(item.id))}
              />
            ))}
          </ScrollView>
        </View>
        <CheckoutLastCard totalAmount={totalAmount} />
        <View style={styles.btnsHolder}>
            <Pressable 
              onPress={() => router.push("/(dashboard)/CartPage")}
              style={{padding:"2%", backgroundColor:"#ff92041a", borderRadius:5, width:130, alignItems:"center"}}
            >
                <TextComp style={{fontSize:19}}>Cancel</TextComp>
            </Pressable>
            <Pressable 
              onPress={handleBuyNow}
              style={{padding:"2%", backgroundColor:"#ff8e04", borderRadius:5, width:130, alignItems:"center"}}
            >
                <TextComp style={{fontSize:19, color:"#ffffff"}}>Buy Now</TextComp>
            </Pressable>
        </View>
    </BackgroundComp>
  )
}

export default Checkout;

const styles= StyleSheet.create({
    tabsHolder:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        width:"100%",
        height:"9%",
        paddingLeft:"15%",
        paddingRight:"15%",
        marginTop:"1%"
    },
    itemsHolder:{
      width:"100%",
      height:"69%",
      marginTop:15,
      borderBottomWidth:2,
      borderColor:"#00000033",
      marginBottom:9
    },
    btnsHolder:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      width:"90%",
      alignSelf:"center",
      marginTop:"3%"
    }
})