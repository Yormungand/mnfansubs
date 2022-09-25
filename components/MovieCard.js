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
import s from "../utils/getRelativeSize";
import {TouchableRipple} from "react-native-paper";
import {useCallback, useEffect, useState} from "react";
import BottomSheet from "./BottomSheet";
import {Ionicons} from "@expo/vector-icons";
import colors from "../utils/colors";
import {Video} from "expo-av";
import WebView from "react-native-webview";
import YoutubeIframe from "react-native-youtube-iframe";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
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

    const onStateChange = useCallback((state)=>{
        if (state === "ended"){
            console.log("ENDED")
            setTrailerPlaying(false);
            setModalVisible(!modalVisible)
        }
    },[])

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
            <View style={[{marginRight: s(10)}, {style}]}>
                <View style={{position: 'relative', flex: 1}} rippleColor='rgba(255,255,255,.5)'>
                    <View>
                        <Image
                            source={{uri: "http://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                            style={{width: s(110), height: s(165), resizeMode: 'cover', zIndex: 1, borderRadius: 10}}
                        />
                        {/*<View style={{position: 'absolute', paddingHorizontal: s(5), bottom: s(3), zIndex: 5}} pointerEvents='none'>*/}
                        {/*    <Text style={{color: '#fff', fontSize: 13}}>Mortal kombat, one piece: {item}-р анги</Text>*/}
                        {/*</View>*/}
                    </View>
                    <SafeAreaView style={{position: 'absolute',}}>
                        <TouchableRipple style={Styles.movieCardMask}
                                         onPress={() => setOpen(true)}
                                         rippleColor="rgba(255, 255, 255, .42)">
                            <></>
                        </TouchableRipple>
                    </SafeAreaView>
                </View>
            </View>

            <BottomSheet open={open} onClose={handleClose} closeRequested={closeRequested}>
                <View style={{flex: 1, padding: s(10)}}>
                    <View style={{flexDirection: "row"}}>
                        <Image
                            source={{uri: "https://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                            style={{
                                width: s(Platform.OS === 'ios' ? 95 : 85),
                                height: s(Platform.OS === 'ios' ? 140 : 125),
                                resizeMode: 'cover',
                                zIndex: 1,
                                borderRadius: 10,
                            }}
                        />
                        <View style={{flexDirection: "column", marginLeft: s(10)}}>
                            <Text numberOfLines={1}
                                  style={{
                                      fontSize: s(16),
                                      fontWeight: "bold",
                                      color: colors.grey["50"]
                                  }}>
                                Mortal Kombat
                            </Text>
                            <View style={{
                                flexDirection: "row", marginTop: s(5)
                            }}>
                                <Text style={{color: colors.grey["600"]}}>1999</Text>
                                <Text style={{
                                    marginLeft: s(10),
                                    color: colors.grey["600"]
                                }}>12+</Text>
                                <Text style={{
                                    marginLeft: s(10),
                                    color: colors.grey["600"]
                                }}>1000+ анги</Text>
                            </View>
                            <View style={{marginTop: s(5)}}>
                                <Text style={{
                                    width: s(260),
                                    height: s(100),
                                    color: colors.grey["300"]
                                }}
                                      numberOfLines={Platform.OS === 'ios' ? 5 : 4}>
                                    Энэ ертөнцийн бүхнийг өөрийн болгосон далайн дээрэмчний хаан Голд Рожер
                                    цаазлуулахаасаа
                                    өмнө хэлсэн сүүлийн үг хүмүүсийг далай руу хөтлөх болжээ. "Миний эрдэнэс үү? Хүсэж
                                    байвал авч болно. Хайж ол! Би тэр газар бүхнийг орхисон!"
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        marginTop:
                            Platform.OS === 'ios' ? s(20) : s(0)
                    }}>
                        <View>
                            <TouchableRipple style={[Styles.button]}
                                             mode="contained" onPress={() => {
                            }}
                                             rippleColor="rgba(255, 255, 255, .42)">
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Ionicons name="play" color={colors.white} size={s(12)}
                                              style={{marginRight: s(3)}}/>
                                    <Text style={{color: colors.white}}>
                                        Тоглуулах
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                        <View>
                            <TouchableRipple style={[Styles.button, {marginLeft: s(10)}]}
                                             mode="contained"
                                             onPress={() => {
                                                 setOpen(false)
                                                 navigation.navigate("Movie", {name: "Mortal Kombat 2"})
                                             }}
                                             rippleColor="rgba(255, 255, 255, .42)"
                            >
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Ionicons name="information-circle-outline" color={colors.white} size={s(17)}
                                              style={{marginRight: s(3)}}/>
                                    <Text style={{color: colors.white}}>
                                        Дэлгэрэнгүй
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                        <View>
                            <TouchableRipple style={[Styles.button, {marginLeft: s(10)}]}
                                             mode="contained"
                                             onPress={() => {
                                                 // setOpen(false)
                                                 setModalVisible(true);
                                                 setTrailer("https://youtu.be/Qx01pn9l-6g");
                                             }}
                                             rippleColor="rgba(255, 255, 255, .42)"
                            >
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Ionicons name="videocam" color={colors.white} size={s(17)}
                                              style={{marginRight: s(3)}}/>
                                    <Text style={{color: colors.white}}>
                                        Trailer
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={()=>{setModalVisible(!modalVisible)}}>
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
                                        borderRadius: s(10),
                                        overflow: "hidden",
                                        height: s(170),
                                        width: s(300)
                                    }}>
                                    <YoutubeIframe
                                        height={s(170)}
                                        width={s(300)}
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
                                onPress={()=>setModalVisible(!modalVisible)}
                                style={Styles.backdrop}
                            >
                                <Text></Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </TouchableWithoutFeedback>
            </BottomSheet>

        </>
    )
}

const Styles = StyleSheet.create({
    button: {
        borderRadius: s(10),
        backgroundColor: "#1b1b1b",
        paddingVertical: s(7),
        paddingHorizontal: s(10),
        elevation: 2,
    },
    movieCardMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: s(110),
        height: s(165),
        zIndex: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: s(10)
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
        borderRadius: 20,
        padding: 20,
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
