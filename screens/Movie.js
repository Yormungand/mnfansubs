import {
    Button,
    Dimensions, FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
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
import SectionEpisodeItem from "../components/SectionEpisodeItem";

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
export default function Movie({navigation, route}) {

    const movieId = route.params.movieId;
    const [movie, setMovie] = useState(null);
    const [selSection, setSelSection] = useState(null);
    const [sections, setSections] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    const getMovie = () => {
        fetcher(`/api/movie/${movieId}`)
            .then((data) => {
                // console.log(`/api/movie/${movieId}`, data.status, data)
                if (data.status === 200) {
                    setMovie(data.payload)
                }
            })
    }

    useEffect(() => {
        getMovie();
        console.log(route.params)
        return () => {

        };
    }, []);

    useEffect(() => {
        if (movie) {
            if (movie.sections && movie.sections.length > 0) {
                movie.sections.map((item, index) => {
                    if (item.status !== "sodon.admin.common.status.DISABLED" &&
                        item.status !== "sodon.admin.common.status.DELETED") {
                        if (index === 0) {
                            setSelSection(item.id);
                        }
                    }
                })
            } else {
                setSelSection(null)
            }
        }
    }, [movie]);

    useEffect(() => {
        if (movie) {
            if (selSection !== null) {
                fetcher(`/api/movie/episode/list?sectionId=${selSection}`)
                    .then((data) => {
                        if (data.status === 200)
                            setEpisodes(data.payload)
                    })
            } else {
                fetcher(`/api/movie/episode/list?movieId=${movie.id}`)
                    .then((data) => {
                        if (data.status === 200)
                            setEpisodes(data.payload)
                    })
            }
        }
    }, [movie, selSection])
    useEffect(() => {

    }, [episodes])

    const renderEpisode = ({item}) => <SectionEpisodeItem item={item}/>

    return (
        <>
            {
                movie !== null &&
                <FlatList
                    data={[0]}
                    renderItem={()=>(
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
                                    style={{
                                        position: "absolute",
                                        width: "100%",
                                        height: "100%",
                                        zIndex: 3
                                    }}/>
                                <Image
                                    source={{uri: `${urls}/resource/${movie.image.path.replace(/ /g, '%20')}`}}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        width: SCREEN_WIDTH,
                                        height: SCREEN_HEIGHT / 2,
                                        resizeMode: 'contain',
                                        zIndex: 1,
                                    }}
                                />
                            </SafeAreaView>
                            <View style={{marginTop: 10, paddingHorizontal: 10}}>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 26,
                                    fontWeight: "bold"
                                }}>
                                    {movie.name}
                                </Text>
                                <Text
                                    numberOfLines={8}
                                    style={{
                                        marginVertical: 10,
                                        color: colors.white,
                                        fontSize: 12,
                                        fontWeight: "500",
                                        lineHeight: 16
                                    }}>
                                    {movie.description}
                                </Text>
                            </View>
                            <View style={{paddingHorizontal: 10}}>
                                <View>
                                    {
                                        movie.sections && movie.sections.length > 0 &&
                                        <PickerField
                                            value={selSection}
                                            label={"Section"}
                                            options={movie.sections}
                                            onChange={(value) => setSelSection(value)}
                                        />
                                    }
                                </View>
                                {
                                    episodes.length > 0 &&
                                    <View style={{marginTop: 20}}>
                                        <FlatList
                                            listKey={`movieEpisodes-${movie.id}`}
                                            data={episodes.reverse()}
                                            renderItem={renderEpisode}
                                        />
                                    </View>
                                }
                            </View>
                        </>
                    )}/>
            }
        </>
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

const Styles = StyleSheet.create({
    button: {
        borderRadius: 3,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "100%",
    },
})
