import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; 
import OrderScreen from '../screens/admin/orderScreen';
import AddItemScreen from '../screens/admin/addItemScreen';
import HistoryScreen from '../screens/admin/historyScreen';
import SettingScreen from '../screens/admin/settingScreen'
import StatisticsScreen from '../screens/admin/stacticsScreen';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AdminTab = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Order" 
                component={OrderScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" color={color} size={size} />
                    ),
                    headerRight: () => (
                        <Ionicons 
                            name="stats-chart" 
                            size={24} 
                            color="black" 
                            style={{ marginRight: 15 }}
                            onPress={() => navigation.navigate("Statistics")}
                        />
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

const AdminStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Admin" component={AdminTab} options={{ headerShown: false }} />
        <Stack.Screen name="Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
);

export default AdminStack;
