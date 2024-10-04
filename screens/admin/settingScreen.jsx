import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Điều hướng trở lại trang đăng nhập
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <Button title="Quay lại Đăng nhập" onPress={handleLogout} />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9', 
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
