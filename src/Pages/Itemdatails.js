// ItemDetails.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Dimensions, TouchableOpacity,Alert } from 'react-native';
import { useCart } from '../Context/Cartcontext';
import Icon from "react-native-vector-icons/Ionicons";


const { width } = Dimensions.get('window');

const Itemdetails = ({ route }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { cartItems, addToCart, setCartItems } = useCart();
  const { item } = route.params;

  const handleAddToCart = () => {
    const newItem = { ...item, quantity: 1 };

    const existingItem = cartItems.find(item => item.id === newItem.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      const updatedCartItems = cartItems.map(item =>
        item.id === newItem.id ? updatedItem : item
      );
      setCartItems(updatedCartItems);
      Alert.alert('Item adicionado ao carrinho!');
    } else {
      addToCart(newItem);
      Alert.alert('Item adicionado ao carrinho!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={item.imageUrls}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            onError={() => console.error('Erro ao carregar a imagem')}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={event => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
      />
      <View style={styles.pagination2}>
        {item.imageUrls.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot2, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
          />
        ))}
      </View>

      <View style={styles.dados}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.value}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
        </Text>
      </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.Addcart}>
          <Icon name="cart" size={30} color="black" />
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    marginLeft: 80,
  },
  dados: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  activeDot: {
    backgroundColor: '#2196F3',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  pagination2: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  paginationDot2: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Itemdetails;
