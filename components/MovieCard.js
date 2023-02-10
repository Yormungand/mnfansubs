import {
    Image,
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Platform,
    Modal,
    Alert,
    Pressable,
    TouchableOpacity, TouchableWithoutFeedback, Dimensions
} from "react-native";
import {TouchableRipple} from "react-native-paper";
import {useCallback, useEffect, useState} from "react";
import BottomSheet from "./BottomSheet";
import {Ionicons} from "@expo/vector-icons";
import colors from "../Utils/colors";
import YoutubeIframe from "react-native-youtube-iframe";
import {urls} from "../Utils/urls";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function MovieCard({navigation, item, style,}) {
    const [open, setOpen] = useState(false);
    const [closeRequested, setCloseRequested] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const {youtubeRegEx} = useState(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
    const [trailerPlaying, setTrailerPlaying] = useState(true);

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
            setModalVisible(!modalVisible);
        }
    }, [])

    useEffect(() => {
        if (trailer !== null) {
            youtube_parser(trailer)
        }
        // console.log(trailer)
    }, [trailer]);

    useEffect(() => {
        if (item.trailer) {
            setTrailer(item.trailer)
        }
    }, [item]);



    function handlePress(action) {
        setCloseRequested(true);
    }

    return (
        <>
            <View key={`movie-${item.id}`} style={[{marginRight: 10}, {style}]}>
                <View style={{position: 'relative', flex: 1, borderRadius: 10, overflow: "hidden"}} rippleColor='rgba(255,255,255,.5)'>
                    <View>
                        {
                            item.image &&
                            <Image
                                source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}_s.${item.image.ext}`}}
                                style={styles.movieCardImage}
                            />
                        }
                        {/*<View style={{position: 'absolute', paddingHorizontal: s(5), bottom: s(3), zIndex: 5}} pointerEvents='none'>*/}
                        {/*    <Text style={{color: '#fff', fontSize: 13}}>Mortal kombat, one piece: {item}-р анги</Text>*/}
                        {/*</View>*/}
                    </View>
                    <TouchableRipple style={styles.movieCardMask}
                                     onPress={() => setOpen(true)}
                                     rippleColor="rgba(255, 255, 255, .42)">
                        <></>
                    </TouchableRipple>
                </View>
            </View>

            <BottomSheet open={open} onClose={handleClose} closeRequested={closeRequested}>
                <>
                    <View style={{flexDirection: "column", justifyContent: "flex-end", flex: 1, padding: 10, width: windowWidth}}>
                        <View onTouchEnd={e=>navigation.navigate("Movie", {movieId: `${item.id}`, name: `${item.name}`})} style={{flex: 1, flexDirection: "row",}}>
                            <Image
                                source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}.${item.image.ext}`}}
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
                                    {item.name}
                                </Text>
                                <View style={{
                                    flexDirection: "row", marginTop: 5
                                }}>
                                    <Text style={{color: colors.grey["600"]}}>{item.year} он</Text>
                                    {/*<Text style={{
                                        marginLeft: s(10),
                                        color: colors.grey["600"]
                                    }}>12+</Text>*/}
                                    {
                                        item.totalNumber &&
                                        <Text style={{
                                            marginLeft: 10,
                                            color: colors.grey["600"]
                                        }}>
                                            {item.totalNumber} анги
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
                                        {item.description}
                                    </Text>
                                </View>
                                <View style={{marginBottom: 10}}>
                                    {
                                        item.categories.length > 0 &&
                                        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                                            {
                                                item.categories.map((cat) => (
                                                    <View
                                                        key={`cat-${cat.id}`}
                                                        style={styles.categoryBadge}
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
                            marginBottom: 15,
                            marginTop: Platform.OS === 'ios' ? 20 : 20
                        }}>
                            <View>
                                <TouchableRipple
                                    style={[styles.button]}
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
                                <TouchableRipple style={[styles.button, {marginLeft: 10}]}
                                                 mode="contained"
                                                 onPress={() => {
                                                     setOpen(false)
                                                     navigation.navigate("Movie", {movieId: `${item.id}`, name: `${item.name}`})
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
                            {
                                trailer &&
                                <View>
                                    <TouchableRipple style={[styles.button, {marginLeft: 10}]}
                                                     mode="contained"
                                                     onPress={() => {
                                                         // setOpen(false)
                                                         setModalVisible(true);
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
                            }
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
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <SafeAreaView
                                        style={{
                                            borderRadius: 5,
                                            overflow: "hidden",
                                            width: windowWidth - 20
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
                                </View>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}
                                    style={styles.backdrop}
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

const styles = StyleSheet.create({
    movieCardImage: {
        width: windowWidth / 3.2,
        resizeMode: 'cover',
        zIndex: 1,
        aspectRatio: 2 / 3,
    },

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
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    categoryBadge: {
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: "#161616",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 3,
    }
});
