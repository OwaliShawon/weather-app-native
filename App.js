import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ReloadIcon from './components/ReloadIcon';
import UnitsPicker from './components/UnitsPicker';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfo from './components/WeatherInfo'


const WEATHER_API_KEY = '58fa72b424e6c8a30df9f61094b8f84f';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      // alert(`Location: ${location}`)
      const { latitude, longitude } = location.coords;
      // alert(`Latitude: ${latitude} \n Longitude: ${longitude}`)

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl)
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message);
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }


  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem}/>
      </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{margin:'auto'}}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
