import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const HistoryScreen = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const servicesCollection = collection(db, 'services');

        // Sử dụng onSnapshot để lắng nghe thay đổi trong collection
        const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
            const servicesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(servicesList);
            setLoading(false);
        }, (error) => {
            console.error('Lỗi khi lấy dịch vụ:', error);
            setLoading(false);
        });

        // Cleanup function để hủy lắng nghe khi component unmount
        return () => unsubscribe();
    }, []);

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
                        <Text style={styles.itemText}>Tên dịch vụ: {item.name}</Text>
                        <Text style={styles.itemText}>Giá: {item.price}</Text>
                        <Text style={styles.itemText}>Thời gian tạo: {item.createAt?.toDate().toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffff', // Thêm màu nền trắng cho container
    },
    item: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: 'green',
        borderWidth: 1, // Thêm borderWidth để hiện thị viền
        borderRadius: 30
    },
    itemText: {
        fontSize: 16, // Thay đổi kích thước chữ
        color: '#333', // Thay đổi màu chữ
    },
});
