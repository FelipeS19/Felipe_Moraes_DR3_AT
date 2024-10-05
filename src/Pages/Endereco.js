// Endereco.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CustomButton from '../Components/CustomButton';
import useUserData from '../Utils/useUserData';
import { useNavigation } from '@react-navigation/native';

const Endereco = () => {
  const { fetchAddresses } = useUserData();
  const [addresses, setAddresses] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAddresses = async () => {
      const userAddresses = await fetchAddresses();
      setAddresses(userAddresses);
    };
    loadAddresses();
  }, [fetchAddresses]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Endereços</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.addressCard}>
            <Text>{item.nomeDestinatario}</Text>
            <Text>{item.rua}, {item.bairro}, {item.estado} - {item.cep}</Text>
            <Text>{item.cpf} | {item.celular}</Text>
          </View>
        )}
      />

      <CustomButton title="Cadastrar Novo Endereço" onPress={() => navigation.navigate('AdicionarEndereco')} style={styles.saveButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  addressCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%', 
  },
  saveButton: {
    backgroundColor: '#9fd6d7',
    borderRadius: 10,
  },
});

export default Endereco;
