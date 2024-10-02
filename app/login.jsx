import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Input from '../components/Input'
const Login = () => {
  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <Input />
        </View>
    </ScreenWrapper>
    
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})