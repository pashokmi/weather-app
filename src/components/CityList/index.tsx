import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, Input, List, Spinner, Text} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {fetchWeather, removeCity} from "../../store/userDataSlice";
import {CityCard} from "../CityCard";
import {RootState} from "../../store/reducers";
import {addCityForUser, deleteCityForUser, getUserData} from "../../utils";
import toast, {Toaster} from 'react-hot-toast';
import {useAppDispatch} from "../../store";

export const CityList: React.FC = () => {
    const [newCityName, setNewCityName] = useState('');
    const dispatch = useAppDispatch();
    const cities = useSelector((state: RootState) => state.userData.cities);
    const user = useSelector((state: RootState) => state.userData.user);
    const status = useSelector((state: RootState) => state.userData.status);

    useEffect(() => {
        if (user && user.uid !== '') {
            getUserData(user.uid).then((response) => {
                response?.forEach((city) => {
                    return dispatch(fetchWeather(city.city));
                });
            });
        }
    }, [dispatch, user, user.uid]);
    useEffect(() => {}, [status]);

    const handleAddCity = () => {
        if (newCityName) {
            dispatch(fetchWeather(newCityName))
                .then((response: any) => {
                    addCityForUser(user.uid, response.payload)
                        .then(() => {
                            setNewCityName('');
                        }).catch(() => {
                        toast.error("Error in receiving weather data")

                    })
                })
                .catch(() => {
                    toast.error("Error in receiving weather data")
                });
        }
    };
    const handleDeleteCity = (name: string) => {
        deleteCityForUser(user.uid, name).then(() => {
            toast.success('City removed successfully!')
            dispatch(removeCity(name))
        }).catch(() => {
            toast.error("An error occurred while deleting")
        })

    };
    const handleUpdate = (name: string) => {
        dispatch(fetchWeather(name));
        toast.success('Weather data has been successfully updated!')

    };
    const isDisabled = newCityName.length === 0


    if (status === 'loading') {
        return (
            <Flex
                position={"fixed"}
                top={0}
                right={0}
                bottom={0}
                left={0}
                zIndex={10}
                justifyContent={"center"}
                alignItems={'center'}
                backgroundColor={'#fff'}
            >
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Flex>
        )
    }


    return (
        <Box>
            <Toaster/>
            <Box display="flex" mb={4}>
                <Input
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    placeholder="Add new city"
                    mr={2}
                />
                <Button
                    isDisabled={isDisabled}
                    onClick={handleAddCity}
                    colorScheme="teal"
                    _disabled={{opacity: "0.5", cursor: "not-allowed"}}

                >
                    Add City
                </Button>
            </Box>

            {status === 'idle' ? (
                <Text textAlign={'center'} fontSize={'x-large'}>Add your city to the weather view!</Text>

            ) : (
                <List display="grid"
                      gridAutoRows="1fr"
                      gridTemplateColumns={[
                          "repeat(1, minmax(120px, 1fr))",
                          "repeat(2, minmax(120px, 1fr))",
                          "repeat(3, minmax(120px, 1fr))",

                      ]}
                >
                    {
                        cities.map((city, index) => (
                            <CityCard
                                key={index}
                                city={city}
                                onDelete={handleDeleteCity}
                                onUpdate={handleUpdate}
                            />
                        ))}
                </List>
            )}


        </Box>
    );
};
