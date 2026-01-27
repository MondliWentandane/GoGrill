import { router } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TextComp from './TextComp'

const SessionBnt = () => {
  return (
    <View style={styles.btnsHolder}>
        <Pressable 
          onPress={() => router.replace("/(dashboard)/HomePage")} 
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.buttonPressed
          ]}
        >
          <TextComp style={styles.BntText}>Get Started</TextComp>
        </Pressable>
    </View>
  )
}

export default SessionBnt;

const styles = StyleSheet.create({
  btnsHolder: {
    width: "100%",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
    display: 'flex',
    flexDirection: "row",
    gap: "11%",
    marginBottom: 40,
  },
  btn: {
    backgroundColor: "#ff9e0c",
    borderColor: "#ffa600",
    borderWidth: 2,
    width: "75%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  BntText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  }
})