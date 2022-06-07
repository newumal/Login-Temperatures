const asyncHandler = require('express-async-handler');
const axios = require('axios');
require('dotenv').config();
const config = require('../config/default');
const Weather = require("../model/WeatherModel");

const cities = config.CITIES;
const part = config.PART;

const API_KEY = process.env.API_KEY;

/*
 @desc get weather details by given lat & lon
 @route POST api/weather/:index
 @access Private
 */
const saveWeather = asyncHandler(async (req, res) => {
    console.log(req);
    const data = cities[req.params.index];
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.LATITUDE}&lon=${data.LONGITUDE}&exclude=${part}&appid=${API_KEY}`);
        console.log(response.data);

        // add new weather data
        const newWeather = await Weather.create({
            user: req.user.id,
            temperature: response.data?.current?.temp ?? 300,
            city: data.CITY,
            latitude: data.LATITUDE,
            longitude: data.LONGITUDE ,
        })
        if (newWeather){
            res.status(201).json('weather data saved !')
        }else{
            res.status(400);
        }

        //res.status(200).json({ message: 'weather data saved ! '})
    } catch (error) {
        console.error(error);
    }
    //res.status(200).json(response.data);
});

const getWeatherDataByUser = asyncHandler( async (req, res) => {
    const user = req.user.id;
    console.log(user);
    try{
        const weatherData = await Weather.find({ user: user });
        res.status(200).json(weatherData);
    }catch (e) {
        res.status(401);
    }
});

module.exports = {
    saveWeather,
    getWeatherDataByUser,
}