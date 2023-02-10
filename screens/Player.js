import s from "../Utils/getRelativeSize";
import colors from "../Utils/colors";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {
    Alert,
    Dimensions, FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import {ResizeMode, Video} from "expo-av";
import {useEffect, useRef, useState} from "react";
import Back from "../svg/back";
import * as NavigationBar from "expo-navigation-bar";
import VideoPlayer from "expo-video-player";
import PlayerControls from "../components/PlayerControls";
import fetcher from "../Utils/fetcher";
import {urls} from "../Utils/urls";
import PlayerEpisodeItem from "../components/PlayerEpisodeItem";


const SCREEN_WIDTH = Dimensions.get("screen").width
const SCREEN_HEIGHT = Dimensions.get("screen").height

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
export default function Player({navigation, route}) {

    // const episodeId = route.params.episodeId
    const episodeId = route.params.episodeId
    const [status, setStatus] = useState({})
    const [visibility, setVisibility] = useState(false)
    const [inFullscreen, setInFullscreen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hideRequest, setHideRequest] = useState(new Date())
    const videoRef = useRef();

    const [video480, setVideo480] = useState("");
    const [video720, setVideo720] = useState("");
    const [video1080, setVideo1080] = useState("");
    const [fetchStatus, setFetchStatus] = useState(false);
    const [posterImage, setPosterImage] = useState("");

    const [playbackState, setPlaybackState] = useState("Buffering");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [movie, setMovie] = useState(null);
    const [episode, setEpisode] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [sections, setSections] = useState([]);
    const [currSection, setCurrSection] = useState({});

    const [selEpisode, setSelEpisode] = useState(null);
    const [showEpisodes, setShowEpisodes] = useState(false);
    const [showSections, setShowSections] = useState(false);


    const playbackInstance = useRef(null)
    const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
        position: 0,
        duration: 0,
        state: 'Buffering',
    });

    useEffect(() => {
        if (playbackInstance.current) {
            playbackInstance.current.setStatusAsync({
                shouldPlay: true
            })
        }
    }, [video480, video720, video1080]);

    const fetchEpisodeData = () => {
        fetcher(`/api/movie/episode/${episodeId}`)
            .then((data) => {
                if (data.status === 200) {
                    // console.log(`/api/movie/episode/${episodeId}`, data)
                    setEpisode(data.payload)
                    setPosterImage(`${urls}/resource/${data.payload.image.name}.${data.payload.image.ext}`)
                }
            })
        fetcher(`/api/movie/episode/${episodeId}/video`)
            .then((data) => {
                if (data.status === 200) {
                    // console.log(`/api/movie/episode/${episodeId}/video`, data)
                    if (data.payload.video480)
                        setVideo480(`${urls}/resource/${data.payload.video480.name}.${data.payload.video480.ext}`)
                    if (data.payload.video720)
                        setVideo720(`${urls}/resource/${data.payload.video720.name}.${data.payload.video720.ext}`)
                    if (data.payload.video1080)
                        setVideo1080(`${urls}/resource/${data.payload.video1080.name}.${data.payload.video1080.ext}`)
                }
            })
    }

    const fetchNewEpisodeData = () => {
        fetcher(`/api/movie/${episode.movie.id}`)
            .then((data) => {
                if (data.status === 200)
                    setMovie(data.payload)
            })
    }

    const fetchSectionEpisodes = () => {
        fetcher(`/api/movie/episode/list?sectionId=${currSection.id}`)
            .then((data) => {
                if (data.status === 200) {
                    setEpisodes(data.payload)
                    setShowSections(false)
                }
            })
    }

    const fetchMovieEpisodes = () => {
        fetcher(`/api/movie/episode/list?movieId=${movie.id}`)
            .then((data) => {
                if (data.status === 200) {
                    console.log(`${urls}/api/movie/episode/list?movieId=${movie.id}`)
                    setEpisodes(data.payload)
                }
            })
    }

    const getEpisodeVideo = () => {
        fetcher(`/api/movie/episode/${episodeId}/video`)
            .then((data) => {
                // console.log(`/api/movie/episode/${episodeId}/video`, data)
                if (data.status === 400) {
                    if (data.payload.text === "Таны эрх хүрэлцэхгүй байна!") {
                        Alert.alert(
                            `Error ${data.status}`,
                            `${data.payload.text}`,
                            [{text: "За", onPress: () => navigation.goBack()}]);
                    }
                    if (data.payload.text === "not_found_episode") {
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
        setHidden(false)
    }

    const toggleHideControl = () => {
        // let inactivityTimeout = null;
        setHidden(false);
    }

    useEffect(() => {
        let timer = setTimeout(()=>{
            setHidden(true)
        }, 4000)
        return () => {
            clearTimeout(timer)
        };
    }, [hidden]);

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


    useEffect(() => {
        fetchEpisodeData();
    }, [episodeId])

    useEffect(() => {
        if (episode) {
            fetchNewEpisodeData();
            if (episode.section) {
                setCurrSection(episode.section)
            }
        }
    }, [episode]);

    useEffect(() => {
        if (movie) {
            if (movie.sections !== undefined && episode.sections !== null) {
                setSections(movie.sections);
            }
        }
        if (JSON.stringify(currSection) !== `{}`) {
            fetchSectionEpisodes();
            console.log("section episodes")
        } else if (movie) {
            fetchMovieEpisodes();
            console.log("movie episodes")
        }
    }, [movie]);

    useEffect(() => {

    }, [currSection]);


    useEffect(() => {
        if (selEpisode) {
            fetcher(`/api/movie/episode/${selEpisode}`)
                .then((data) => {
                    if (data.status === 200) {
                        setEpisode(data.payload)
                        setPosterImage(`${urls}/resource/${data.payload.image.name}.${data.payload.image.ext}`)
                    }
                })
            fetcher(`/api/movie/episode/${selEpisode}/video`)
                .then((data) => {
                    if (data.status === 200) {
                        // console.log(`/api/movie/episode/${episodeId}/video`, data)
                        setVideo480(`${urls}/resource/${data.payload.video480.name}.${data.payload.video480.ext}`)
                        setVideo720(`${urls}/resource/${data.payload.video720.name}.${data.payload.video720.ext}`)
                        setVideo1080(`${urls}/resource/${data.payload.video1080.name}.${data.payload.video1080.ext}`)
                    }
                })
            setShowEpisodes(false);
        }
    }, [selEpisode]);

    useEffect(() => {
        togglePlay().then()
    }, [showEpisodes])

    const renderEpisodeItem = ({item}) => (
        <PlayerEpisodeItem
            item={item}
            currentEpisode={episode.id}
            onPress={(value) => {
                setSelEpisode(value);
            }}
        />
    )

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
                posterSource={posterImage}
                source={{
                    uri: video480
                }}
            />

            <View onTouchEnd={(e)=>{toggleHideControl()}} style={[styles.controlsContainer, hidden ? {opacity: 0} : {opacity: 1}]}>
                <View pointerEvents={hidden ? "none" : "auto"}>
                    <PlayerControls
                        state={playbackInstanceInfo.state}
                        playbackInstance={playbackInstance.current}
                        playbackInstanceInfo={playbackInstanceInfo}
                        setPlaybackInstanceInfo={setPlaybackInstanceInfo}
                        togglePlay={togglePlay}
                        showEpisodes={() => setShowEpisodes(true)}
                        episodesLength={episodes.length}
                        // hiddenEpisodes={showEpisodes}
                    />
                </View>
            </View>
            <View style={[styles.playerSideBar, {right: showEpisodes ? 0 : "-100%"}]}>
                {
                    episodes.length > 0 &&
                    <>
                        {
                            JSON.stringify(currSection) !== `{}` &&
                            <TouchableOpacity style={styles.sectionButton} onPress={() => setShowSections(true)}>
                                <Text style={{color: "#fff"}}>{currSection.name}</Text>
                            </TouchableOpacity>
                        }
                        <FlatList
                            style={{
                                zIndex: 2,
                                overflow: "scroll"
                            }}
                            scrollEnabled
                            data={episodes.reverse()}
                            showsVerticalScrollIndicator
                            ItemSeparatorComponent={() => (
                                <View style={{paddingVertical: 3}}></View>
                            )}
                            renderItem={renderEpisodeItem}
                        />
                        <View style={{marginTop: 20, justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity style={styles.sectionHide} onPress={() => setShowEpisodes(false)}>
                                <Ionicons name={"close"} size={30} color={"#000"}/>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                {
                    sections.length > 0 &&
                    <View style={[styles.sectionsWrap, {right: showSections ? 0 : "-200%"}]}>
                        <FlatList
                            data={sections}
                            renderItem={(item) => {
                                if (item.item.status !== "sodon.admin.common.status.DISABLED") {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                paddingVertical: 10,
                                                paddingHorizontal: 5,
                                            }}
                                            onPress={()=>setCurrSection(item.item)}
                                        >
                                            <Text style={{color: "#fff"}}>{item.item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }}
                        />
                        <View style={{alignSelf: "center"}}>
                            <TouchableOpacity style={styles.sectionHide} onPress={() => setShowSections(false)}>
                                <Ionicons name={"close"} size={30} color={"#000"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    controlsContainer: {
        position: 'absolute',
        bottom: 0,
        height: "100%"
    },
    playerSideBar: {
        position: "absolute",
        top: 0,
        right: "-100%",
        bottom: 0,
        padding: 15,
        width: 300,
        height: "100%",
        backgroundColor: "rgba(0,0,0,.6)",
    },
    sectionButton: {
        borderWidth: 1,
        borderColor: "rgba(100,100,100,.5)",
        marginBottom: 20,
        padding: 10,
        backgroundColor: "rgba(100,100,100,.5)"
    },
    sectionHide: {
        borderRadius: 25,
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    sectionsWrap: {
        position: "absolute",
        top: 0,
        right: "-200%",
        zIndex: 2,
        width: 300,
        height: windowHeight,
        backgroundColor: "rgba(0,0,0,.9)",
    }
});
