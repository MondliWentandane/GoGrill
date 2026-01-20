import BackgroundComp from '@/components/BackgroundComp'
import TextComp from '@/components/TextComp'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import locationIcon from '@/assets/Icons/locationIconWHITE.png';
import cartIcon from "@/assets/Icons/cartUnfoIcon.png";
import profileIcon from "@/assets/Icons/profileIcon.png";
import IconHolder from '@/components/IconHolder';
import SearchComp from '@/components/SearchComp';
import DiscountCard from '@/components/dataComponents/DiscountCard';

const HomePage = () => {
  return (
    <BackgroundComp>
        <View style={styles. sectionOne}>
          <View style={styles.oneOfL}>
            <IconHolder style={{backgroundColor:"#f7990c"}} source={locationIcon}/>
            <View style={{height:"100%"}}>
              <TextComp style={{fontSize:19, lineHeight:20}}>Location</TextComp>
              <TextComp style={{fontSize:15, lineHeight:19, color:"#000000"}}>
                159 Marshal Str, Pol, Limp</TextComp>
            </View>
          </View>
          <View style={styles.oneOfR}>
            <IconHolder style={{backgroundColor:"#f7990c"}} source={cartIcon}/>
            <IconHolder style={{backgroundColor:"#f7990c"}} source={profileIcon}/>
          </View>
        </View>
        <SearchComp/>
        <DiscountCard mealName='Denzel GG' mealDescr="Delicious Fast Food Meal With Burgers Fries And Coke " price='30% OFF' image={require("@/assets/food/burdersWithDrink.png")}/>
        <TextComp>Populer meals</TextComp>
    </BackgroundComp>
  )
}

export default HomePage;

const styles = StyleSheet.create({
  sectionOne:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",
    height:"9%",
    paddingTop:"2%"
  },
  oneOfL:{
    display:"flex",
    flexDirection:"row",
    height:"100%",
    width:"auto",
    gap:"1%"
  },
  oneOfR:{
    display:"flex",
    flexDirection:"row",
    height:"100%",
    width:"25%",
    gap:"9%"
  }
})
