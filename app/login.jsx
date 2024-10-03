import { StyleSheet, Text, View, TextInput,Button } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = () => {
    login(username, password, navigation);
    
  }

  return (
    <ScreenWrapper>
        <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Đăng nhập" onPress={handleLogin} />
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