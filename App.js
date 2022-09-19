import {StyleSheet, Text, View} from 'react-native';
import {RecoilRoot, useRecoilState, useSetRecoilState} from "recoil";
import {NavigationContainer, DefaultTheme, DarkTheme} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Home from "./screens/Home";
import {Provider as PaperProvider, Button, IconButton, Colors} from 'react-native-paper';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import s from "./utils/getRelativeSize";
import {useState} from "react";
import {addSheetOpenState} from "./utils/recoilAtoms";
import {Ionicons} from "@expo/vector-icons";
import Search from "./screens/Search";
import {StatusBar} from "expo-status-bar";
import Movie from "./screens/Movie";

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

export default function App() {
    return (
        <RecoilRoot>
            <NavigationContainer theme={theme}>
                <Main/>
            </NavigationContainer>
        </RecoilRoot>
    );
}

const Stack = createNativeStackNavigator();

function Main() {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#3d3d3d",
                    },
                    headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: s(16),
                    },
                    headerBackTitle: "Буцах",
                    headerTintColor: "#fff",
                    headerTitleAlign: "center"
                }}
            >
                <Stack.Screen
                    name="Tabs"
                    component={TabNavigator}
                    options={{headerShown: false}}
                >
                </Stack.Screen>

                <Stack.Screen
                    name="Movie"
                    component={Movie}
                    options={({route}) => (
                        {
                            headerTitle: route.params.name,
                        }
                    )}
                >
                </Stack.Screen>
            </Stack.Navigator>
            <StatusBar style="light"/>
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
                tabBarLabelStyle: {textTransform: "uppercase", fontSize: s(8), marginBottom: s(5), fontWeight: "bold"},
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
                    tabBarIcon: ({color, size, focused}) => <Ionicons name="home" color={focused ? "#fff" : "#666"}
                                                                      size={s(17)} style={{marginRight: s(3)}}/>,
                }}
            >

            </Tab.Screen>
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    // tabBarLabel: "Search",
                    tabBarIcon: ({color, size, focused}) => <Ionicons name="search" color={focused ? "#fff" : "#666"}
                                                                      size={s(17)} style={{marginRight: s(3)}}/>,
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
