import s from "../Utils/getRelativeSize";
import colors from "../Utils/colors";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {Alert, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import {ResizeMode, Video} from "expo-av";
import {useEffect, useRef, useState} from "react";
import Back from "../svg/back";
import * as NavigationBar from "expo-navigation-bar";
import VideoPlayer from "expo-video-player";
import PlayerControls from "../components/PlayerControls";
import fetcher from "../Utils/fetcher";


const SCREEN_WIDTH = Dimensions.get("screen").width
const SCREEN_HEIGHT = Dimensions.get("screen").height
export default function Player({navigation, route}) {

    const episodeId = route.params.episodeId

    const [status, setStatus] = useState({})
    const [visibility, setVisibility] = useState(false)
    const [inFullscreen, setInFullscreen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hideRequest, setHideRequest] = useState(new Date())
    const videoRef = useRef();

    useEffect(() => {
        let interval;
        setHidden(false)
        if (hidden) {
            clearTimeout(interval)
        } else {
            interval = setTimeout(() => {
                setHidden(true)
            }, 3000)
        }
        if (playbackInstanceInfo.state === "Playing") {
            setHidden(false)
        }
        console.log(hideRequest)
        return () => {

        };
    }, [hideRequest]);

    useEffect(() => {
        if (playbackInstance.current) {
            playbackInstance.current.setStatusAsync({
                shouldPlay: false
            })
        }
        getEpisodeVideo()
    }, [])

    const playbackInstance = useRef(null)
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering',
    });

    const getEpisodeVideo = () => {
        fetcher(`/api/movie/episode/${episodeId}/video`)
            .then((data) => {
                console.log(`/api/movie/episode/${episodeId}/video`, data)
                if (data.status === 400) {
                    if (data.payload.text === "Таны эрх хүрэлцэхгүй байна!"){
                        Alert.alert(
                            `Error ${data.status}`,
                            `${data.payload.text}`,
                            [{text: "За", onPress: () => navigation.goBack()}]);
                    }
                    if (data.payload.text === "not_found_episode"){
                        Alert.alert(
                            `Error ${data.status}`,
                            `Not available to watch yet`,
                            [{text: "За", onPress: () => navigation.goBack()}]);
                    }
                }
                if (data.status === 200)
                    alert("Yes!")
            })
    }

    const togglePlay = async () => {
        // console.log("PRESSED")

        const shouldPlay = playbackInstanceInfo.state !== 'Playback';

        if (playbackInstance.current !== null) {
            await playbackInstance.current.setStatusAsync({
                shouldPlay,
                ...(playbackInstanceInfo.state === 'Ended' && {positionMillis: 0}),
            })
            setPlaybackInstanceInfo({
                ...playbackInstanceInfo,
                state: playbackInstanceInfo.state === 'Playing' ? 'Paused' : 'Playing'
            })
            if (playbackInstanceInfo.state === 'Playing') {
                playbackInstance.current.setStatusAsync({
                    shouldPlay: false
                })
            }
        }
    }
    const updatePlaybackCallback = (status) => {
        // console.log(status, 'status');
        if (status.isLoaded) {
            setPlaybackInstanceInfo({
                ...playbackInstanceInfo,
                position: status.positionMillis,
                duration: status.durationMillis,
                state: status.didJustFinish ? 'Ended' :
                    status.isBuffering ? 'Buffering' :
                        status.shouldPlay ? 'Playing' : 'Paused'
            })
        } else {
            if (status.isLoaded === false && status.error) {
                const errorMsg = `Encountered a fatal error during playback ${status.error}`;
            }
        }
    }

    return (
        <View
            style={{
                flexDirection: "column",
                position: "relative",
                backgroundColor: "#000"
            }}
        >
            <StatusBar animated={true} hidden={true}/>
            <Video
                style={{
                    width: "100%",
                    height: "100%",
                }}
                isMuted={false}
                isLooping={false}
                useNativeControls={false}
                resizeMode="contain"
                onPlaybackStatusUpdate={updatePlaybackCallback}
                ref={playbackInstance}
                posterSource={"https://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80.png"}
                source={{
                    uri: "https://www.mnfansubs.net/resource/mnfansubs/video/2022/09/10/tlhziem0bvuas2lp/MNF_Mortal_Kombat_Legends_-_Movie01_Scorpions_Revenge_BD480p83699760.mp4"
                }}
            />

            <View onTouchEnd={e => {
                if (hidden) {
                    e.preventDefault();
                }
                setHideRequest(new Date())
            }} style={[styles.controlsContainer, hidden ? {opacity: 0} : {opacity: 1}]}>
                <View pointerEvents={hidden ? "none" : "auto"}>
                    <PlayerControls
                        state={playbackInstanceInfo.state}
                        playbackInstance={playbackInstance.current}
                        playbackInstanceInfo={playbackInstanceInfo}
                        setPlaybackInstanceInfo={setPlaybackInstanceInfo}
                        togglePlay={togglePlay}
                    />
                </View>
            </View>

            {/*
            <VideoPlayer
                videoProps={{
                    source:
                        {
                            uri: "https://www.mnfansubs.net/resource/mnfansubs/video/2020/12/01/ao9muj8l4hd04w2k/One_Piece_-_001_new.mp4"
                        },
                    resizeMode: ResizeMode.CONTAIN,
                    shouldPlay: true,
                    ref:videoRef,
                }}
                style={{height: SCREEN_HEIGHT - 80, width: SCREEN_WIDTH}}
                fullscreen={{
                    enterFullscreen: async ()=>{
                        setInFullscreen(!inFullscreen);
                        videoRef.current.setStatusAsync({
                            shouldPlay: true
                        })
                    },
                    exitFullscreen: ()=>{
                        setInFullscreen(!inFullscreen);
                        videoRef.current.setStatusAsync({
                            shouldPlay: false
                        })
                    },
                    inFullscreen,
                }}
                errorCallback={() => {
                }}
                playbackCallback={() => {
                }}
                defaultControlsVisible={false}
                timeVisible={true}
                header={
                    <Text
                        style={{color: '#FFF', width: SCREEN_WIDTH, textAlign: "center", fontSize: 18}}
                    >
                        Custom title
                    </Text>
                }
            />
            */}
        </View>
    )
}

const styles = StyleSheet.create({
    controlsContainer: {
        position: 'absolute',
        bottom: 0,
        height: "100%"
    }
})
