import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import weatherService from './weatherService';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    weather: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//  save weather data
export const saveWeather = createAsyncThunk('weather/save', async (indexNo,thunkAPI) => {
    try {
        return await weatherService.saveWeatherData(indexNo, user.token);
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//  get weather data
export const getWeatherList = createAsyncThunk('weather/getData', async (thunkAPI) => {
    try {
        return await weatherService.getWeatherData(user.token);
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(saveWeather.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveWeather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.weather = action.payload;
            })
            .addCase(saveWeather.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getWeatherList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getWeatherList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.weather = action.payload;
            })
            .addCase(getWeatherList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = weatherSlice.actions;
export default weatherSlice.reducer;