import BackgroundComp from '@/components/BackgroundComp'
import CartMealCard from '@/components/dataComponents/CartMealCard'
import CheckoutCard from '@/components/dataComponents/CheckoutCard'
import IconHolder from '@/components/IconHolder'
import TextComp from '@/components/TextComp'
import React, { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
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
  const { items, totalAmount, deliveryAddress, isLoading: cartLoading } = useAppSelector((state) => state.cart);
  const { isLoading: mealsLoading } = useAppSelector((state) => state.meals);
  const { profile, isLoading: profileLoading } = useAppSelector((state) => state.userProfile);
  const { user } = useAppSelector((state) => state.auth);

  // Load initial data
  useEffect(() => {
    dispatch(fetchMeals());
    if (user?.$id) {
      dispatch(fetchUserProfile(user.$id));
    }
  }, [dispatch, user]);

  // Update delivery address from user profile
  useEffect(() => {
    if (profile?.address && profile.address !== deliveryAddress) {
      dispatch(setDeliveryAddress(profile.address));
    }
  }, [profile, deliveryAddress, dispatch]);

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

  // Calculate delivery fee
  const calculateDeliveryFee = (total: number): number => {
    return total > 100 ? 0 : 15;
  };

  // Calculate total with delivery
  const totalWithDelivery = totalAmount + calculateDeliveryFee(totalAmount);

  // Show loading state
  if (cartLoading || mealsLoading || profileLoading) {
    return (
      <BackgroundComp style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff9a03" />
        <TextComp style={styles.loadingText}>Loading cart...</TextComp>
      </BackgroundComp>
    );
  }

  // Show empty cart
  if (items.length === 0) {
    return (
      <BackgroundComp style={styles.container}>
        <TextComp style={styles.title}>Cart</TextComp>
        <View style={styles.emptyCartContainer}>
          <IconHolder 
            style={styles.emptyCartIcon} 
            source={require("@/assets/Icons/cartUnfoIcon.png")}
          />
          <TextComp style={styles.emptyCartText}>Your cart is empty</TextComp>
          <TextComp style={styles.emptyCartSubtext}>
            Add delicious meals from our menu!
          </TextComp>
          <Pressable 
            style={styles.browseButton}
            onPress={() => router.push('/(dashboard)/ItemsPage')}
          >
            <TextComp style={styles.browseButtonText}>Browse Menu</TextComp>
          </Pressable>
        </View>
      </BackgroundComp>
    );
  }

  return (
    <BackgroundComp style={styles.container}>
      <TextComp style={styles.title}>Cart</TextComp>
      
      {/* Delivery Address Section */}
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <IconHolder 
            style={{backgroundColor:"#f7990c", width: 45}} 
            source={require("@/assets/Icons/locationYellowIcon.png")}
          />
          <View style={styles.addressTextContainer}>
            <TextComp style={styles.addressLabel}>Delivery Address</TextComp>
            <TextComp style={styles.addressValue} numberOfLines={1}>
              {deliveryAddress}
            </TextComp>
          </View>
        </View>
        <Pressable onPress={handleEditAddress} style={styles.editButton}>
          <TextComp style={styles.editButtonText}>Edit</TextComp>
        </Pressable>
      </View>

      {/* Cart Items Section */}
      <View style={styles.itemsHolder}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {items.map((item: any) => (
            <CartMealCard
              key={item.id}
              name={item.mealName}
              description={item.mealDescription}
              price={item.mealPrice}
              image={item.mealImage}
              style={styles.cartItem}
              itemId={item.id}
              quantity={item.quantity}
              onQuantityIncrease={() => handleQuantityChange(item.id, 1)}
              onQuantityDecrease={() => handleQuantityChange(item.id, -1)}
              onRemove={() => handleRemoveItem(item.id, item.mealName)}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Checkout Section - Use the ORIGINAL CheckoutCard without deliveryFee prop */}
      <CheckoutCard 
        totalAmount={totalAmount}
        onCheckout={handleCheckout}
      />
    </BackgroundComp>
  )
}

export default CartPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9a03',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  location: {
    width: "95%",
    height: 70,
    backgroundColor: "#ff920410",
    flexDirection: 'row',
    alignItems: "center",
    borderColor: "#ff9204",
    borderWidth: 0.3,
    borderRadius: 10,
    marginLeft: "2.5%",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff9a03',
    marginBottom: 2,
  },
  addressValue: {
    fontSize: 14,
    color: "#000000",
    flex: 1,
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  editButtonText: {
    fontSize: 16,
    color: "#ff9a03",
    fontWeight: '600',
  },
  itemsHolder: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cartItem: {
    marginBottom: 12,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#ff9a0320',
    borderRadius: 60,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: "#ff9e0c",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#ffa600",
  },
  browseButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});