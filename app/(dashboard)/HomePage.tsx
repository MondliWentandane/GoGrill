import BackgroundComp from '@/components/BackgroundComp'
import TextComp from '@/components/TextComp'
import React from 'react'
import { Image, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import locationIcon from '@/assets/Icons/locationIconWHITE.png';
import cartIcon from "@/assets/Icons/cartUnfoIcon.png";
import profileIcon from "@/assets/Icons/profileIcon.png";
import IconHolder from '@/components/IconHolder';
import SearchComp from '@/components/SearchComp';
import DiscountCard from '@/components/dataComponents/DiscountCard';
import PopulerMealsCard from '@/components/dataComponents/PopulerMealsCard';
import { router } from 'expo-router';
import { useAppSelector } from '@/store/hooks';

const HomePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const handleProfilePress = () => {
    router.push('/(dashboard)/ProfilePage');
  };

  const handleCartPress = () => {
    router.push('/(dashboard)/CartPage');
  };

  return (
    <BackgroundComp>
      <View style={styles.sectionOne}>
        <View style={styles.oneOfL}>
          <IconHolder style={{ backgroundColor: "#f7990c" }} source={locationIcon} />
          <View style={{ height: "100%" }}>
            <TextComp style={{ fontSize: 19, lineHeight: 20 }}>Location</TextComp>
            <TextComp style={{ fontSize: 15, lineHeight: 19, color: "#000000" }}>
              159 Marshal Str, Pol, Limp
            </TextComp>
          </View>
        </View>
        <View style={styles.oneOfR}>
          <Pressable onPress={handleCartPress}>
            <IconHolder style={{ backgroundColor: "#f7990c" }} source={cartIcon} />
          </Pressable>
          <Pressable onPress={handleProfilePress}>
            <IconHolder style={{ backgroundColor: "#f7990c" }} source={profileIcon} />
          </Pressable>
        </View>
      </View>

      {/* Welcome message with user name if available */}
      {user && (
        <View style={styles.welcomeSection}>
          <TextComp style={styles.welcomeText}>
            Welcome back, {user.name}!
          </TextComp>
        </View>
      )}

      <SearchComp />
      
      <View style={{ height: "21.3%" }}>
        <ScrollView 
          horizontal={true} 
          style={{ height: 20 }} 
          contentContainerStyle={{ alignItems: "center" }}
          showsHorizontalScrollIndicator={false}
        >
          <DiscountCard 
            mealName='Denzel GG' 
            mealDescr="Delicious Fast Food Meal With Burgers Fries And Coke" 
            price={30} 
            image={require("@/assets/food/burdersWithDrink.png")}
          />
          <DiscountCard 
            mealName='Denzel GG' 
            mealDescr="Delicious Fast Food Meal With Burgers Fries And Coke" 
            price={30} 
            image={require("@/assets/food/burdersWithDrink.png")}
          />
          <DiscountCard 
            mealName='Denzel GG' 
            mealDescr="Delicious Fast Food Meal With Burgers Fries And Coke" 
            price={30} 
            image={require("@/assets/food/burdersWithDrink.png")}
          />
        </ScrollView>
      </View>
      
      <TextComp style={styles.sectionTitle}>Popular Meals</TextComp>
      
      <View style={{ width: "100%", height: "58%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PopulerMealsCard 
            theImage={require("@/assets/food/Stir-FryedSalad.png")} 
            name='Stir-Fry Soludan' 
            descr='Red Bury with fried potato, columane with stake grilled Viniger' 
            time={23} 
            price={89.99}
          />
          <PopulerMealsCard 
            theImage={require("@/assets/food/burdersWithDrink.png")} 
            name='Stir-Fry Soludan' 
            descr='Red Bury with fried potato, columane with stake grilled Viniger' 
            time={23} 
            price={89.99}
          />
          <PopulerMealsCard 
            theImage={require("@/assets/food/Stir-FryedSalad.png")} 
            name='Stir-Fry Soludan' 
            descr='Red Bury with fried potato, columane with stake grilled Viniger' 
            time={23} 
            price={89.99}
          />
        </ScrollView>
      </View>
    </BackgroundComp>
  )
}

export default HomePage;

const styles = StyleSheet.create({
  sectionOne: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "9%",
    paddingTop: "2%",
    marginBottom: 10,
  },
  oneOfL: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "auto",
    gap: "1%"
  },
  oneOfR: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "25%",
    gap: "9%"
  },
  welcomeSection: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff9a03",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    paddingHorizontal: 10,
  }
})