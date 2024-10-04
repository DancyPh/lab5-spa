import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Đảm bảo đường dẫn đúng đến AuthProvider

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Lấy thông tin user từ context

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('nameUser', '==', user.name));

    // Lắng nghe thay đổi trong collection orders của user hiện tại
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
        setLoading(false);
      },
      (error) => {
        console.error('Lỗi khi lấy đơn hàng:', error);
        setLoading(false);
      }
    );

    // Cleanup function khi component unmount
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>Dịch vụ: {item.nameService}</Text>
            <Text style={styles.itemText}>Giá: {item.priceService}</Text>
            <Text style={styles.itemText}>
              Trạng thái: {item.isPrime ? 'Hoàn thành' : 'Đang xử lý'}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrdersScreen;

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
    borderColor: 'green',
    borderWidth: 1,
    flexDirection: 'column',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
