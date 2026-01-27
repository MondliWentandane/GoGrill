import BackgroundComp from '@/components/BackgroundComp'
import InputComp from '@/components/InputComp';
import TextComp from '@/components/TextComp';
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import fcbkIcon from "@/assets/Icons/fcgkIcon 1.png";
import gglIcon from "@/assets/Icons/googleIcon.png";
import twtIcon from "@/assets/Icons/twiterIcon.png";
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/slices/authSlice';

const SignIn = () => {
    const dispatch = useAppDispatch();
    const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    // ===== State for login form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    //===== Handle input changes
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    //===== Handle login
    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            Alert.alert('Missing Fields', 'Please enter both email and password');
            return;
        }
        try {
            await dispatch(login(formData)).unwrap();
            dispatch(clearError());
            router.replace('/(dashboard)/HomePage');
        } catch (err: any) {
            Alert.alert('Login Failed', err || 'Invalid email or password');
        }
    };

    // ====== Show error alert if exists
    React.useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
            dispatch(clearError());}
    }, [error, dispatch]);

    //====== If already authenticated, redirect to dashboard
    React.useEffect(() => {
        if (isAuthenticated) {
            router.replace('/(dashboard)/HomePage');}
    }, [isAuthenticated]);

    return (
        <BackgroundComp style={styles.container}>
            <View style={styles.formCont}>
                <TextComp style={styles.ttlStyle}>Welcome Back</TextComp>
                <InputComp label='Email' value={formData.email} onChangeText={(text) => handleInputChange('email', text)} keyboardType="email-address" autoCapitalize="none"/>
                <InputComp label='Password' value={formData.password} onChangeText={(text) => handleInputChange('password', text)} secureTextEntry={true} autoCapitalize="none"/>
                <View style={{ height: "100%", width: "100%", alignItems: "center", marginTop: 20 }}>
                    <Pressable onPress={handleLogin} style={styles.btn} disabled={isLoading} >
                        {isLoading ? (<ActivityIndicator color="#ffffff" />) : (<TextComp style={styles.BntText}>Login</TextComp> )}
                    </Pressable>
                    <TextComp style={[{ fontSize: 15, marginTop: 10, marginBottom: 10 }]}>Login with</TextComp>
                    <View style={styles.socialIconsHolder}>
                        <Pressable><Image source={fcbkIcon} /></Pressable>
                        <Pressable><Image source={gglIcon} /></Pressable>
                        <Pressable><Image source={twtIcon} /></Pressable>
                    </View>
                    <View style={styles.swicthHolder}>
                        <TextComp style={[{ fontSize: 19, color: "#0a0a0a" }]}>Don't have an account? </TextComp>
                        <Pressable onPress={() => router.push('/SignUp')}>
                            <TextComp style={[{ fontSize: 19, color: "#ff9a03" }]}>Sign Up</TextComp>
                        </Pressable>
                    </View>
                </View>
            </View>
        </BackgroundComp>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ff9a03",
        paddingHorizontal: 0,
        justifyContent: "flex-end"
    },
    formCont: {
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "60%",
        paddingHorizontal: 13,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "7%",
        paddingTop: 20,
    },
    ttlStyle: {
        fontSize: 32,
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: "#ff9e0c",
        borderColor: "#ffa600",
        borderWidth: 2,
        width: "75%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        opacity: 1,
    },
    BntText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 18,
    },
    socialIconsHolder: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: '10%'
    },
    swicthHolder: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
    }
})