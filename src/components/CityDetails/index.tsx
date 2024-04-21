import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Box, Flex, Image, Spinner, Text} from '@chakra-ui/react';
import {RootState} from "../../store/reducers";
import {fetchWeather} from "../../store/userDataSlice";
import {useAppDispatch} from "../../store";


export const CityDetails: React.FC = () => {
    const {cityName} = useParams();
    const city = useSelector((state: RootState) => state.userData.cities.find(c => c.name.toLowerCase() === cityName?.toLowerCase()));

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cityName && !city) {
            dispatch(fetchWeather(cityName));
        }
    }, [cityName, city, dispatch]);

    if (!city) {
        return <Flex justifyContent={'center'} alignItems={'center'} height={'40vh'}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            /></Flex>;
    }

    return (
        <Box>
            <Image
                maxWidth={'500px'}
                width={'100%'}
                maxHeight={'500px'}
                margin={'0 auto'}
                src={`https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${city.weather[0].icon}.png`}
                alt=""/>
            <Text fontSize="xl">
                In {city.name} , there is {city.weather[0].description}. The air temperature is {city.main.temp}°C
                with
                a real feel of {city.main.feels_like}°C. The humidity level is at {city.main.humidity}%.
                The wind speed is {city.wind.speed} m/s with gusts up to {city.wind.gust} m/s. This weather condition
                persists under
                an atmospheric pressure of {city.main.pressure} hPa.

            </Text>

        </Box>
    );
};
