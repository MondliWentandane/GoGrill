import React from 'react'
import { Image, ImageSourcePropType, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps{
    name: string;
    description: string;
    price: number;
    image: ImageSourcePropType;
    style: ViewStyle | ViewStyle[];
}

const CartMealCard: React.FC<TheProps> = ({name, description, price, image, style}) => {
  return (
    <View style={[styles.itemCard, style]}>
        <Image source={image} style={styles.imgStyle}/>
        <View style={{paddingLeft:"1%", justifyContent:"space-between",width:"58%",}}>
            <View>
                <TextComp style={{lineHeight:17,}}>{name}</TextComp>
                <TextComp style={{lineHeight:15, fontSize:13, color:"#000000", width:"100%", marginTop:'2%'}}>
                    {description}
                </TextComp>
            </View>
            <TextComp style={{color:"#000000", fontSize:18}}>R{price}</TextComp>
        </View>
        <View style={{display:"flex", flexDirection:"column", justifyContent:"space-between", width:50, alignItems:"flex-end"}}>
            <IconHolder style={{}} source={require("@/assets/Icons/optionsYellowIcon.png")} />
            <View style={{display:"flex", flexDirection:"row", gap:"15%", width:70,}}>
                <Pressable>
                    <TextComp>--</TextComp>
                </Pressable>
                <TextComp style={{color:"#000000"}}>0</TextComp>
                <Pressable>
                    <TextComp>+</TextComp>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

export default CartMealCard;

const styles = StyleSheet.create({
    itemCard:{
    width:"100%",
    height:110,
    backgroundColor:"#EAEBF0",
    borderRadius:20,
    marginBottom:"2%",
    display:"flex",
    flexDirection:"row",
    padding:"2%",
    borderColor:"#000000",
        borderWidth:0.1
  },
  imgStyle:{
    width:"27%",
    height:"100%",
    borderRadius:10
  }
})
