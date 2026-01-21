import React from 'react'
import { ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, View } from 'react-native';
import IconHolder from './IconHolder';
import TextComp from './TextComp';

interface TheProps{
    catName: string;
    iconURL: ImageSourcePropType;
}

const CategoriesComp: React.FC<TheProps> = ({catName, iconURL,}) => {
  return (
    <View style={styles.sectDiv}>
        <IconHolder source={iconURL} style={[styles.icon]}/>
        <TextComp style={{fontSize:19}}>{catName}</TextComp>
    </View>
  )
}

export default CategoriesComp;
const styles= StyleSheet.create({
  sectDiv:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
  },
  icon:{
    width:45,
    height:40,
    backgroundColor:"#f7990c",
    borderRadius:10
  }
})
