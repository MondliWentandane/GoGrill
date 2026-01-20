import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface TheProps{
    style?: ViewStyle | ViewStyle[];
    styleIc?: ImageStyle | ImageStyle[];
    source: ImageSourcePropType;
}

const IconHolder: React.FC<TheProps> = ({style, styleIc, source}) => {
  return (
    <View style={[styles.boxStyle, style,]}>
        <Image source={source} style={[ styles.imgStyle ,styleIc]}/>
    </View>
  )
}

export default IconHolder;

const styles= StyleSheet.create({
    boxStyle:{
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    imgStyle:{
        width:"70%",
        height:"70%"
    }
})
