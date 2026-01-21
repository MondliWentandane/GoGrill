import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import TextComp from '../TextComp';
import IconHolder from '../IconHolder';

interface TheProps{
    theImage: ImageSourcePropType;
    name: string;
    descr: string;
    time: number;
    price: number;
}

const PopulerMealsCard: React.FC<TheProps> = ({theImage, name, descr, time, price}) => {
  return (
    <View style={styles.card}>
        <Image style={styles.imgStyle} source={theImage}/>
        <View style={styles.bottomSect}>
            <View style={{paddingTop:"1%", paddingLeft:"1%",}}>
                <TextComp style={{fontSize:20, color:"#ffffff", lineHeight:14}}>{name}</TextComp>
                <TextComp style={{fontSize:13, color:"#ffffff", width:"70%"}}>{descr}</TextComp>
            </View>
            <View style={styles.iconsSect}>
                <IconHolder styleIc={{height:"80%", width:"80%"}} style={styles.iconHo} 
                            source={require("@/assets/Icons/cartAddIcon.png")}/>
                <View style={{display:"flex", flexDirection:"row", gap:"3%"}}>
                    <IconHolder styleIc={{height:"80%", width:"80%"}} style={styles.iconHo} 
                            source={require("@/assets/Icons/scheduleIcon.png")}/>                    
                    <TextComp style={{fontSize:16, color:"#ffffff", lineHeight:14,  alignSelf:"center"}}>
                        {time}min
                    </TextComp>
                </View>
                <TextComp style={{fontSize:20, color:"#ffffff", lineHeight:14, alignSelf:"center"}}>R{price}</TextComp>
            </View>
        </View>
    </View>
  )
}

export default PopulerMealsCard;

const styles= StyleSheet.create({
    card:{
        width:"100%",
        height:220,
        backgroundColor:"#f87204",
        borderRadius:20,
        marginBottom:"2%"
    },
    imgStyle:{
        width:"100%",
        height:"55%",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    bottomSect:{
        justifyContent:"space-between",
        height:"45%",
    },
    iconsSect:{
        paddingLeft:"2%",
        paddingRight:"2%",
        height:"34%",
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    iconHo:{
        borderColor:"#ffffff", 
        borderWidth:1, 
        borderRadius:5, 
        height:28, 
        width:29
    }
})