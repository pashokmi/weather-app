import React from 'react';
import {Box, Button, Flex, Image, ListItem, Text} from '@chakra-ui/react';
import {Link} from "react-router-dom";
import {CityData} from "../../utils/type";

export interface CityCardProps {
    city: CityData;
    onDelete: (name: string) => void;
    onUpdate: (name: string) => void;
}

export const CityCard: React.FC<CityCardProps> = ({city, onDelete, onUpdate}) => {

    let imageProps = ''
    let linkProps = ''
    if (city) {
        imageProps = `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${city.weather[0].icon}.png`
        linkProps = `/city/${city?.name.toLowerCase()}`
    }


    return (
        <ListItem>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} m={2}>
                <Link to={linkProps}>
                    <Text borderBottom="3px solid #333" fontSize={'x-large'}> Weather
                        for {city.name} , {city.sys.country}.</Text>

                    <Flex alignItems={'center'} flexWrap={'wrap'} justifyContent={'center'}>
                        <Image height={'150px'}
                               maxWidth={'150px'}
                               width={'100%'}
                               src={imageProps}
                               alt="weather image"/>
                        <Flex flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
                            <Text fontSize={'x-large'}>
                                {city.main.temp}°C
                            </Text>
                            <Text textTransform={'capitalize'}>{city.weather[0].description}</Text>
                            <Text>{city.wind.speed} m/s</Text>
                        </Flex>

                    </Flex>

                </Link>
                <Button colorScheme="teal" onClick={() => onUpdate(city.name)} m={1}>
                    Update Weather
                </Button>
                <Button colorScheme="red" onClick={() => onDelete(city.name)} m={1}>
                    Delete
                </Button>
            </Box>

        </ListItem>
    );
};
