import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import IconHolder from './IconHolder'

const SearchComp: React.FC = () => {
  return (
    <View style={ styles.container}>
        <IconHolder style={styles.iconHStyle} source={require('@/assets/Icons/searchIcob.png')}/>
        <TextInput style={{fontSize:16}} placeholder='Search'/>
    </View>
  )
}

export default SearchComp;

const styles= StyleSheet.create({
    iconHStyle:{

    },
    container:{
        width:"100%",
        height:40,
        backgroundColor:"#ff92041a",
        display:"flex",
        flexDirection:'row',
        alignItems:"center",
        borderColor:"#ff9204",
        borderWidth:2,
        borderRadius:10

    }
})
