import React from 'react'
import { Image, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface CartMealCardProps {
  name: string;
  description: string;
  price: number;
  image: any; // ImageSourcePropType
  style?: ViewStyle | ViewStyle[];
  itemId: string;
  quantity: number;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
  onRemove: () => void;
}

const CartMealCard: React.FC<CartMealCardProps> = ({
  name, 
  description, 
  price, 
  image, 
  style,
  itemId,
  quantity,
  onQuantityIncrease,
  onQuantityDecrease,
  onRemove
}) => {
  return (
    <View style={[styles.itemCard, style]}>
      <Image source={image} style={styles.imgStyle}/>
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <TextComp style={styles.nameText}>{name}</TextComp>
          <TextComp style={styles.descriptionText} numberOfLines={2}>
            {description}
          </TextComp>
          <TextComp style={styles.priceText}>R{price.toFixed(2)}</TextComp>
        </View>
        
        <View style={styles.controlsContainer}>
          <Pressable onPress={onRemove} style={styles.optionsButton}>
            <IconHolder 
              style={styles.optionsIcon} 
              source={require("@/assets/Icons/optionsYellowIcon.png")} 
            />
          </Pressable>
          
          <View style={styles.quantityContainer}>
            <Pressable 
              onPress={onQuantityDecrease}
              style={styles.quantityButton}
              disabled={quantity <= 1}
            >
              <TextComp style={[
                styles.quantityButtonText,
                quantity <= 1 && styles.quantityButtonDisabled
              ]}>-</TextComp>
            </Pressable>
            
            <TextComp style={styles.quantityText}>{quantity}</TextComp>
            
            <Pressable 
              onPress={onQuantityIncrease}
              style={styles.quantityButton}
            >
              <TextComp style={styles.quantityButtonText}>+</TextComp>
            </Pressable>
          </View>
          
          <TextComp style={styles.totalText}>
            R{(price * quantity).toFixed(2)}
          </TextComp>
        </View>
      </View>
    </View>
  )
}

export default CartMealCard;

const styles = StyleSheet.create({
  itemCard: {
    width: "100%",
    height: 130,
    backgroundColor: "#EAEBF0",
    borderRadius: 20,
    flexDirection: "row",
    padding: 12,
    borderColor: "#000000",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imgStyle: {
    width: "30%",
    height: "100%",
    borderRadius: 15,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: "#666",
    lineHeight: 15,
    marginBottom: 8,
  },
  priceText: {
    fontSize: 16,
    color: "#ff9a03",
    fontWeight: '600',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionsButton: {
    padding: 4,
  },
  optionsIcon: {
    width: 24,
    height: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#ff9a03",
    fontWeight: 'bold',
  },
  quantityButtonDisabled: {
    color: '#ccc',
  },
  quantityText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  totalText: {
    fontSize: 16,
    color: "#06b306",
    fontWeight: 'bold',
    marginLeft: 8,
  },
});