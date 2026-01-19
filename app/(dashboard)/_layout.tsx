import { Tabs } from 'expo-router'
import React from 'react'
import { Image, View } from 'react-native'

const _layout:React.FC = () => {
  return (
    <Tabs screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:"#ffb428"}}}>
      <Tabs.Screen name='HomePage' options={{tabBarShowLabel:false, tabBarIcon:({focused})=>(
        <Image source={focused? require('@/assets/Icons/houseIcon.png') : require("@/assets/Icons/houseUnfIcon.png")}/>
      )}}/>
      <Tabs.Screen name='ItemsPage' options={{tabBarShowLabel:false, tabBarIcon:({focused})=>(
        <Image source={focused? require('@/assets/Icons/listIcon.png') : require("@/assets/Icons/listUnfoIcon.png")}/>
      )}}/>
      <Tabs.Screen name='CartPage' options={{tabBarShowLabel:false, tabBarIcon:({focused})=>(
        <Image source={focused? require('@/assets/Icons/cartIcon.png') : require("@/assets/Icons/cartUnfoIcon.png")}/>
      )}}/>
      <Tabs.Screen name='ProfilePage' options={{tabBarShowLabel:false, tabBarIcon:({focused})=>(
        <Image source={focused? require('@/assets/Icons/profileFocIcon.png') : require("@/assets/Icons/profileIcon.png")}/>
      )}}/>
    </Tabs>
  )
}

export default _layout
