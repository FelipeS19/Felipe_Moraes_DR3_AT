import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { fetchItems } from '../Utils/Firebasedata'; 
import ImageCard from '../Components/Imagecpn';


const Telacat = ({ route }) => {
  const { categoria } = route.params; 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      fetchItems(setItems, (allItems) => {
        const filteredItems = allItems.filter(item => item.categoria === categoria);
        setItems(filteredItems);
      });
    };

    loadItems();
  }, [categoria]);

  const renderItem = ({ item }) => (
    <ImageCard
      title={item.title || "Título indisponível"}
      description={item.description || "Descrição indisponível"}
      valor={item.valor || "Valor indisponível"}
      imageUrls={item.imageUrls || []}
      imageStyle={styles.imageStyle} 
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoria}</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    fontFamily: 'Literata-Regular',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Luciole-Regular',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default Telacat;
