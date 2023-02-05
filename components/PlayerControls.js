import {ActivityIndicator, Pressable, View, StyleSheet, Dimensions, Text} from "react-native";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
// import Slider from 'react-native-slider'

const SCREEN_WIDTH = Dimensions.get("screen").width
const SCREEN_HEIGHT = Dimensions.get("screen").height
export default function VideoControls ({state, togglePlay, playbackInstanceInfo, setPlaybackInstanceInfo, playbackInstance, isHidden}) {

    const navigation = useNavigation()
    function renderIcon() {
        if(state === 'Buffering') {
            return <ActivityIndicator size={28} color="white"/>;
        } else if(state === 'Playing') {
            return <FontAwesome name="pause" size={28} color="#fff"/>;
        } else if(state === 'Paused') {
            return <FontAwesome name="play" size={28} color="#fff"/>;
        }  else if(state === 'Ended') {
            return <MaterialIcons name="replay" size={28} color="#fff"/>;
        }
    }

    const [duration, setDuration] = useState("00:00:00");
    const [currentTime, setCurrentTime] = useState("00:00:00");



    function msToHMS( ms ) {
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        const hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        const minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;


        return(`${hours < 10 ? "0"+hours:hours}:${minutes < 10 ? "0"+minutes:minutes}:${Math.floor(seconds) < 10 ? "0"+Math.floor(seconds):Math.floor(seconds)}`)
        // alert( hours+":"+minutes+":"+seconds);
    }

    useEffect(() => {
        setDuration(msToHMS(playbackInstanceInfo.duration))
        setCurrentTime(msToHMS(playbackInstanceInfo.position))
        return () => {

        };
    }, [playbackInstanceInfo]);


//backward
    return (
        <View style={{height: "100%"}}>
            <View style={{marginBottom: "auto", paddingVertical: 15, paddingHorizontal: 20}}>
                <Pressable style={styles.iconWrapper} onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={36} color="#fff"/>
                </Pressable>
            </View>
            <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
                <Pressable style={[styles.iconWrapper]} onPress={state === 'Buffering' ? null : togglePlay}>
                    {renderIcon()}
                </Pressable>
            </View>
            <View style={[styles.container, {marginTop: "auto"}]}>
                <View tint="dark" intensity={42} style={styles.innerContainer}>
                    <Text style={{color: "#fff"}}>{currentTime}</Text>
                    <Slider
                        style={styles.slider}
                        thumbTintColor={"#fff"}
                        thumbStyle={{
                            height:17,
                            width:17,
                            borderRadius:100,
                        }}
                        minimumTrackTintColor={"red"}
                        maximumTrackTintColor={"#8E9092"}
                        value={
                            playbackInstanceInfo.duration
                                ? playbackInstanceInfo.position / playbackInstanceInfo.duration
                                : 0
                        }
                        onSlidingStart={() => {
                            if (playbackInstanceInfo.state === 'Playing') {
                                togglePlay()
                                setPlaybackInstanceInfo({ ...playbackInstanceInfo, state: 'Paused' })
                            }
                        }}
                        onSlidingComplete={async e => {
                            const position = e * playbackInstanceInfo.duration
                            if (playbackInstance) {
                                await playbackInstance.setStatusAsync({
                                    positionMillis: position,
                                    shouldPlay: true,
                                })
                            }
                            setPlaybackInstanceInfo({
                                ...playbackInstanceInfo,
                                position,
                            })
                        }}
                    />
                    <Text style={{color: "#fff"}}>{duration}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection:'row',
        paddingHorizontal:20
    },
    innerContainer: {
        flexDirection:'row',
        alignItems:'center',
        borderRadius:50,
        paddingHorizontal:20,
        paddingRight:20,
        width:'100%',
        height:60,
        marginBottom: 10,
        backgroundColor:'rgba(0, 0, 0, 0.4)',
    },
    iconWrapper: {
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        justifyContent:'center',
        alignItems:'center',
        height:60,
        width:60,
        borderRadius:50
    },
    slider: {
        flex: 1,
        marginHorizontal: 10,
    },
});


// export default VideoControls;
