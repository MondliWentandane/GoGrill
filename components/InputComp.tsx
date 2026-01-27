import React from 'react'
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View } from 'react-native'

interface InputProps extends TextInputProps{
    label?: string;
    style?: StyleProp<TextStyle>;
    styleL?: TextStyle | TextStyle[];
    thePlaceholder?: string;
    value?:string;
    onChangeText?: (text:string)=>void;
    secureTextEntry?: boolean;
}

const InputComp: React.FC<InputProps> = ({label, thePlaceholder, style, styleL,value, onChangeText, secureTextEntry = false, ...props}) => {
  return (
    <View style={{width:"100%", height:40}}>
        <Text style={[styleL, styles.lblStyle]}>{label}</Text>
        <TextInput value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} 
                   style={[style, styles.theStyle]} placeholder={thePlaceholder} {...props}/>
    </View>
  )
}

export default InputComp;

const styles = StyleSheet.create({
    theStyle:{
        width:"100%",
        height:"100%",
        borderRadius:10,
        backgroundColor:"#ff9a0310",
        fontSize:18,
        borderColor:"#ff9a03",
        borderWidth:2,
    },
    lblStyle:{
        fontSize:18,
        color:"#ff9a03"
    }
})
