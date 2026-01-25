import React from 'react'
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'

interface TheProps extends ViewProps{
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const BackgroundComp:React.FC<TheProps> = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
        {children}
    </View>
  )
}

export default BackgroundComp;

const styles= StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
        width:"100%",
        height:"100%",
        paddingHorizontal:"2%",
        
    }
})
