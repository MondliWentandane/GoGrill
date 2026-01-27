import React from 'react'
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native'
 
interface TheProps extends TextProps {
  children?: React.ReactNode;
  style?: TextStyle | TextStyle[] | (TextStyle | false | null | undefined)[];
}

const TextComp: React.FC<TheProps> = ({ children, style, ...props }) => {
  // Filter out any false/null/undefined values from the style array
  const flattenStyle = React.useMemo(() => {
    if (!style) return styles.textStyle;
    
    if (Array.isArray(style)) {
      // Filter out falsy values and flatten
      return [styles.textStyle, ...style.filter(s => s && typeof s === 'object')];
    }
    
    return [styles.textStyle, style];
  }, [style]);

  return (
    <Text style={flattenStyle} {...props}>
      {children}
    </Text>
  )
}

export default TextComp;

const styles = StyleSheet.create({
  textStyle: {
    color: "#ffa600",
    fontSize: 24
  }
})