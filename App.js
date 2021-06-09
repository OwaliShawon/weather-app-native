import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const api_key = '58fa72b424e6c8a30df9f61094b8f84f';
  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, seUnitsSystem] = useState('metric');

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

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${api_key}`;
      // const response = await fetch(weatherUrl)
      // const result = await response.json();
      // if (response.ok) {
      //   setCurrentWeather(result)
      // } else {
      //   setErrorMessage(result.message);
      // }

      fetch(weatherUrl)
        .then(response => response.json())
        .then(data => setCurrentWeather(data))
      // .then(error => setErrorMessage(error))

    } catch (error) {

    }
  }

  console.log('OK')

  if (currentWeather) {
    const { main: { temp } } = currentWeather
    console.log(temp)
    return (
      <View style={styles.container}>
        <Text>CurrentWeather: {temp} Degree Celcius</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
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
