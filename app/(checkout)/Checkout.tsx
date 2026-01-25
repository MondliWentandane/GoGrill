import BackgroundComp from '@/components/BackgroundComp'
import CategoriesComp from '@/components/CategoriesComp';
import CartMealCard from '@/components/dataComponents/CartMealCard';
import CheckoutLastCard from '@/components/dataComponents/CheckoutLastCard';
import TextComp from '@/components/TextComp';
import { router } from 'expo-router';
import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

const Checkout = () => {
  return (
    <BackgroundComp style={{ paddingTop:"1%"}}>
        <View style={styles.tabsHolder}>
            <CategoriesComp catName='Collect' iconURL={require("@/assets/Icons/storeIcon.png")}/>
            <CategoriesComp catName='Delivery' iconURL={require("@/assets/Icons/deliveryIcon.png")}/>
        </View>
        <View style={styles.itemsHolder}>
          <ScrollView style={{}}>
            <CartMealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <CartMealCard name='Chicken Listern' description='BurgerKing with fried chips Hot like source' price={26.99}
                       style={{}} image={require("@/assets/food/chicken.png")}/>
            <CartMealCard name='The Leder Crush' description='BurgerKing with fried chips Hot like source' price={49.99}
                       style={{}} image={require("@/assets/food/crush.png")}/>
            <CartMealCard name='Unwise Street' description='Chilly Burger' price={31.99}
                       style={{}} image={require("@/assets/food/unWise.png")}/>
            <CartMealCard name='Cruncher Sand' description='Sandwitch chilly PiePoolit' price={19.99}
                       style={{}} image={require("@/assets/food/sand.png")}/>
            <CartMealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <CartMealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/Stir-FryedSalad.png")}/>        
                                                                                 
          </ScrollView>
        </View>
        <CheckoutLastCard/>
        <View style={styles.btnsHolder}>
            <Pressable onPress={()=>{router.push("/(dashboard)/CartPage")}}
              style={{padding:"2%", backgroundColor:"#ff92041a", borderRadius:5, width:130, alignItems:"center"}}>
                <TextComp style={{fontSize:19,}}>Cancel</TextComp>
            </Pressable>
            <Pressable style={{padding:"2%", backgroundColor:"#ff8e04", borderRadius:5, width:130, alignItems:"center"}}>
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