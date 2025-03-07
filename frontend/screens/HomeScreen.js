import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BikeScooterApp!</Text>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}
      />
      <Button
        title="Log In"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="View Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
