import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import TextComp from '../TextComp';

interface CheckoutLastCardProps {
  totalAmount: number;
}

const CheckoutLastCard: React.FC<CheckoutLastCardProps> = ({ totalAmount }) => {
  return (
    <View style={styles.cardPrice}>
      <View style={{width:"100%", alignItems:"flex-end", paddingTop:3, paddingRight:8}}>
        <Image source={require("@/assets/images/VisaImg.png")} style={{width:90, height:22}}/>
      </View>
      <View style={styles.totalContainer}>
        <TextComp style={styles.totalText}>
          Total: R{totalAmount.toFixed(2)}
        </TextComp>
        <Pressable>
          <TextComp style={styles.editText}>
            Edit <Image source={require("@/assets/Icons/editIcon.png")} style={{width:20, height:20}}/>
          </TextComp>
        </Pressable>
      </View>
    </View>
  )
}

export default CheckoutLastCard;

const styles = StyleSheet.create({
  cardPrice: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f7990c",
    width: "95%",
    height: 55,
    alignSelf: "center",
    borderRadius: 10,
    paddingBottom: 10,
    paddingLeft: 3
  },
  totalContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 3
  },
  totalText: {
    fontSize: 19,
    color: "#000000",
    backgroundColor: "#EAEBF0",
    padding: 1,
    borderRadius: 5,
    fontWeight: "bold"
  },
  editText: {
    fontSize: 17,
    color: "#ffffff"
  }
});