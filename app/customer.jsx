// CustomerScreen.jsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ServicesScreen from '../screens/customer/servicesScreen'
import OrdersScreen from '../screens/customer/ordersScreen'
import ScreenWrapper from '@/components/ScreenWrapper';
import { Ionicons } from 'react-native-vector-icons'; 

const Tab = createBottomTabNavigator();

const Customer = () => {
    const { user } = useAuth(); // Lấy thông tin người dùng
    const navigation = useNavigation();

    return (
      <ScreenWrapper>
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Xin chào, {user?.name || user?.username}</Text> 
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => navigation.replace('Login')}
                >
                <Ionicons name='power' style={{fontSize: 24, color: 'red'}}/>
              </TouchableOpacity>
              
            </View>
            <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen 
                    name="Services" component={ServicesScreen} 
                    options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" color={color} size={size} />
                      ),
                    }} 
                />
                <Tab.Screen 
                  name="Orders" component={OrdersScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" color={color} size={size} />
                      ),
                    }} 
                />
            </Tab.Navigator>
            {/* <Button title='Dang xuat' onPress={() => navigation.replace('Login')}/> */}
        </View>
      </ScreenWrapper>
    );
};

export default Customer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      backgroundColor: '#33FF66',
      paddingVertical: 16,
      marginBottom: 5
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: 'center'
    },
    headerIcon: {
      marginRight: 10
    }
});
