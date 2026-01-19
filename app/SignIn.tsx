import BackgroundComp from '@/components/BackgroundComp'
import InputComp from '@/components/InputComp';
import TextComp from '@/components/TextComp';
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native';
import fcbkIcon from "@/assets/Icons/fcgkIcon 1.png";
import gglIcon from "@/assets/Icons/googleIcon.png";
import twtIcon from "@/assets/Icons/twiterIcon.png";
import { router } from 'expo-router';

const SignIn = () => {
  return (
    <BackgroundComp style={styles.container}>
        <View style={styles.formCont}>
            <TextComp style={styles.ttlStyle}>Welcome Back</TextComp>
            <InputComp label='Email'/>
            <InputComp label='Password'/>
            <View style={{height:"100%", width:"100%", alignItems:"center", marginTop:20}}>
                <Pressable onPress={()=> router.push("/(dashboard)/HomePage")} style={styles.btn}>
                <TextComp style={styles.BntText}>Login</TextComp>
                </Pressable>
                <TextComp style={[{fontSize:15,  marginTop:10, marginBottom:10}]}>Login with</TextComp>
                <View style={styles.socialIconsHolder}>
                    <Pressable><Image source={fcbkIcon}/></Pressable>
                    <Pressable><Image source={gglIcon}/></Pressable>
                    <Pressable><Image source={twtIcon}/></Pressable>
                </View>
                <View style={styles.swicthHolder}>
                    <TextComp style={[{fontSize:19, color:"#0a0a0a"}]}>Don't have an account? </TextComp>
                    <Pressable onPress={()=> router.push('/SignUp')}>
                        <TextComp style={[{fontSize:19}]}>Sign Up </TextComp>
                    </Pressable>
                </View>
                
            </View>
            

        </View>
    </BackgroundComp>
  )
}

export default SignIn;

const styles= StyleSheet.create({
    container:{
        backgroundColor:"#ff9a03",
        paddingHorizontal:0,
        justifyContent:"flex-end"
    },
    formCont:{
        backgroundColor:"#ffffff",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:"60%",
        paddingHorizontal:13,
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        gap:"7%"
    },
    ttlStyle:{
        fontSize:32,
        fontWeight:"bold",
    },
    policySect:{
        width:"100%",
        height:"7%",
        alignItems:"center",
        display:"flex",
        flexDirection:"row",
        paddingLeft:5

    },
    btn:{
    backgroundColor:"#ff9e0c",
    borderColor:"#ffa600",
    borderWidth: 2,
    width:"75%",
    height:"11%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:15
  },
  BntText:{
    color:"#ffffff",
    fontWeight:"bold"
  },
  socialIconsHolder:{
    width:"100%",
    height:"10%",
    justifyContent:"center",
    alignItems:"center",
    display:"flex",
    flexDirection:"row",
    gap:'10%'
  },
  swicthHolder:{
    width:"100%",
    height:"10%",
    justifyContent:"center",
    alignItems:"center",
    display:"flex",
    flexDirection:"row",
  }
})
