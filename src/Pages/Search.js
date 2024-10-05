// Search.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { fetchItems } from '../Utils/Firebasedata';
import ImageCard from '../Components/Imagecpn';
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = fetchItems((data) => {
      if (data && typeof data === 'object') {
        const allItems = Object.values(data).flat();
        setItems(allItems);
        setFilteredItems(allItems);
      } else {
        console.error("Dados inválidos recebidos.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = Array.isArray(items)
        ? items.filter(item =>
          (item.title && item.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (item.categoria && item.categoria.toLowerCase().includes(lowerCaseSearchTerm))
        )
        : [];
      setFilteredItems(filtered);
    } else {
      setFilteredItems(Array.isArray(items) ? items : []);
    }
  }, [searchTerm, items]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { item })}>
    <ImageCard
      title={item.title || "Título indisponível"}
      description={item.description || "Descrição indisponível"}
      valor={item.valor || "Valor indisponível"}
      imageUrls={item.imageUrls || []}
      imageStyle={styles.imageStyle} 
    />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome, categoria ou marca"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        contentContainerStyle={filteredItems.length === 0 ? { flexGrow: 1 } : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  imageStyle: {
    height: 150,
    width: 150,
  },
  description: {
    color: '#666',
    numberOfLines: 2,
    ellipsizeMode: 'tail',
  },
});

export default Search;
