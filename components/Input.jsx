import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const Input = (props) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor={'#000'}
          ref={props.inputRef && props.inputRef}
          {...props}
        />
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
      width: '80%',  // Đảm bảo container bao trọn chiều ngang
      padding: 10,
    },
    input: {
      borderWidth: 1,  // Thêm viền để dễ nhìn
      borderColor: '#000',
      padding: 10,     // Thêm padding để có khoảng trống giữa văn bản và viền
      borderRadius: 5, // Thêm bo góc cho input
      color: '#000',   // Màu chữ
    }
  });

export default Input
  