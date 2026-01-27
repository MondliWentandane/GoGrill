import BackgroundComp from '@/components/BackgroundComp'
import React, { useEffect } from 'react'
import LogoImg from '@/assets/images/Logo.png'
import { Image, StatusBar, StyleSheet, View, ActivityIndicator } from 'react-native'
import TextComp from '@/components/TextComp'
import { router } from 'expo-router'
import NoSessionBtn from "@/components/NoSessionBtn";
import SessionBnt from '@/components/SessionBnt'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { checkSession } from '@/store/slices/authSlice'

const Welcome: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, sessionChecked } = useAppSelector((state) => state.auth);

  // Check if user has an active session when component mounts
  useEffect(() => {
    const checkUserSession = async () => {
      await dispatch(checkSession());
    };
    
    checkUserSession();
  }, [dispatch]);

  // Redirect to HomePage if authenticated and session is checked
  useEffect(() => {
    if (sessionChecked && isAuthenticated) {
      router.replace('/(dashboard)/HomePage');
    }
  }, [isAuthenticated, sessionChecked]);

  // Show loading indicator while checking session
  if (isLoading || !sessionChecked) {
    return (
      <BackgroundComp style={styles.container}>
        <StatusBar />
        <View style={styles.logoHolder}>
          <Image source={LogoImg} style={styles.theLogo} />
          <TextComp style={styles.welcText}>Welcome</TextComp>
          <ActivityIndicator size="large" color="#ff9a03" style={styles.loader} />
          <TextComp style={styles.loadingText}>Checking session...</TextComp>
        </View>
      </BackgroundComp>
    );
  }

  return (
    <BackgroundComp style={styles.container}>
      <StatusBar />
      <View style={styles.logoHolder}>
        <Image source={LogoImg} style={styles.theLogo} />
        <TextComp style={styles.welcText}>Welcome</TextComp>
      </View>
      
      {/* Show SessionBnt if authenticated, otherwise NoSessionBtn */}
      {isAuthenticated ? <SessionBnt /> : <NoSessionBtn />}
    </BackgroundComp>
  )
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24%",
    justifyContent: "flex-end",
  },
  logoHolder: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center"
  },
  theLogo: {
    width: "80%",
    height: "90%",
    borderRadius: 30
  },
  welcText: {
    fontSize: 37,
    fontWeight: "bold",
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  }
})