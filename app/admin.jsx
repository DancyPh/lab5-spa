import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import OrderScreen from '../screens/orderScreen'
import HistoryScreen from '../screens/historyScreen'
import AddItemScreen from '../screens/addItemScreen'


const Tab = createBottomTabNavigator();

const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Order" component={OrderScreen}/>
      <Tab.Screen name="Add" component={AddItemScreen}/>
      <Tab.Screen name= "History" component={HistoryScreen}/>
    </Tab.Navigator>
  )
}

export default Admin

const styles = StyleSheet.create({})