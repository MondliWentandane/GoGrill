import BackgroundComp from '@/components/BackgroundComp'
import React from 'react'
import LogoImg from '@/assets/images/Logo.png'
import { Image, Pressable, StatusBar, StyleSheet, View } from 'react-native'
import TextComp from '@/components/TextComp'
import { router } from 'expo-router'
import NoSessionBtn from "@/components/NoSessionBtn";
import SessionBnt from '@/components/SessionBnt'

const Welcome:React.FC = () => {
  return (
    <BackgroundComp style={styles.container}>
      <StatusBar/>
      <View style={styles.logoHolder}>
        <Image source={LogoImg} style={ styles.theLogo}/>
        <TextComp style={styles.welcText}>Welcome</TextComp>
      </View>
      <NoSessionBtn/>
    </BackgroundComp>
  )
}

export default Welcome;

const styles= StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"column",
    gap:"24%",
    justifyContent:"flex-end",
  },
  logoHolder:{
    width:"100%",
    height:"40%",
    justifyContent:"center",
    alignItems:"center"
  },
  theLogo:{
    width:"80%",
    height:"90%",
    borderRadius:30
  },
  welcText:{
    fontSize:37,
    fontWeight:"bold"
  },
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
