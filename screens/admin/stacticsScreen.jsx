// StacticsScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const StacticsScreen = () => {
    const [mainTotal, setMainTotal] = useState(0);
    const [tempTotal, setTempTotal] = useState(0);
    const db = getFirestore();

    useEffect(() => {
        const fetchData = async () => {
            let mainSum = 0;
            let tempSum = 0;
            const querySnapshot = await getDocs(collection(db, "orders"));
            querySnapshot.forEach((doc) => {
                const { priceService, isPrime } = doc.data();
                if (isPrime) {
                    mainSum += parseInt(priceService);
                } else {
                    tempSum += parseInt(priceService);
                }
            });
            setMainTotal(mainSum);
            setTempTotal(tempSum);
        };
        
        fetchData();
    }, []);

    //console.log(mainTotal)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thống kê</Text>
            <Text style={styles.stat}>Đã nhận: {mainTotal} vnd</Text>
            <Text style={styles.stat}>Tạm tính: {tempTotal} vnd</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stat: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default StacticsScreen;
