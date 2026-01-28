import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, Pressable, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface TheProps extends ViewProps {
    style?: ViewStyle | ViewStyle[];
    styleIc?: ImageStyle | ImageStyle[];
    source: ImageSourcePropType;
    onPress?: () => void;
}

const IconHolder: React.FC<TheProps> = ({style, styleIc, source, onPress, ...props}) => {
  const IconContent = () => (
    <View style={[styles.boxStyle, style,]} {...props}>
      <Image source={source} style={[ styles.imgStyle ,styleIc]}/>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <IconContent />
      </Pressable>
    );
  }

  return <IconContent />;
}

export default IconHolder;

const styles= StyleSheet.create({
    boxStyle:{
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10
    },
    imgStyle:{
        width:"70%",
        height:"70%"
    }
});