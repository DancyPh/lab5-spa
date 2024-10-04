import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; 

const ServicesScreen = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Lấy thông tin user từ context

  useEffect(() => {
    const servicesCollection = collection(db, 'services');

    // Sử dụng onSnapshot để lắng nghe thay đổi trong collection
    const unsubscribe = onSnapshot(
      servicesCollection,
      (snapshot) => {
        const servicesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(servicesList);
        setLoading(false);
      },
      (error) => {
        console.error('Lỗi khi lấy dịch vụ:', error);
        setLoading(false);
      }
    );

    // Cleanup function để hủy lắng nghe khi component unmount
    return () => unsubscribe();
  }, []);

  // Hàm để đặt gói
  const placeOrder = async (service) => {
    if (!user) {
      Alert.alert("Bạn cần đăng nhập để đặt gói!");
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        nameUser: user.name,
        nameService: service.name,
        priceService: service.price,
        isPrime: false,
      });

      Alert.alert("Đặt gói thành công!");
    } catch (error) {
      console.error("Lỗi khi đặt gói:", error);
      Alert.alert("Lỗi khi đặt gói, vui lòng thử lại sau!");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.itemText}>Tên dịch vụ: {item.name}</Text>
              <Text style={styles.itemText}>Giá: {item.price}</Text>
            </View>

            <View>
              <TouchableOpacity style={{ padding: 5 }} onPress={() => placeOrder(item)}>
                <Text>Đặt gói</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  item: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
