import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useFavorites } from '../Context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import ImageCard from '../Components/Imagecpn'; 

const Telafavorit = () => {
  const { favorites, fetchFavorites } = useFavorites();
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavorites(); 
  }, []);

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { item })}>
      <ImageCard
        title={item.title}
        description={item.description}
        valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
        imageUrls={item.imageUrls}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Itens Favoritos</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyMessage}>Você não tem itens favoritos ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});

export default Telafavorit;
