import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c12a35b27197c5768b331f06b28615cb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

interface WeatherState {
    cities: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    cities: [],
    status: 'idle',
    error: null
};
// @ts-ignore
export const removeCity = createAction<{ cityName: string }>('weather/removeCity', (payload) => {
    return {
        payload: payload
    }
});

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    console.log(response.data)
    return response.data;
});
const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        removeCity(state, action) {
            const { cityName } = action.payload;
            state.cities = state.cities.filter(city => city.name !== cityName);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.cities.push(action.payload);
        });
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        });
    }
});


export default weatherSlice.reducer;
