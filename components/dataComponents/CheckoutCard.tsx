import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import TextComp from '../TextComp';
import { router } from 'expo-router';

const CheckoutCard: React.FC = () => {
  return (
    <View style={styles.checkoutBtn}>
        <TextComp style={{color:"#000000", marginRight:"2%", fontSize:20}}>Total</TextComp>
        <TextComp style={{color:"#06b306", marginRight:"2%", fontSize:20}}>R248.42</TextComp>  
        <Pressable onPress={()=>(router.push("/(checkout)/Checkout"))} style={styles.btnCheck}>
            <TextComp style={{color:"#ffffff", fontSize:18, fontWeight:"bold"}}>CheckOut</TextComp>
        </Pressable>
    </View>
  )
}

export default CheckoutCard;

const styles = StyleSheet.create({
  itemsHolder:{
    width:"100%",
    height:"74%",
    marginTop:15,
    borderBottomWidth:2,
    borderColor:"#00000033",
    marginBottom:9
  },
  checkoutBtn:{
    width:"95%",
    height: 45,
    backgroundColor:"#EAEBF0",
    borderRadius:10,
    alignSelf:"center",
    alignItems:"center",
    justifyContent:"center",
    display:"flex",
    flexDirection:"row"
  },
  btnCheck:{
    padding:"1%",
    backgroundColor:"#060606",
    borderRadius:5,
    marginLeft:"19%"
  }
})
