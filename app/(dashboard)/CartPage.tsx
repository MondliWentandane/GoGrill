import BackgroundComp from '@/components/BackgroundComp'
import CategoriesComp from '@/components/CategoriesComp'
import CartMealCard from '@/components/dataComponents/CartMealCard'
import IconHolder from '@/components/IconHolder'
import TextComp from '@/components/TextComp'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'

const CartPage: React.FC = () => {
  return (
    <BackgroundComp style={{paddingTop:"5%"}}>
      <TextComp>Cart</TextComp>
        <View style={styles.location}>
          <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <IconHolder style={{width:45}} source={require("@/assets/Icons/locationYellowIcon.png")}></IconHolder>
            <TextComp style={{fontSize:15, color:"#000000"}}>156 Marshal Str,Pol,Limp</TextComp>
          </View>
          <Pressable style={{}}>
            <TextComp style={{fontSize:18, color:"#000000"}}>Edit</TextComp>
          </Pressable>
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
    height:"83%",
    marginTop:15,
  },
})
