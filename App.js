import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    load();
  }, [])

  async function load() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      // alert(`Location: ${location}`)
      const { latitude, longitude } = location.coords;
      alert(`Latitude: ${latitude} \n Longitude: ${longitude}`)
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Weather App</Text>
      <StatusBar style="auto" />
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
