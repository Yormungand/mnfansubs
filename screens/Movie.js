import {
    Button,
    Dimensions, FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity, useWindowDimensions,
    View
} from "react-native";
import s from "../Utils/getRelativeSize";
import colors from "../Utils/colors";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import fetcher from "../Utils/fetcher";
import React, {useEffect, useState} from "react";
import {urls} from "../Utils/urls";
import {Picker} from "@react-native-picker/picker";
import EpisodeItemOfMovie from "../components/EpisodeItemOfMovie";
import {SceneMap, TabView} from "react-native-tab-view";
import MovieEpisodeOfMovie from "../components/MovieEpisodeOfMovie";

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
export default function Movie({navigation, route}) {

    const movieId = route.params.movieId;
    const [movie, setMovie] = useState(null);
    const [selSection, setSelSection] = useState(null);
    const [sections, setSections] = useState([]);

    const [episodes, setEpisodes] = useState([]);
    const [ovaEpisodes, setOvaEpisodes] = useState([]);
    const [songEpisodes, setSongEpisodes] = useState([]);
    const [movieEpisodes, setMovieEpisodes] = useState([]);

    const [episodeTypes, setEpisodeTypes] = useState([]);

    const [tabState, setTabState] = useState({
        tabName: "Ангиуд",
        code: "episode"
    });

    const getMovie = (callback) => {
        fetcher(`/api/movie/${movieId}`)
            .then((data) => {
                // console.log(`/api/movie/${movieId}`, data.status, data)
                if (data.status === 200) {
                    setMovie(data.payload)
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }

    const getDefaultSection = () => {
        sections.reverse().map((item, index) => {
            if (item.status !== "sodon.admin.common.status.DISABLED" &&
                item.status !== "sodon.admin.common.status.DELETED") {
                if (index === 0) {
                    setSelSection(item.id);
                }
            }
        })
    }

    const fetchEpisodeTypes = (callback) => {
        fetcher(`/api/movie/episode/type`)
            .then((data) => {
                if (data.status === 200) {
                    setEpisodeTypes(data.payload)
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }

    const fetchOVAs = (callback) => {
        fetcher(`/api/movie/episode/list?movieId=${movie.id}&typeId=2`)
            .then((data) => {
                if (data.status === 200) {
                    setOvaEpisodes(data.payload);
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }
    const fetchMovies = (callback) => {
        fetcher(`/api/movie/episode/list?movieId=${movie.id}&typeId=3`)
            .then((data) => {
                if (data.status === 200) {
                    setMovieEpisodes(data.payload);
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }
    const fetchSongs = (callback) => {
        fetcher(`/api/movie/episode/list?movieId=${movie.id}&typeId=4`)
            .then((data) => {
                if (data.status === 200) {
                    setSongEpisodes(data.payload);
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }

    const fetchSectionEpisodes = (callback) => {
        let url;
        if (selSection !== null) {
            url = `/api/movie/episode/list?sectionId=${selSection}&typeId=1`;
        } else {
            url = `/api/movie/episode/list?movieId=${movie.id}&typeId=1`;
        }
        fetcher(url)
            .then((data) => {
                if (data.status === 200) {
                    setEpisodes(data.payload);
                }
            })
        if (callback !== undefined && typeof callback === "function")
            callback();
    }

    const checkAvailableLists = () => {
        const hasEpisodes = episodes.length > 0 ?? true
        const hasOvaEpisodes = ovaEpisodes.length > 0 ?? true
        const hasMovieEpisodes = movieEpisodes.length > 0 ?? true
        const hasSongEpisodes = songEpisodes.length > 0 ?? true
        console.log("hasEpisodes", hasEpisodes, "---", episodes.length)
        console.log("hasOvaEpisodes", hasOvaEpisodes, "---", ovaEpisodes.length)
        console.log("hasMovieEpisodes", hasMovieEpisodes, "---", movieEpisodes.length)
        console.log("hasSongEpisodes", hasSongEpisodes, "---", songEpisodes.length)
    }

    useEffect(() => {
        getMovie();
    }, []);

    useEffect(() => {
        if (movie) {
            if (movie.sections && movie.sections.length > 0) {
                setSections(movie.sections);
            } else {
                setSelSection(null);
            }
        }
    }, [movie]);

    useEffect(() => {
        if (sections.length > 0) {
            getDefaultSection();
        }
    }, [sections])

    useEffect(() => {
        if (movie) {
            fetchSectionEpisodes(() => {
                checkAvailableLists();
            });
            fetchOVAs();
            fetchMovies();
            fetchSongs(()=>{
                const hasEpisodes = episodes.length > 0 ?? true
                const hasOvaEpisodes = ovaEpisodes.length > 0 ?? true
                const hasMovieEpisodes = movieEpisodes.length > 0 ?? true
                const hasSongEpisodes = songEpisodes.length > 0 ?? true
                if (!hasEpisodes && hasOvaEpisodes) {
                    setTabState({tabName: "OVA", code: "ova"})
                }
                if (!hasOvaEpisodes && hasMovieEpisodes) {
                    setTabState({tabName: "Movie", code: "movie"})
                }
                if (!hasMovieEpisodes && hasSongEpisodes) {
                    setTabState({tabName: "SONG", code: "song"})
                }
            });
        }
    }, [movie])
    useEffect(() => {

    }, [episodes])
    useEffect(() => {
        if (selSection !== null) {
            fetchSectionEpisodes();
        }
    }, [selSection])

    const renderEpisode = ({item}) => <EpisodeItemOfMovie item={item} tabState={tabState}/>

    const renderMovie = ({item}) => <MovieEpisodeOfMovie item={item} tabState={tabState}/>;

    const renderEpisodes = () => {
        return (
            <>
                <View>
                    {
                        movie.sections && movie.sections.length > 0 &&
                        <PickerField
                            value={selSection}
                            label={"Section"}
                            options={sections}
                            onChange={(value) => setSelSection(value)}
                        />
                    }
                </View>
                <View style={{marginVertical: 20}}>
                    <FlatList
                        listKey={`movieEpisodes-${movie.id}`}
                        data={episodes}
                        renderItem={renderEpisode}
                    />
                </View>
            </>
        );
    }
    const renderOVA = () => {
        return (
            <>
                <View style={{marginVertical: 20}}>
                    <FlatList
                        listKey={`movieEpisodes-${movie.id}`}
                        data={ovaEpisodes}
                        renderItem={renderEpisode}
                    />
                </View>
            </>
        );
    }
    const renderSongs = () => {
        return (
            <>
                <View style={{marginVertical: 20}}>
                    <FlatList
                        listKey={`movieEpisodes-${movie.id}`}
                        data={songEpisodes}
                        renderItem={renderEpisode}
                    />
                </View>
            </>
        );
    }

    const renderMovies = () => {
        return (
            <>
                <View style={{marginVertical: 20}}>
                    <FlatList
                        style={{
                            marginLeft: -10
                        }}
                        listKey={`movieEpisodes-${movie.id}`}
                        data={movieEpisodes}
                        numColumns={2}
                        ItemSeparatorComponent={() => (
                            <View style={{margin: 5}}/>
                        )}
                        renderItem={renderMovie}
                    />
                </View>
            </>
        );
    }

    return (
        <>
            {
                movie !== null &&
                <FlatList
                    data={[0]}
                    renderItem={() => (
                        <>
                            <SafeAreaView
                                style={
                                    {
                                        position: "relative",
                                        height: SCREEN_HEIGHT / 2,
                                        width: SCREEN_WIDTH,
                                        overflow: "hidden",
                                    }
                                }>
                                <LinearGradient
                                    colors={["transparent", "rgba(0,0,0,0.25)"]}
                                    style={style.movieImageGradient}/>
                                <Image
                                    source={{uri: `${urls}/resource/${movie.image.path.replace(/ /g, '%20')}`}}
                                    style={style.movieImage}
                                />
                            </SafeAreaView>
                            {
                                movie.type.alias === "movie" ||
                                movie.type.alias === "animeMovie" &&
                                episodes.length === 1 ?
                                    <>
                                        <View style={{marginVertical: 10, paddingHorizontal: 10}}>
                                            <Text style={style.movieName}>
                                                {movie.name}
                                            </Text>
                                            <Text
                                                numberOfLines={8}
                                                style={style.movieDescription}>
                                                {movie.description}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                borderRadius: 5,
                                                marginHorizontal: 10,
                                                paddingVertical: 10,
                                                paddingHorizontal: 15,
                                                flexDirection: "row",
                                                flex: 1,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#fff",
                                            }}
                                            activeOpacity={.5}
                                            onPress={() => navigation.navigate("Player", {episodeId: episodes[0].id})}
                                        >
                                            <Ionicons name={"play"} size={28} color={"#161616"}/>
                                            <Text
                                                style={{
                                                    marginLeft: 10,
                                                    fontSize: 22,
                                                    fontWeight: "600",
                                                    color: "#161616"
                                                }}
                                            >
                                                Тоглуулах
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <>
                                        <View style={{marginTop: 10, paddingHorizontal: 10}}>
                                            <Text style={style.movieName}>
                                                {movie.name}
                                            </Text>
                                            <Text
                                                numberOfLines={8}
                                                style={style.movieDescription}>
                                                {movie.description}
                                            </Text>
                                            <View style={style.movieTab}>
                                                <ScrollView
                                                    style={{
                                                        position: "relative",
                                                        zIndex: 3,
                                                        bottom: 0,
                                                    }}
                                                    horizontal
                                                >

                                                    {
                                                        episodes.length > 0 &&
                                                        <TouchableOpacity
                                                            activeOpacity={.5}
                                                            onPress={() => {
                                                                setTabState({tabName: "Ангиуд", code: "episode"})
                                                            }}
                                                            style={[
                                                                style.movieTabButton,
                                                                tabState.code === "episode" && style.movieTabButtonActive
                                                            ]}>
                                                            <Text style={[
                                                                style.movieTabButtonText,
                                                                tabState.code === "episode" && style.movieTabButtonActiveText
                                                            ]}>
                                                                Ангиуд
                                                            </Text>
                                                        </TouchableOpacity>
                                                    }
                                                    {
                                                        ovaEpisodes.length > 0 &&
                                                        <TouchableOpacity
                                                            activeOpacity={.5}
                                                            onPress={() => setTabState({
                                                                tabName: "Тусгай анги",
                                                                code: "ova"
                                                            })}
                                                            style={[
                                                                style.movieTabButton,
                                                                tabState.code === "ova" && style.movieTabButtonActive
                                                            ]}>
                                                            <Text style={[
                                                                style.movieTabButtonText,
                                                                tabState.code === "ova" && style.movieTabButtonActiveText
                                                            ]}>
                                                                Тусгай анги
                                                            </Text>
                                                        </TouchableOpacity>
                                                    }
                                                    {
                                                        movieEpisodes.length > 0 &&
                                                        <TouchableOpacity
                                                            activeOpacity={.5}
                                                            onPress={() => setTabState({
                                                                tabName: "Кино",
                                                                code: "movie"
                                                            })}
                                                            style={[
                                                                style.movieTabButton,
                                                                tabState.code === "movie" && style.movieTabButtonActive
                                                            ]}>
                                                            <Text style={[
                                                                style.movieTabButtonText,
                                                                tabState.code === "movie" && style.movieTabButtonActiveText
                                                            ]}>
                                                                Кино
                                                            </Text>
                                                        </TouchableOpacity>
                                                    }
                                                    {
                                                        songEpisodes.length > 0 &&
                                                        <TouchableOpacity
                                                            activeOpacity={.5}
                                                            onPress={() => setTabState({tabName: "Дуу", code: "song"})}
                                                            style={[
                                                                style.movieTabButton,
                                                                tabState.code === "song" && style.movieTabButtonActive
                                                            ]}>
                                                            <Text style={[
                                                                style.movieTabButtonText,
                                                                tabState.code === "song" && style.movieTabButtonActiveText
                                                            ]}>
                                                                Дуу
                                                            </Text>
                                                        </TouchableOpacity>
                                                    }
                                                </ScrollView>
                                                <View style={style.movieTabLowerBorder}/>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 10}}>
                                            {
                                                tabState.code === "episode" &&
                                                renderEpisodes()
                                            }
                                            {
                                                tabState.code === "ova" &&
                                                renderOVA()
                                            }
                                            {
                                                tabState.code === "movie" &&
                                                renderMovies()
                                            }
                                        </View>
                                    </>
                            }
                        </>
                    )}/>
            }
        </>
    )
}

function SeriesView({movie, episodes, ovaEpisodes, movieEpisodes, songEpisodes, tabState, setTabState}) {
    return (
        <>
            <View style={{marginTop: 10, paddingHorizontal: 10}}>
                <Text style={style.movieName}>
                    {movie.name}
                </Text>
                <Text
                    numberOfLines={8}
                    style={style.movieDescription}>
                    {movie.description}
                </Text>
                <View style={style.movieTab}>
                    <ScrollView
                        style={{
                            position: "relative",
                            zIndex: 3,
                            bottom: 0
                        }}
                        horizontal
                    >

                        {
                            episodes.length > 0 &&
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => {
                                    setTabState({tabName: "Ангиуд", code: "episode"})
                                }}
                                style={[
                                    style.movieTabButton,
                                    tabState.code === "episode" && style.movieTabButtonActive
                                ]}>
                                <Text style={[
                                    style.movieTabButtonText,
                                    tabState.code === "episode" && style.movieTabButtonActiveText
                                ]}>
                                    Ангиуд
                                </Text>
                            </TouchableOpacity>
                        }
                        {
                            ovaEpisodes.length > 0 &&
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => setTabState({tabName: "Тусгай анги", code: "ova"})}
                                style={[
                                    style.movieTabButton,
                                    tabState.code === "ova" && style.movieTabButtonActive
                                ]}>
                                <Text style={[
                                    style.movieTabButtonText,
                                    tabState.code === "ova" && style.movieTabButtonActiveText
                                ]}>
                                    Тусгай анги
                                </Text>
                            </TouchableOpacity>
                        }
                        {
                            movieEpisodes.length > 0 &&
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => setTabState({tabName: "Кино", code: "movie"})}
                                style={[
                                    style.movieTabButton,
                                    tabState.code === "movie" && style.movieTabButtonActive
                                ]}>
                                <Text style={[
                                    style.movieTabButtonText,
                                    tabState.code === "movie" && style.movieTabButtonActiveText
                                ]}>
                                    Кино
                                </Text>
                            </TouchableOpacity>
                        }
                        {
                            songEpisodes.length > 0 &&
                            <TouchableOpacity
                                activeOpacity={.5}
                                onPress={() => setTabState({tabName: "Дуу", code: "song"})}
                                style={[
                                    style.movieTabButton,
                                    tabState.code === "song" && style.movieTabButtonActive
                                ]}>
                                <Text style={[
                                    style.movieTabButtonText,
                                    tabState.code === "song" && style.movieTabButtonActiveText
                                ]}>
                                    Дуу
                                </Text>
                            </TouchableOpacity>
                        }
                    </ScrollView>
                    <View style={style.movieTabLowerBorder}/>
                </View>
            </View>
        </>
    )
}

function MovieView() {
    return (
        <></>
    )
}

function PickerField({label, options, value, onChange}) {
    return (
        <View>
            {/*<Text>{label}</Text>*/}
            <View>
                <Picker
                    selectedValue={value}
                    dropdownIconColor={"#fff"}
                    style={{borderRadius: 10, flex: 1, backgroundColor: "#161616"}}
                    itemStyle={{color: "#fff", fontSize: 36, backgroundColor: "#161616"}}
                    onValueChange={(itemValue) => onChange(itemValue)}
                >
                    {options.map((option) => {
                        if (option.status !== "sodon.admin.common.status.DISABLED" &&
                            option.status !== "sodon.admin.common.status.DELETED")
                            return (
                                <Picker.Item
                                    color={"#fff"}
                                    style={{color: "#fff", backgroundColor: "#161616"}}
                                    key={`section_${option.id}`}
                                    label={option.name}
                                    value={option.id}
                                />
                            )
                    })}
                </Picker>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    button: {
        borderRadius: 3,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
    movieDescription: {
        marginVertical: 10,
        color: colors.white,
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 16
    },
    movieImage: {
        position: "absolute",
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
        resizeMode: 'contain',
        zIndex: 1,
    },
    movieImageGradient: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 3
    },
    movieName: {
        color: colors.white,
        fontSize: 26,
        fontWeight: "bold"
    },
    movieTab: {
        marginVertical: 10,
        minWidth: SCREEN_WIDTH,
        width: SCREEN_WIDTH
    },
    movieTabButton: {
        position: "relative",
        bottom: -1,
        zIndex: 4,
        marginRight: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    movieTabButtonText: {
        fontSize: 14,
        color: "#999",
    },
    movieTabButtonActive: {
        position: "relative",
        zIndex: 4,
        borderTopStartRadius: 3,
        borderTopEndRadius: 3,
        borderTopWidth: .5,
        borderLeftWidth: .5,
        borderRightWidth: .5,
        borderBottomWidth: 2,
        borderTopColor: "rgba(255,255,255,1)",
        borderRightColor: "rgba(255,255,255,1)",
        borderLeftColor: "rgba(255,255,255,1)",
        borderBottomColor: "#1d1d1d",
    },
    movieTabButtonActiveText: {
        color: "#fff",
    },
    movieTabLowerBorder: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 1,
        zIndex: 1,
        width: "100%",
        borderBottomWidth: .5,
        borderBottomColor: "rgba(255,255,255,.5)",
    }
})
