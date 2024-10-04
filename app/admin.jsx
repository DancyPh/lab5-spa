import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; 
import OrderScreen from '../screens/admin/orderScreen';
import AddItemScreen from '../screens/admin/addItemScreen';
import HistoryScreen from '../screens/admin/historyScreen';
import SettingScreen from '../screens/admin/settingScreen'

const Tab = createBottomTabNavigator();

const AdminTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Order" 
                component={OrderScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Add" 
                component={AddItemScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="History" 
                component={HistoryScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="time" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Setting" 
                component={SettingScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" color={color} size={size} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
};

export default AdminTab;
