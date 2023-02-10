import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {urls} from "../Utils/urls";
import logo from "../assets/adaptive_icon.png";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function MovieEpisodeOfMovie({item, tabState}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.5}
            style={{
                position: "relative",
                flexDirection: "row",
                marginLeft: 10,
                width: (windowWidth / 2) - 15
            }}
            onPress={()=>navigation.navigate("Player", {episodeId: item.id})}
        >

            {
                item.horiImage ?
                    <View
                        style={{
                            position: "relative",
                            overflow: "hidden"
                        }}>
                        <Image
                            style={style.episodeImage}
                            source={{uri: `${urls}/resource/${encodeURIComponent(item.horiImage.name)}_m.${item.horiImage.ext}`}}
                        />
                        {
                            item.type.alias === "episode" && item.episodeNumber &&
                            <View
                                style={style.episodeNumberWrap}
                            >
                                <Text style={style.episodeNumber}>
                                    {item.episodeNumber}-р анги
                                </Text>
                            </View>
                        }
                    </View>
                    :
                    <View>
                        <Image
                            style={[style.episodeImage, {resizeMode: 'cover'}]}
                            source={logo}
                        />
                    </View>
            }
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    episodeImage: {
        width: "100%",
        resizeMode: 'stretch',
        aspectRatio: 9 / 16,
        borderRadius: 3,
        backgroundColor: "#161616"
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
