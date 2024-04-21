import React from 'react';
import {Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Text} from "@chakra-ui/react";
import {User} from "../../utils/firebaseApp";
import {NavLink, Route, Routes} from 'react-router-dom';
import {CityList} from "../CityList";
import {CityDetails} from "../CityDetails";


interface Props {
    user: User | null;
    handleLogout: () => void;
}

const Home: React.FC<Props> = ({user, handleLogout}) => {


    return (
        <Box>

            <Box p={4}>
                <Flex mb={2} justifyContent={'space-between'} alignItems={'center'}>
                    <Breadcrumb backgroundImage="linear-gradient(to bottom, #007bff, #00bfff)" p={'5px'}
                                borderRadius={'5px'}>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={NavLink} to="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Flex>
                        <Text>{user?.displayName}</Text>
                    </Flex>
                    <Button onClick={handleLogout}>Log Out</Button>
                </Flex>
                <Box>
                    <Routes>
                        <Route path="/" element={<CityList/>}/>
                        <Route path="/city/:cityName" element={<CityDetails/>}/>
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
