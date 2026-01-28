import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps {
    name: string;
    description: string;
    price: number;
    image: ImageSourcePropType;
    style: ViewStyle | ViewStyle[];
    onAddToCart?: () => void;
}

const MealCard: React.FC<TheProps> = ({name, description, price, image, style, onAddToCart}) => {
  return (
    <View style={[styles.itemCard, style]}>
      <Image source={image} style={styles.imgStyle}/>
      <View style={{paddingLeft:"1%", justifyContent:"space-between",width:"63%"}}>
        <View>
          <TextComp style={{lineHeight:17}}>{name}</TextComp>
          <TextComp style={{lineHeight:15, fontSize:13, color:"#000000", width:"80%", marginTop:'2%'}}>
            {description}
          </TextComp>
        </View>
        <TextComp style={{color:"#000000", fontSize:19}}>R{price.toFixed(2)}</TextComp>
      </View>
      <View style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
        <IconHolder style={{}} source={require("@/assets/Icons/optionsYellowIcon.png")} />
        <IconHolder 
          source={require("@/assets/Icons/addCartYellowIcon.png")}
          onPress={onAddToCart}
        />
      </View>
    </View>
  )
}

export default MealCard;

const styles = StyleSheet.create({
  itemCard: {
    width: "100%",
    height: 110,
    backgroundColor: "#EAEBF0",
    borderRadius: 20,
    marginBottom: "2%",
    display: "flex",
    flexDirection: "row",
    padding: "2%",
    borderColor: "#000000",
    borderWidth: 0.1
  },
  imgStyle: {
    width: "27%",
    height: "100%",
    borderRadius: 10
  }
});