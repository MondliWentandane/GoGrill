// components/CategoriesComp.tsx - COMPLETE UPDATED
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native';
import IconHolder from './IconHolder';
import TextComp from './TextComp';

interface TheProps {
    catName: string;
    iconURL: string; // Changed from ImageSourcePropType to string
    isSelected?: boolean;
    onPress?: () => void;
}

const CategoriesComp: React.FC<TheProps> = ({catName, iconURL, isSelected = false, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.sectDiv}>
        <IconHolder 
          source={{ uri: iconURL }} // Convert string to ImageSourcePropType
          style={isSelected ? [styles.icon, styles.selectedIcon] : styles.icon}
        />
        <TextComp style={isSelected ? [styles.catName, styles.selectedText] : styles.catName}>
          {catName}
        </TextComp>
    </Pressable>
  )
}

export default CategoriesComp;

const styles = StyleSheet.create({
  sectDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  icon: {
    width: 45,
    height: 40,
    backgroundColor: "#f7990c",
    borderRadius: 10
  },
  selectedIcon: {
    backgroundColor: "#ff9a03",
    borderWidth: 2,
    borderColor: "#ffa600",
  },
  catName: {
    fontSize: 19,
    color: "#666",
    marginTop: 5,
  },
  selectedText: {
    color: "#ff9a03",
    fontWeight: "bold",
  }
});