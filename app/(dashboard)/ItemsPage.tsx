import BackgroundComp from '@/components/BackgroundComp'
import CategoriesComp from '@/components/CategoriesComp'
import MealCard from '@/components/dataComponents/MealCard'
import SearchComp from '@/components/SearchComp'
import TextComp from '@/components/TextComp'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const ItemsPage: React.FC = () => {
  return (
    <BackgroundComp style={{paddingTop:5}}>
        <SearchComp/>
        <TextComp>Categories</TextComp>
        <View style={styles.tabsHo}>
          <CategoriesComp catName='Food' iconURL={require("@/assets/Icons/fastfoodIcon.png")}/>
          <CategoriesComp catName='Drinks' iconURL={require("@/assets/Icons/drinkIcon.png")}/>
          <CategoriesComp catName='Salad' iconURL={require("@/assets/Icons/saladIcon.png")}/>
          <CategoriesComp catName='Snack' iconURL={require("@/assets/Icons/snakIcon.png")}/>
        </View>
        <View style={styles.itemsHolder}>
          <ScrollView style={{}}>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/> 
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>
            <MealCard name='StreetWise' description='BurgerKing with fried chips Hot like source' price={76.99}
                       style={{}} image={require("@/assets/food/burger.png")}/>   

                                                                                                          
          </ScrollView>
        </View>
    </BackgroundComp>
  )
}

export default ItemsPage;

const styles= StyleSheet.create({
  tabsHo:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    height:"9%",
    paddingLeft:"7%",
    paddingRight:"7%"
  },
  sectDiv:{
    display:"flex",
    flexDirection:"column",
    backgroundColor:"#33e382",
    alignItems:"center"
  },
  icon:{
    width:"80%",
    height:"80%",
    backgroundColor:"#f7990c",
    borderRadius:10
  },
  itemsHolder:{
    width:"100%",
    height:"76%",
    marginTop:15
  },
  
  
})
