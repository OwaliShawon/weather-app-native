import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function WeatherInfo({currentWeather}) {
    const {
        main: {temp},
        weather: [details],
    } = currentWeather

    const {icon} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    console.log(currentWeather)
    console.log(iconUrl)

    return (
        <View style={styles.WeatherInfo}>
            <Image style={styles.weatherIcon} source={iconUrl} />
            <Text>{temp}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherInfo: {
        alignItems: 'center'
    },
    weatherIcon: {
        width: 100,
        height: 100,
    }
})
