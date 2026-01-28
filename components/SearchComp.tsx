import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import IconHolder from './IconHolder'

interface SearchCompProps {
  onSearch?: (searchTerm: string) => void;
}

const SearchComp: React.FC<SearchCompProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <IconHolder 
        style={styles.iconHolder} 
        source={require('@/assets/Icons/searchIcob.png')}
      />
      <TextInput 
        style={styles.input}
        placeholder='Search meals...'
        value={searchTerm}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />
    </View>
  )
}

export default SearchComp;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#ff92041a",
    flexDirection: 'row',
    alignItems: "center",
    borderColor: "#ff9204",
    borderWidth: 0.4,
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  iconHolder: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
});