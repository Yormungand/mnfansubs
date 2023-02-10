import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {urls} from "../Utils/urls";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const logo = require("../assets/adaptive_icon.png");
export default function EpisodeItemOfMovie({item, tabState}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.5}
            style={{
                position: "relative",
                flexDirection: "row",
                marginBottom: 20,
            }}
            onPress={()=>navigation.navigate("Player", {episodeId: item.id})}
        >

            {
                item.image ?
                    <View
                        style={{
                            position: "relative",
                            marginRight: 10,
                            overflow: "hidden"
                    }}>
                        <Image
                            style={style.episodeImage}
                            source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}_s.${item.image.ext}`}}
                        />
                        {
                            item.type.alias === "episode" && item.episodeNumber &&
                            <View style={style.episodeNumberWrap}>
                                <Text style={style.episodeNumber}>
                                    {item.episodeNumber}-р анги
                                </Text>
                            </View>
                        }
                    </View>
                    :
                    <View
                        style={{
                            position: "relative",
                            marginRight: 10,
                            overflow: "hidden"
                        }}>
                        <Image
                            style={style.episodeImage}
                            source={{uri: `${urls}/static/webs/mnfansubs/assets/adaptive_icon.png`}}
                        />
                        {
                            item.type.alias === "episode" && item.episodeNumber &&
                            <View style={style.episodeNumberWrap}>
                                <Text style={style.episodeNumber}>
                                    {item.episodeNumber}-р анги
                                </Text>
                            </View>
                        }
                    </View>
            }
            <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={{color: "#fff"}}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    episodeImage: {
        position: "relative",
        width: windowWidth / 2 - 50,
        resizeMode: 'cover',
        aspectRatio: 16 / 9,
        borderRadius: 3,
        backgroundColor: "#161616",
    },
    episodeNumberWrap: {
        position: 'absolute',
        borderRadius: 3,
        bottom: 0,
        zIndex: 3,
        paddingVertical: 3,
        paddingHorizontal: 7,
        width: "100%",
        backgroundColor: "rgba(0,0,0,.75)"
    },
    episodeNumber: {
        fontSize: 0.06 * (windowWidth / 2),
        color: "#fff",
    }
})
