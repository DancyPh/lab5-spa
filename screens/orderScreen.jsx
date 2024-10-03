// OrdersScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                setOrders(ordersList);
            } catch (error) {
                console.log('Lỗi khi lấy dữ liệu đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                        <View>
                          <Text>Tên dịch vụ: {item.nameService}</Text>
                          <Text>Giá: {item.priceService}</Text>
                          <Text>Khách hàng: {item.nameUser}</Text>
                        </View>
                        <View>
                          <Text>{item.isPrime ? 'Đơn đã xác nhận' : 'Chưa xác nhận'}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  item: {
    flexDirection: 'column'
  }
})
