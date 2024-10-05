// AdicionarEndereco.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import CustomButton from '../Components/CustomButton';
import useUserData from '../Utils/useUserData';

const AdicionarEndereco = ({ navigation }) => {
  const { handleSaveAddress } = useUserData();
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');

  const handleCepChange = async (inputCep) => {
    setCep(inputCep);
    if (inputCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${inputCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setEstado(data.uf);
        } else {
          Alert.alert('CEP inválido', 'Por favor, verifique o CEP informado.');
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const validateCPF = (cpf) => {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(cpf);
  };

  const validateCelular = (celular) => {
    const celularRegex = /^\d{10,11}$/; 
    return celularRegex.test(celular);
  };

  const handleSubmit = async () => {
    // Validações
    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF deve conter 11 dígitos.');
      return;
    }

    if (!validateCelular(celular)) {
      Alert.alert('Erro', 'Número de celular deve ter 10 ou 11 dígitos.');
      return;
    }

    const addressData = {
      nomeDestinatario,
      cep,
      rua,
      bairro,
      estado,
      cpf,
      celular,
    };

    await handleSaveAddress(addressData);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Endereço</Text>
      <TextInput
        style={styles.input}
        value={cep}
        onChangeText={handleCepChange}
        placeholder="CEP"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={rua}
        onChangeText={setRua}
        placeholder="Rua"
      />
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        placeholder="Estado"
      />
      <TextInput
        style={styles.input}
        value={nomeDestinatario}
        onChangeText={setNomeDestinatario}
        placeholder="Nome do Destinatário"
      />
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="CPF"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={celular}
        onChangeText={setCelular}
        placeholder="Número de Celular"
        keyboardType="numeric"
      />
      
      <CustomButton title="Salvar Endereço" onPress={handleSubmit} style={styles.saveButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#9fd6d7',
    borderRadius: 10,
  },
});

export default AdicionarEndereco;
