import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {colors} from '../utils/index'

const {PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR} = colors;

export default function WeatherInfo({currentWeather}) {
    const {
        main: {temp},
        weather: [details],
        name,
    } = currentWeather

    const {icon, main, description} = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`


    return (
        <View style={styles.WeatherInfo}>
            <Text>{name}</Text>
            <Image style={styles.weatherIcon} source={iconUrl} />
            <Text style={styles.weather_color}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    WeatherInfo: {
        alignItems: 'center'
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weather_color: {
        fontSize: 40,
        fontWeight: 600,
        color: PRIMARY_COLOR,
    }
})
