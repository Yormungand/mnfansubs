import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableWithoutFeedback,
    Modal,
    Alert, SafeAreaView, Dimensions
} from "react-native";
import s from "../Utils/getRelativeSize";
import colors from "../Utils/colors";
import React, {useCallback, useEffect, useState} from "react";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import BottomSheet from "./BottomSheet";
import {useNavigation} from "@react-navigation/native";


const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
export default function MovieListCard({ movie }) {

    const [open, setOpen] = useState(false);
    const [closeRequested, setCloseRequested] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const {youtubeRegEx} = useState(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
    const [trailerPlaying, setTrailerPlaying] = useState(true);

    const navigation = useNavigation();

    function handleClose() {
        setOpen(false);
        setCloseRequested(false);
    }

    function youtube_parser(uri) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = uri.match(regExp);
        if (match && match[7].length == 11)
            setTrailer(match[7])
        return (match && match[7].length == 11) ? match[7] : false;
    }

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            console.log("ENDED")
            setTrailerPlaying(false);
            setModalVisible(!modalVisible)
        }
    }, [])

    useEffect(() => {
        if (trailer !== null) {
            youtube_parser(trailer)
        }
        // console.log(trailer)
    }, [trailer])

    function handlePress(action) {
        setCloseRequested(true);
    }

    return (
        <>
            <TouchableOpacity activeOpacity={.5} style={style.movieListItem} onPress={() => setOpen(true)}>
                <View style={{flex: 2}}>
                    <Image
                        source={{uri: "http://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                        style={style.listItemImage}
                    />
                </View>
                <View style={{flex: 6, marginHorizontal: 10, paddingVertical: 5}}>
                    <Text style={{marginBottom: 5, fontSize: 16, fontWeight: "500", color: "#fff"}}>
                        {movie.name}
                    </Text>
                    <View style={{flexDirection: "row", marginBottom: 3}}>
                        <Text style={{marginRight: 15, color: colors.grey["600"], fontSize:14}}>{movie.year}</Text>
                        {
                            movie.totalNumber &&
                            <Text style={{color: colors.grey["600"], fontSize:14}}>{movie.totalNumber} анги</Text>
                        }
                    </View>
                    {/*<View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 5}}>
                        <View
                            style={style.collectionTag}
                        >
                            <Text style={style.collectionTagName}>Найруулагч Хосода Маморүгийн цуглуулга</Text>
                        </View>
                    </View>*/}
                    <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 5}}>
                        {
                            movie.categories.length > 0 &&
                            movie.categories.map((cat)=>(
                                <View key={`cat-${cat.id}`} style={style.categoryTag}>
                                    <Text style={style.categoryTagName}>{cat.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>

            <BottomSheet open={open} onClose={handleClose} closeRequested={closeRequested}>
                <>
                    <View style={{flexDirection: "column", justifyContent: "flex-end", flex: 1, padding: 10, width: screenWidth}}>
                        <View style={{flex: 1, flexDirection: "row",}}>
                            <Image
                                source={{uri: "https://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                                style={{
                                    width: Platform.OS === 'ios' ? 95 : 85,
                                    height: Platform.OS === 'ios' ? 150 : 150,
                                    resizeMode: 'cover',
                                    zIndex: 1,
                                    borderRadius: 10,
                                    flex: 2
                                }}
                            />
                            <View style={{flexDirection: "column", marginLeft: 10, flex: 5}}>
                                <Text numberOfLines={2}
                                      style={{
                                          fontSize: 16,
                                          fontWeight: "bold",
                                          color: colors.grey["50"],
                                          width: "100%",
                                      }}>
                                    {movie.name}
                                </Text>
                                <View style={{
                                    flexDirection: "row", marginTop: 5
                                }}>
                                    <Text style={{color: colors.grey["600"]}}>{movie.year} он</Text>
                                    {/*<Text style={{
                                        marginLeft: s(10),
                                        color: colors.grey["600"]
                                    }}>12+</Text>*/}
                                    {
                                        movie.totalNumber &&
                                        <Text style={{
                                            marginLeft: 10,
                                            color: colors.grey["600"]
                                        }}>
                                            {movie.totalNumber} анги
                                        </Text>
                                    }
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text
                                        style={{
                                            paddingBottom: 10,
                                            color: colors.grey["300"],
                                        }}
                                        numberOfLines={Platform.OS === 'ios' ? 5 : 4}
                                    >
                                        {movie.description}
                                    </Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    {
                                        movie.categories.length > 0 &&
                                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                            {
                                                movie.categories.map((cat) => (
                                                    <View
                                                        key={`cat-${cat.id}`}
                                                        style={
                                                            {
                                                                marginRight: 5,
                                                                marginBottom: 5,
                                                                backgroundColor: "#161616",
                                                                paddingVertical: 4,
                                                                paddingHorizontal: 5,
                                                                borderRadius: 3,
                                                            }
                                                        }
                                                    >
                                                        <Text
                                                            style={{
                                                                color: "#dedede",
                                                                fontSize: 10,
                                                                lineHeight: 12
                                                            }}
                                                        >
                                                            {cat.name}
                                                        </Text>
                                                    </View>
                                                ))
                                            }
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{
                            // flex: 1,
                            flexDirection: "row",
                            marginBottom: 10,
                            marginTop: Platform.OS === 'ios' ? 20 : 20
                        }}>
                            <View>
                                <TouchableRipple
                                    style={[Styles.button]}
                                    mode="contained"
                                    onPress={() => {
                                    }}
                                    rippleColor="rgba(255, 255, 255, .42)"
                                >
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Ionicons
                                            name="play"
                                            color={colors.white}
                                            size={12}
                                            style={{marginRight: 3}}
                                        />
                                        <Text style={{color: colors.white}}>
                                            Тоглуулах
                                        </Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View>
                                <TouchableRipple style={[Styles.button, {marginLeft: 10}]}
                                                 mode="contained"
                                                 onPress={() => {
                                                     setOpen(false)
                                                     navigation.navigate("Movie", {movieId: `${movie.id}`, name: `${movie.name}`})
                                                 }}
                                                 rippleColor="rgba(255, 255, 255, .42)"
                                >
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Ionicons
                                            name="information-circle-outline"
                                            color={colors.white}
                                            size={17}
                                            style={{marginRight: 3}}
                                        />
                                        <Text style={{color: colors.white}}>
                                            Дэлгэрэнгүй
                                        </Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View>
                                <TouchableRipple style={[Styles.button, {marginLeft: 10}]}
                                                 mode="contained"
                                                 onPress={() => {
                                                     // setOpen(false)
                                                     setModalVisible(true);
                                                     setTrailer("https://youtu.be/Qx01pn9l-6g");
                                                 }}
                                                 rippleColor="rgba(255, 255, 255, .42)"
                                >
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Ionicons name="videocam" color={colors.white} size={17}
                                                  style={{marginRight: 3}}/>
                                        <Text style={{color: colors.white}}>
                                            Trailer
                                        </Text>
                                    </View>
                                </TouchableRipple>
                            </View>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        setModalVisible(!modalVisible)
                    }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={Styles.centeredView}>
                                <View style={Styles.modalView}>
                                    <SafeAreaView
                                        style={{
                                            borderRadius: 5,
                                            overflow: "hidden",
                                            width: screenWidth - 20
                                        }}>
                                        <YoutubeIframe
                                            height={220}
                                            width={"100%"}
                                            videoId={trailer}
                                            play={true}
                                            // style={{overflow: "hidden"}}
                                            onChangeState={onStateChange}
                                        />
                                    </SafeAreaView>
                                    {/*<Pressable
                                    style={[Styles.button, Styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={Styles.textStyle}>Хаах</Text>
                                </Pressable>*/}
                                </View>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}
                                    style={Styles.backdrop}
                                >
                                    <Text></Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </TouchableWithoutFeedback>
                </>
            </BottomSheet>
        </>
    )

}

const style = StyleSheet.create({
    movieListItem: {
        borderRadius: 5,
        overflow: "hidden",
        flexDirection: "row",
        height: 150,
        backgroundColor: "#161616",
    },
    listItemImage: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        zIndex: 1,
    },
    collectionTag: {
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: "#207fbc",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    collectionTagName: {
        color: "#dedede",
        fontSize: 11,
        lineHeight: 11,
    },
    categoryTag: {
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: "#484848",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    categoryTagName: {
        color: "#dedede",
        fontSize: 11,
        lineHeight: 11,
    }
})

const Styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        backgroundColor: "#1b1b1b",
        paddingVertical: 7,
        paddingHorizontal: 10,
        elevation: 2,
    },
    movieCardMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        zIndex: 3,
        margin: 20,
        backgroundColor: '#2b2b2b',
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: 'rgba(0,0,0,.2)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: screenWidth,
        height: screenHeight,
        backgroundColor: "rgba(0,0,0,0.5)",
    }
});
