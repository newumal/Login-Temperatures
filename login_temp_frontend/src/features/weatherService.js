import axios from "axios";

const API_URL = '/api/weather';

// save weather data to database
const saveWeatherData = async (indexNo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(`${API_URL}/${indexNo}`, null, config);

    if (response.data){
       console.log(response.data);
    }
    return response.data;
};

// get all weather data by user
const getWeatherData = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${API_URL}`, config);

    if (response.data){
        console.log(response.data);
    }
    return response.data;
}

const weatherService = {
    saveWeatherData,
    getWeatherData
};

export default weatherService;