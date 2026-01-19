import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TextComp from './TextComp'

const NoSessionBtn = () => {
  return (
    <View style={styles.btnsHolder}>
        <Pressable onPress={()=> router.push("/SignIn")} style={styles.signInBnt}>
          <TextComp>Sign In</TextComp>
        </Pressable>
        <Pressable onPress={()=> router.push("/SignUp")} style={styles.signUpBnt}>
          <TextComp style={styles.signUpBntText}>Sign Up</TextComp>
        </Pressable>
    </View>
  )
}

export default NoSessionBtn;

const styles= StyleSheet.create({
  btnsHolder:{
    width:"100%",
    height:"9%",
    justifyContent:"center",
    alignItems:"center",
    display:'flex',
    flexDirection:"row",
    gap:"11%"
  },
  signInBnt:{
    borderColor:"#ffa600",
    borderWidth: 2,
    width:"35%",
    height:"70%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15
  },
  signUpBnt:{
    backgroundColor:"#ff9e0c",
    borderColor:"#ffa600",
    borderWidth: 2,
    width:"35%",
    height:"70%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15
  },
  signUpBntText:{
    color:"#ffffff"
  }
})
