import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';  // Thư viện icon

const OrderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const ordersCollection = collection(db, 'orders')

        const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
            const ordersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrders(ordersList);
            setLoading(false);
        }, (e) => {
            console.error('lỗi khi lấy order: ', e)
            setLoading(false)
        });
        // const fetchOrders = async () => {
        //     try {
        //         const ordersCollection = collection(db, 'orders');
        //         const ordersSnapshot = await getDocs(ordersCollection);
        //         const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        //         setOrders(ordersList);
        //     } catch (error) {
        //         console.log('Lỗi khi lấy dữ liệu đơn hàng:', error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };

        // fetchOrders();

        return () => unsubscribe();
    }, []);

    // Hàm để cập nhật isPrime trong Firebase
    const confirmOrder = async (id) => {
        try {
            const orderRef = doc(db, 'orders', id);
            await updateDoc(orderRef, { isPrime: true });
            
            // Cập nhật lại danh sách đơn hàng sau khi cập nhật Firestore
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === id ? { ...order, isPrime: true } : order
                )
            );
        } catch (error) {
            console.log('Lỗi khi cập nhật đơn hàng:', error);
        }
    };

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
                        <View style={styles.itemDetails}>
                            <Text>Tên dịch vụ: {item.nameService}</Text>
                            <Text>Giá: {item.priceService}</Text>
                            <Text>Khách hàng: {item.nameUser}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.itemCheck}
                            onPress={() => {
                                if (!item.isPrime) {
                                    confirmOrder(item.id);
                                }
                            }}
                        >
                            {/* Hiển thị icon nếu đơn hàng đã được xác nhận */}
                            {item.isPrime ? (
                                <Icon name="check-circle" size={30} color="green" />
                            ) : (
                                <View style={{padding: 8, backgroundColor: 'green', borderRadius: 30}}>
                                    <Text style={{color: 'white'}}>Xác nhận</Text>
                                </View>
                            )}
                        </TouchableOpacity>
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
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 30,
        marginTop: 10,
        marginHorizontal: 20,
        borderColor: 'green',
        borderWidth: 2
    },
    itemDetails: {
        flex: 2, 
        marginRight: 10, 
    },
    itemCheck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
