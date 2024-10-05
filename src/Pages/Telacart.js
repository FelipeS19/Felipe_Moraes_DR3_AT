import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../Context/Cartcontext';
import TableComponent from '../Components/TableComponent';
import useUserData from '../Utils/useUserData';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../Components/CustomButton';

const Telacart = () => {
    const { cartItems, setCartItems } = useCart();
    const { fetchAddresses } = useUserData();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [addresses, setAddresses] = useState([]);
    const [modalVisibleAddress, setModalVisibleAddress] = useState(false);
    const [modalVisiblePayment, setModalVisiblePayment] = useState(false);

    useEffect(() => {
        const loadAddresses = async () => {
            const userAddresses = await fetchAddresses();
            setAddresses(userAddresses);
        };
        loadAddresses();
    }, [fetchAddresses]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('cartItems');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };
        loadCartItems();
    }, []);

    useEffect(() => {
        const saveCartItems = async () => {
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        };
        saveCartItems();
    }, [cartItems]);

    const totalPrice = cartItems.reduce((total, item) => total + item.valor * item.quantity, 0);

    const updateCartQuantity = (itemId, increment) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(item.quantity + (increment ? 1 : -1), 0);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0);
        setCartItems(updatedCartItems);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho de Compras</Text>

            <TouchableOpacity onPress={() => setModalVisibleAddress(!modalVisibleAddress)} style={styles.address}>
                <Text style={styles.label}>Selecione um Endereço</Text>
                <Text style={styles.selectedValue}>
                    {selectedAddress ? `${selectedAddress.rua}, ${selectedAddress.bairro}, ${selectedAddress.estado}` : "Nenhum endereço selecionado."}
                </Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisibleAddress} onRequestClose={() => setModalVisibleAddress(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione um Endereço</Text>
                        {addresses.map((address, index) => (
                            <TouchableOpacity key={index} onPress={() => { setSelectedAddress(address); setModalVisibleAddress(false); }}>
                                <Text style={styles.modalItem}>{`${address.rua}, ${address.bairro}, ${address.estado}`}</Text>
                            </TouchableOpacity>
                        ))}
                        <CustomButton title="Fechar" onPress={() => setModalVisibleAddress(false)} style={styles.modalButton} />
                    </View>
                </View>
            </Modal>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyMessage}>O carrinho está vazio.</Text>
            ) : (
                <TableComponent
                    data={cartItems.map(item => ({
                        id: item.id,
                        image: item.imageUrls[0],
                        description: item.description,
                        quantity: item.quantity,
                        price: item.valor
                    }))}
                    onIncreaseQuantity={item => updateCartQuantity(item.id, true)}
                    onDecreaseQuantity={item => updateCartQuantity(item.id, false)}
                />
            )}

            <TouchableOpacity onPress={() => setModalVisiblePayment(!modalVisiblePayment)} style={styles.pagar}>
                <Text style={styles.label}>Pagamento</Text>
                <Text style={styles.selectedValue}>{paymentMethod}</Text>
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisiblePayment} onRequestClose={() => setModalVisiblePayment(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Forma de Pagamento</Text>
                        <Picker selectedValue={paymentMethod} onValueChange={setPaymentMethod} style={styles.picker}>
                            <Picker.Item label="Pix" value="pix" />
                            <Picker.Item label="Cartão de Crédito" value="Credito" />
                            <Picker.Item label="Cartão de Débito" value="Debito" />
                            <Picker.Item label="Boleto" value="boleto" />
                        </Picker>
                        <CustomButton title="Confirmar" onPress={() => setModalVisiblePayment(false)} style={styles.modalButton} />
                    </View>
                </View>
            </Modal>

            <Text style={styles.total}>
                Valor Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        fontFamily: 'Literata-Regular'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center',
        marginBottom: 30,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        bottom: -200,
        marginTop: 20
    },
    emptyMessage: {
        fontSize: 16,
        color: 'gray'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    pagar: {
        marginTop: 20,
        borderWidth: 1,          
        borderColor: '#ccc',    
        borderRadius: 10,        
        fontSize: 25,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: -20,
        bottom: -200,
    },
    address: {
        marginTop: 0,
        borderWidth: 1,          
        borderColor: '#ccc',    
        borderRadius: 10,        
        fontSize: 25,
        fontWeight: 'bold',
        marginHorizontal: -20,
        marginBottom: 20,
    },
    selectedValue: {
        marginTop: 10,
        fontSize: 17,
        color: 'gray',
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        height: 340,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        position: 'absolute',
        bottom: 0,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#000',
        width: '80%',
        borderRadius: 10,
        bottom: -20,
    },
    modalItem: {
        fontSize: 20,
        marginVertical: 5
    },
    picker: {
        width: '100%',
        height: 190
    },
});

export default Telacart;
