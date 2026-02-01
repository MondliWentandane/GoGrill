// components/dataComponents/PopulerMealsCard.tsx - COMPLETE UPDATED
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native';
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps {
  theImage: string; // Changed from ImageSourcePropType to string
  name: string;
  descr: string;
  time: number;
  price: number;
  onAddToCart?: () => void;
}

const PopulerMealsCard: React.FC<TheProps> = ({ 
  theImage, 
  name, 
  descr, 
  time, 
  price,
  onAddToCart 
}) => {
  return (
    <View style={styles.card}>
      <Image style={styles.imgStyle} source={{ uri: theImage }} resizeMode="cover" />
      <View style={styles.bottomSect}>
        <View style={styles.textContainer}>
          <TextComp style={styles.mealName}>{name}</TextComp>
          <TextComp style={styles.mealDescription} numberOfLines={2}>
            {descr}
          </TextComp>
        </View>
        <View style={styles.iconsSect}>
          <TextComp style={styles.priceText}>R{price.toFixed(2)}</TextComp>
          <View style={styles.timeContainer}>
            <IconHolder 
              styleIc={styles.timeIcon}
              style={styles.timeIconHolder} 
              source={require("@/assets/Icons/scheduleBlackIcon.png")}
            />                    
            <TextComp style={styles.timeText}>
              {time}min
            </TextComp>
          </View>
          <Pressable onPress={onAddToCart}>
            <IconHolder 
              styleIc={styles.cartIcon}
              style={styles.cartIconHolder} 
              source={require("@/assets/Icons/cartAddBlackIcon.png")}
            />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default PopulerMealsCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 200,
    backgroundColor: "#EAEBF0",
    borderRadius: 20,
    marginBottom: 10,
    borderColor: "#000000",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  imgStyle: {
    width: "100%",
    height: "55%",
  },
  bottomSect: {
    height:"43%",
    paddingHorizontal: 9,
    justifyContent: 'space-between',
    paddingTop:4
  },
  textContainer: {
    flex: 1,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#f87204",
    lineHeight: 22,
    marginBottom: 6,
  },
  mealDescription: {
    fontSize: 13,
    color: "#000000",
    lineHeight: 16,
  },
  iconsSect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#000000",
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeIconHolder: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeIcon: {
    width: 18,
    height: 18,
  },
  timeText: {
    fontSize: 16,
    color: "#000000",
  },
  cartIconHolder: {
    width: 40,
    height: 40,
    backgroundColor: '#ff9a03',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: 22,
    height: 22,
  },
});