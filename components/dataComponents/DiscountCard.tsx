import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native'
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps {
    mealName: string;
    mealDescr: string;
    price: number;
    image: ImageSourcePropType;
    styleView?: ViewStyle | ViewStyle[];
}

const DiscountCard: React.FC<TheProps> = ({mealName,mealDescr,price,image,styleView}) => {
  return (
    <View style={[styleView ,styles.card]}>
        <View style={styles.cardLeft}>
            <View>
                <TextComp style={{color:"#ffffff", fontWeight:"bold", lineHeight:24, marginTop:"2%", fontSize:21}}>{mealName}</TextComp>
                <TextComp style={{color:"#ffffff", fontSize:13, lineHeight:12}}>
                    {mealDescr}
                </TextComp>
            </View>
            <View style={{ justifyContent:"flex-end", height:"47%"}}>
                <TextComp style={{color:"#ffffff", fontWeight:"bold", lineHeight:24, marginTop:"2%"}} >
                        {price}% OFF
                </TextComp>
                <IconHolder style={[{borderColor:"#ffffff", borderWidth:1, borderRadius:5,}, styles.icon]} 
                            source={require("@/assets/Icons/cartAddIcon.png")}/>
            </View>
        </View>
        <View style={styles.cardRight}>
            <Image source={image} style={{width:"140%", height:"100%"}}/>
        </View>
    </View>
  )
}

export default DiscountCard;

const styles = StyleSheet.create({
    card:{
        width:340,
        height:127,
        borderRadius:20,
        backgroundColor:"#f87204",
        display:"flex",
        flexDirection:'row',
        marginTop:"2%",
        paddingHorizontal:5,
        marginRight:"2%"

    },
    cardLeft:{
        width:"55%",
        height:'95%',
        display:"flex",
        flexDirection:'column',
        justifyContent:"space-between",
    },
    cardRight:{
        width:"46%",
        height:'100%',
        justifyContent:"center",
        alignItems:"center",
    },
    icon:{
        width:"15%",
        height:"39%"
    }
})
