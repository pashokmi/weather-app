import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {CityData} from "../utils/type";
import {User} from "../utils/firebaseApp";


interface CitiesState {
    cities: CityData[];
    user: User;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;

}

const API_KEY = 'c12a35b27197c5768b331f06b28615cb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
// const API_KEY = process.env.REACT_APP_API_KEY;
// const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log(API_KEY)

export const fetchWeather = createAsyncThunk(
    'userData/fetchWeather',
    async (city: string) => {
        const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        return response.data as CityData;
    }
);

const initialState: CitiesState = {
    cities: [],
    user: {
        uid: '',
        displayName: ''
    },
    status: 'idle',
    error: null
};

const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        addCity(state, action: PayloadAction<CityData>) {
            state.cities.push(action.payload);
        },
        removeCity(state, action: PayloadAction<string>) {
            state.cities = state.cities.filter(city => city.name !== action.payload);
        },

        addUser(state: CitiesState, action: PayloadAction<User>) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Something went wrong';
        });
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            const existingCityIndex = state.cities.findIndex(city => city.name === action.payload.name);
            if (existingCityIndex !== -1) {
                state.cities[existingCityIndex] = action.payload;
            } else {
                state.cities.push(action.payload);
            }
            state.status = 'succeeded';
        });
        builder.addCase(removeCity, (state, action) => {
            state.cities = state.cities.filter(city => city.name !== action.payload);
            if (state.cities.length === 0) {
                state.status = 'idle';
            }
        });

    },
});

export const {addCity, removeCity, addUser} = userDataSlice.actions;
export default userDataSlice.reducer;