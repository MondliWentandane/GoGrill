import React from 'react'
import { Image, ImageSourcePropType, Pressable, StyleSheet, View, ViewStyle } from 'react-native'
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps {
  mealName: string;
  mealDescr: string;
  price: number;
  image: ImageSourcePropType;
  styleView?: ViewStyle | ViewStyle[];
  onAddToCart?: () => void;
}

const DiscountCard: React.FC<TheProps> = ({
  mealName,
  mealDescr,
  price,
  image,
  styleView,
  onAddToCart
}) => {
  return (
    <View style={[styleView, styles.card]}>
      <View style={styles.cardLeft}>
        <View>
          <TextComp style={styles.mealName}>{mealName}</TextComp>
          <TextComp style={styles.mealDescription} numberOfLines={2}>
            {mealDescr}
          </TextComp>
        </View>
        <View style={styles.cardFooter}>
          <TextComp style={styles.discountText}>
            {price}% OFF
          </TextComp>
          <Pressable onPress={onAddToCart}>
            <IconHolder 
              style={styles.addToCartIcon} 
              source={require("@/assets/Icons/cartAddIcon.png")}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.cardRight}>
        <Image source={image} style={styles.mealImage} resizeMode="cover" />
      </View>
    </View>
  )
}

export default DiscountCard;

const styles = StyleSheet.create({
  card: {
    width: 320,
    height: 125,
    borderRadius: 20,
    backgroundColor: "#f87204",
    flexDirection: 'row',
    marginRight: 15,
    paddingHorizontal: 7,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  mealName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
    marginBottom: 5,
  },
  mealDescription: {
    color: "#ffffff",
    fontSize: 13,
    lineHeight: 16,
    opacity: 0.9,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
  },
  addToCartIcon: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRight: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealImage: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
});