import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Weather App</Text>
      <StatusBar style="auto" />
      <View style={styles.find}>
        <Text>Find Weather</Text>
      </View>


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
  find: {
    backgroundColor: 'blue'
  }
});
