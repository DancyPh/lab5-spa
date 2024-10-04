import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const addService = async (name, price) => {
  try {
    await addDoc(collection(db, 'services'), {
      name: name,
      price: price,
      createAt: serverTimestamp()
    });
    console.log('Add service success!');
    Alert.alert('Thành công', 'Dịch vụ đã được thêm!');
  } catch (e) {
    console.log("Lỗi: ", e.message);
    Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm dịch vụ.');
  }
};

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddService = () => {
    if (!name || !price) {
      Alert.alert('Thông báo', 'Vui lòng nhập tên và giá dịch vụ.');
      return;
    }
    // Gọi hàm addService với tên và giá
    addService(name, parseFloat(price));
    // Reset input fields
    setName('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Dịch Vụ Mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Giá dịch vụ"
        value={price}
        keyboardType="numeric" 
        onChangeText={setPrice}
      />
      <Button title="Thêm Dịch Vụ" onPress={handleAddService} />
    </View>
  );
};

export default AddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
