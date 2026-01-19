import BackgroundComp from '@/components/BackgroundComp'
import InputComp from '@/components/InputComp';
import TextComp from '@/components/TextComp';
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native';
import fcbkIcon from "@/assets/Icons/fcgkIcon 1.png";
import gglIcon from "@/assets/Icons/googleIcon.png";
import twtIcon from "@/assets/Icons/twiterIcon.png";
import { router } from 'expo-router';

const SignUp: React.FC = () => {
  return (
    <BackgroundComp style={styles.container}>
        <View style={styles.formCont}>
            <TextComp style={styles.ttlStyle}>Get Started</TextComp>
            <InputComp label='Name'/>
            <InputComp label='Email'/>
            <InputComp label='Contact Number'/>
            <InputComp label='Home Address' thePlaceholder='(Optional, can edit later)'/>
            <InputComp label='New Password'/>
            <View style={{height:"100%", width:"100%", alignItems:"center"}}>
                <View style={styles.policySect}>
                    <Pressable>
                        {({pressed})=>(
                            <Image source={pressed? require("@/assets/Icons/checkBoxChecked.png")
                                    : require('@/assets/Icons/checkBox.png')
                            }/>
                        )} 
                    </Pressable>
                    <TextComp style={[{fontSize:15}]}>By signing up, you agree to the terms and conditions of service and privacy policy</TextComp>
                </View>
                <Pressable onPress={()=> router.push("/(dashboard)/HomePage")} style={styles.btn}>
                <TextComp  style={styles.BntText}>Sign Up</TextComp>
                </Pressable>
                <TextComp style={[{fontSize:15}]}>Sign Up with</TextComp>
                <View style={styles.socialIconsHolder}>
                    <Pressable><Image source={fcbkIcon}/></Pressable>
                    <Pressable><Image source={gglIcon}/></Pressable>
                    <Pressable><Image source={twtIcon}/></Pressable>
                </View>
                <View style={styles.swicthHolder}>
                    <TextComp style={[{fontSize:19, color:"#0a0a0a"}]}>Already have an account? </TextComp>
                    <Pressable onPress={()=> router.push('/SignIn')}>
                        <TextComp style={[{fontSize:19}]}>Login </TextComp>
                    </Pressable>
                </View>
                
            </View>
            

        </View>
    </BackgroundComp>
  )
}

export default SignUp;


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
        height:"92%",
        paddingHorizontal:13,
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        gap:"4%"
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
    height:"7%",
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
