import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';

const TableComponent = ({ data, onIncreaseQuantity, onDecreaseQuantity }) => {
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.cell}>
          <Image source={{ uri: 'path_to_image' }} style={styles.image} />
        </DataTable.Title>
        <DataTable.Title>Descrição</DataTable.Title>
        <DataTable.Title>Quantidade</DataTable.Title>
        <DataTable.Title numeric>Valor</DataTable.Title>
      </DataTable.Header>

      {data.map((row) => (
        <DataTable.Row key={row.id} style={styles.row}>
          <DataTable.Cell style={styles.cell}>
            <Image source={{ uri: row.image }} style={styles.image} />
          </DataTable.Cell>
          <DataTable.Cell>{row.description}</DataTable.Cell>
          <DataTable.Cell>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => onDecreaseQuantity(row)}>
                <Text style={styles.decreaseButton}>-</Text>
              </TouchableOpacity>
              <Text>{row.quantity}</Text>
              <TouchableOpacity onPress={() => onIncreaseQuantity(row)}>
                <Text style={styles.increaseButton}>+</Text>
              </TouchableOpacity>
            </View>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(row.price)}
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 70,
  },
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  increaseButton: {
    marginLeft: 10,
    fontSize: 18,
    color: 'blue',
  },
  decreaseButton: {
    marginRight: 10,
    fontSize: 18,
    color: 'red',
  },
});

export default TableComponent;
