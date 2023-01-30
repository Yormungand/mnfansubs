import s from "../Utils/getRelativeSize";
import colors from "../Utils/colors";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {Alert, Platform, SafeAreaView, StatusBar, Text, View} from "react-native";
import {Video} from "expo-av";
import {useEffect, useState} from "react";
import Back from "../svg/back";
import * as NavigationBar from "expo-navigation-bar";

export default function Player({navigation, route}) {

    const [status, setStatus] = useState({})

    const [visibility, setVisibility] = useState(false)
    // NavigationBar.setBackgroundColorAsync("white")
    const navbar = async () => {
        try {
            if (Platform.OS == "android") {
                const navVisibility = await NavigationBar.setVisibilityAsync("hidden");
            }
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        navbar();
    }, [])

    useEffect(() => {
        let visTimer
        if (visibility) {
            visTimer = setTimeout(() => {
                setVisibility(false)
            }, 2500)
        }
    }, [visibility])

    return (
        <View style={{
            flexDirection: "column",
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#000"
        }}>
            <StatusBar animated={true} hidden={true}/>
            <SafeAreaView style={[{
                position: "absolute",
                top: 5,
                left: 10,
                zIndex: 2,
            }, visibility ? {opacity: 1} : {opacity: 0}]}>
                <TouchableRipple style={[{marginVertical: 10, padding: 10}]}
                                 mode="contained" onPress={() => {
                    navigation.goBack()
                }}
                                 rippleColor="rgba(255, 255, 255, .42)">
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <Back/>
                        <Text style={{color: "#fff"}}>Буцах</Text>
                    </View>
                </TouchableRipple>
            </SafeAreaView>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: 0,
                right: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
            }} pointerEvents="box-none">
                <SafeAreaView style={
                    [{}, visibility ? {opacity: 1} : {opacity: 0}]
                }
                >
                    <TouchableRipple style={[{marginVertical: 10, padding: 10}]}
                                     mode="contained"
                                     rippleColor="rgba(255, 255, 255, .42)"
                                     onPress={() => {}}>
                        <Text style={{color: "#fff"}}>Pause</Text>
                    </TouchableRipple>
                </SafeAreaView>
            </View>
            <Video
                onTouchEnd={() => {
                    if (visibility)
                        setVisibility(false);
                    else
                        setVisibility(true);
                }}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                isMuted={false}
                isLooping={false}
                shouldPlay
                usePoster
                posterSource={"https://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80.png"}
                useNativeControls={false}
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(status)}
                source={{
                    uri: "https://www.mnfansubs.net/resource/mnfansubs/video/2022/09/10/tlhziem0bvuas2lp/MNF_Mortal_Kombat_Legends_-_Movie01_Scorpions_Revenge_BD480p83699760.mp4"
                }}
            />
        </View>
    )
}
