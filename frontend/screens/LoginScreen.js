import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { StyleSheet, TextInput, Button, Alert, View } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://192.168.100.18:5005/login', {
          email,
          password,
        });
    
        // Save the token to AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
    
        Alert.alert('Success', 'Logged in successfully!');
        // Navigate to the home screen or profile screen
        navigation.navigate('Home'); // Replace 'Home' with your desired screen
      } catch (error) {
        Alert.alert('Error', error.response?.data?.error || 'Something went wrong');
      }
    };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});
