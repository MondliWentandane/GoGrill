import BackgroundComp from '@/components/BackgroundComp'
import InputComp from '@/components/InputComp';
import TextComp from '@/components/TextComp';
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import fcbkIcon from "@/assets/Icons/fcgkIcon 1.png";
import gglIcon from "@/assets/Icons/googleIcon.png";
import twtIcon from "@/assets/Icons/twiterIcon.png";
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signUp, clearError } from '@/store/slices/authSlice';

const SignUp: React.FC = () => {

    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    //=== Bellow is the state for the form fields
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        password:"",
        agreeToTerms: false,
    })

    // Handle input changes
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Handle checkbox toggle
    const toggleTerms = () => {
        setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }));
    };

    // Handle sign up
    const handleSignUp = async () => {
        if (!formData.agreeToTerms) {
            Alert.alert('Terms Required', 'Please agree to the terms and conditions');
            return;
        }
        if (!formData.name || !formData.email || !formData.password) {
            Alert.alert('Missing Fields', 'Please fill in all required fields');
            return;
        }
        try {
            await dispatch(signUp(formData)).unwrap();
            // Clear any previous errors
            dispatch(clearError());
            // Navigate to sign in page after successful sign up
            Alert.alert('Success', 'Account created successfully! Please sign in.');
            router.push('/SignIn');
        } catch (err: any) {
            // Error is already handled by Redux, show it to user
            Alert.alert('Sign Up Failed', err || 'Something went wrong');
        }
    };
    // Show error alert if exists
    React.useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

  return (
    <BackgroundComp style={styles.container}>
        <View style={styles.formCont}>
            <TextComp style={styles.ttlStyle}>Get Started</TextComp>
            <InputComp label='Name *' value={formData.name} onChangeText={(text) => handleInputChange('name', text)} autoCapitalize="words"/>
                <InputComp label='Email *' value={formData.email} onChangeText={(text) => handleInputChange('email', text)} keyboardType="email-address" autoCapitalize="none"/>
                <InputComp label='Contact Number' value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} keyboardType="phone-pad"/>
                <InputComp label='Home Address' thePlaceholder='(Optional, can edit later)' value={formData.address} onChangeText={(text) => handleInputChange('address', text)}/>
                <InputComp label='New Password *' value={formData.password} onChangeText={(text) => handleInputChange('password', text)} secureTextEntry={true} autoCapitalize="none"/>
            <View style={{height:"100%", width:"100%", alignItems:"center"}}>
                <View style={styles.policySect}>
                    <Pressable onPress={toggleTerms}>
                        {({ pressed }) => (<Image source={formData.agreeToTerms || pressed
                                    ? require("@/assets/Icons/checkBoxChecked.png")
                                    : require('@/assets/Icons/checkBox.png') }/>)}
                    </Pressable>
                    <TextComp style={[{ fontSize: 15 }]}>
                        By signing up, you agree to the terms and conditions of service and privacy policy
                    </TextComp>
                </View>
                <Pressable
                    onPress={handleSignUp}
                    style={styles.btn}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <TextComp style={styles.BntText}>Sign Up</TextComp>
                    )}
                </Pressable>
                <TextComp style={[{fontSize:15}]}>Sign Up with</TextComp>
                <View style={styles.socialIconsHolder}>
                    <Pressable><Image source={fcbkIcon}/></Pressable>
                    <Pressable><Image source={gglIcon}/></Pressable>
                    <Pressable><Image source={twtIcon}/></Pressable>
                </View>
                <View style={styles.swicthHolder}>
                    <TextComp style={[{ fontSize: 19, color: "#0a0a0a" }]}>Already have an account? </TextComp>
                    <Pressable onPress={() => router.push('/SignIn')}>
                        <TextComp style={[{ fontSize: 19, color: "#ff9a03" }]}>Login</TextComp>
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
