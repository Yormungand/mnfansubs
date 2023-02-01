import {StyleSheet, Text, View} from 'react-native';
import {RecoilRoot, useRecoilState, useSetRecoilState} from "recoil";
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Home from "./screens/Home";
import {Provider as PaperProvider, Button, IconButton, Colors} from 'react-native-paper';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import s from "./Utils/getRelativeSize";
import React, {useCallback, useEffect, useState} from "react";
import {addSheetOpenState} from "./Utils/recoilAtoms";
import {Entypo, Ionicons} from "@expo/vector-icons";
import Search from "./screens/Search";
import {StatusBar} from "expo-status-bar";
import Movie from "./screens/Movie";
import Player from "./screens/Player";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import {useGlobalState} from "./hooks/useGlobalState";
import Login from "./screens/Login";
import ClientHome from "./screens/client/ClientHome";
import ClientProfile from "./screens/client/ClientProfile";
import ClientProfileEdit from "./screens/client/ClientProfileEdit";
import ClientProfilePassword from "./screens/client/ClientProfilePassword";

const theme = {
    roundness: 2,
    dark: true,
    colors: {
        primary: '#fff',
        background: "#1d1d1d",
        text: "#fff",
        card: "#999",
        roundness: 10
    },
};
//
export default function App() {
    // const visibility = NavigationBar.useVisibility();
    return (
        <RecoilRoot>
            <NavigationContainer theme={theme}>
                <UserProvider>
                    <Main/>
                </UserProvider>
            </NavigationContainer>
        </RecoilRoot>
    );
}

function UserProvider({children}) {
    const [user] = useGlobalState("currentUser")
    if (!user) return <Login/>
    return children;
}

const Stack = createNativeStackNavigator();

function Main() {
    return (
        <>
            <StatusBar style="light"/>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#3d3d3d",
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: 16,
                    },
                    headerBackTitle: "Буцах",
                    headerTintColor: "#fff",
                    headerTitleAlign: "center"
                }}>
                <Stack.Screen
                    name="Tabs"
                    component={TabNavigator}
                    options={{headerShown: false}}>
                </Stack.Screen>
                <Stack.Screen
                    name="Movie"
                    component={Movie}
                    options={({route}) => (
                        {
                            headerTitle: route.params.name,
                        }
                    )}>
                </Stack.Screen>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="Player"
                    component={Player}
                    options={{
                        headerShown: false,
                        orientation: "landscape"
                    }}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="ClientProfile"
                    component={ClientProfile}
                    options={()=>(
                        {
                            headerTitle: "Миний профайл"
                        }
                    )}
                >
                </Stack.Screen>
                <Stack.Screen
                    name="ClientProfileEdit"
                    component={ClientProfileEdit}
                    options={()=>(
                        {
                            headerTitle: "Миний профайл edit"
                        }
                    )}
                >
                </Stack.Screen>
                <Stack.Screen
                    name={"ClientProfilePassword"}
                    component={ClientProfilePassword}
                >
                </Stack.Screen>
            </Stack.Navigator>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Tab = createBottomTabNavigator();

function TabNavigator() {
    const setAddSheetOpen = useSetRecoilState(addSheetOpenState)

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerStyle: {
                    backgroundColor: "#0e0e0e",
                },
                headerTintColor: "#e9e9e9",
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#666",
                tabBarLabelStyle: {textTransform: "uppercase", fontSize: 8, marginBottom: 5, fontWeight: "bold"},
                tabBarShowLabel: true,
                tabBarActiveBackgroundColor: "#1d1d1d",
                tabBarInactiveBackgroundColor: "#181818",
                sceneContainerStyle: {
                    backgroundColor: "#1d1d1d"
                },
                unmountOnBlur: true,
                headerTitleAlign: "center",
            }}
            shifting={true}
        >
            <Tab.Screen
                name="MNFansubs"
                title="Home"
                component={Home}
                options={{
                    // tabBarLabel: "Home",
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name="home"
                            color={focused ? "#fff" : "#666"}
                            size={17}
                            style={{marginRight: 3}}/>
                    ),
                }}
            >

            </Tab.Screen>
            <Tab.Screen
                name="Хайх"
                component={Search}
                options={{
                    // person-circle-outline
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name="search"
                            color={focused ? "#fff" : "#666"}
                            size={17}
                            style={{marginRight: 3}}/>
                    ),
                }}
            >
            </Tab.Screen>
            <Tab.Screen
                component={ClientHome}
                name="Профайл"
                options={{
                    largeTitle: "Профайл",
                    tabBarLabel: 'Профайл',
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name="person-circle-outline"
                            color={focused ? "#fff" : "#666"}
                            size={17}
                            style={{marginRight: 3}}/>
                    ),
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}

function AddSheet() {
    const [addSheetOpen, setAddSheetOpen] = useRecoilState(addSheetOpenState);
    const [closeRequested, setCloseRequested] = useState(false);
}
