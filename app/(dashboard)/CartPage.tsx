import BackgroundComp from '@/components/BackgroundComp'
import CartMealCard from '@/components/dataComponents/CartMealCard'
import CheckoutCard from '@/components/dataComponents/CheckoutCard'
import IconHolder from '@/components/IconHolder'
import TextComp from '@/components/TextComp'
import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, View, Alert } from 'react-native'
import { router } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchMeals } from '@/store/slices/mealsSlice'
import { 
  updateCartItemLocal,
  setDeliveryAddress,
  removeFromCart
} from '@/store/slices/cartSlice'
import { fetchUserProfile } from '@/store/slices/userProfileSlice'

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Get data from Redux store
  const { items, totalAmount, deliveryAddress } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  // Load user profile
  useEffect(() => {
    if (user?.$id) {
      dispatch(fetchUserProfile(user.$id));
    }
  }, [dispatch, user]);

  // Handle quantity changes
  const handleQuantityChange = (itemId: string, change: number) => {
    const item = items.find((item: any) => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        dispatch(updateCartItemLocal({ itemId, quantity: newQuantity }));
      } else {
        // Remove item if quantity reaches 0
        dispatch(removeFromCart(itemId));
      }
    }
  };

  // Handle remove item
  const handleRemoveItem = (itemId: string, itemName: string) => {
    Alert.alert(
      'Remove Item',
      `Remove ${itemName} from cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(itemId))
        },
      ]
    );
  };

  // Handle edit address
  const handleEditAddress = () => {
    Alert.prompt(
      'Edit Delivery Address',
      'Enter your delivery address:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: (newAddress: string | undefined) => {
            if (newAddress && newAddress.trim()) {
              dispatch(setDeliveryAddress(newAddress.trim()));
            }
          }
        },
      ],
      'plain-text',
      deliveryAddress
    );
  };

  // Handle checkout
  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    router.push('/(checkout)/Checkout');
  };

  // Show empty cart
  if (items.length === 0) {
    return (
      <BackgroundComp style={{paddingTop:"5%"}}>
        <TextComp>Cart</TextComp>
        <View style={styles.emptyCart}>
          <IconHolder 
            style={{width:100, height:100}} 
            source={require("@/assets/Icons/cartUnfoIcon.png")}
          />
          <TextComp style={{fontSize:20, color:"#000000", marginTop:20}}>
            Your cart is empty
          </TextComp>
          <Pressable 
            onPress={() => router.push('/(dashboard)/ItemsPage')}
            style={{marginTop:30}}
          >
            <TextComp style={{fontSize:18, color:"#ff9a03"}}>
              Browse menu to add items
            </TextComp>
          </Pressable>
        </View>
      </BackgroundComp>
    );
  }

  return (
    <BackgroundComp style={{paddingTop:"5%"}}>
      <TextComp>Cart</TextComp>
        <View style={styles.location}>
          <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <IconHolder style={{width:45}} source={require("@/assets/Icons/locationYellowIcon.png")}/>
            <TextComp style={{fontSize:15, color:"#000000"}}>{deliveryAddress}</TextComp>
          </View>
          <Pressable onPress={handleEditAddress} style={{}}>
            <TextComp style={{fontSize:18, color:"#000000"}}>Edit</TextComp>
          </Pressable>
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
                onRemove={() => handleRemoveItem(item.id, item.mealName)}
              />
            ))}
          </ScrollView>
        </View> 
        <CheckoutCard 
          totalAmount={totalAmount}
          onCheckout={handleCheckout}
        />          
    </BackgroundComp>
  )
}

export default CartPage;

const styles = StyleSheet.create({
  location:{
    width:"95%",
    height:"8%",
    backgroundColor:"#ff920410",
    display:"flex",
    flexDirection:'row',
    alignItems:"center",
    borderColor:"#ff9204",
    borderWidth:0.3,
    borderRadius:10,
    marginLeft:"2%",
    paddingRight:"2%",
    justifyContent:"space-between"
  },
  itemsHolder:{
    width:"100%",
    height:"74%",
    marginTop:15,
    borderBottomWidth:2,
    borderColor:"#00000033",
    marginBottom:9
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})