import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {urls} from "../Utils/urls";

const windowWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const logo = require("../assets/adaptive_icon.png");
export default function SectionEpisodeItem({item, tabState}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={.5}
            style={{
                flexDirection: "row",
                marginBottom: 20
            }}
            onPress={()=>navigation.navigate("Player", {episodeId: item.id})}
        >

            {
                item.image ?
                    <Image
                        style={style.episodeImage}
                        source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}.${item.image.ext}`}}
                    />
                    :
                    <Image
                        style={[style.episodeImage, {resizeMode: 'cover'}]}
                        source={logo}
                    />
            }
            <View style={{flex: 1, justifyContent: "center"}}>
                {
                    tabState.code === "episode" &&
                    <View>
                        {
                            item.episodeNumber &&
                            <Text
                                style={{
                                    color: "rgba(255,255,255,.5)",
                                }}
                            >
                                {item.episodeNumber}-р анги
                            </Text>
                        }
                    </View>
                }
                <Text style={{color: "#fff"}}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    episodeImage: {
        width: windowWidth / 3,
        resizeMode: 'cover',
        aspectRatio: 16 / 9,
        marginRight: 10,
        borderRadius: 3,
        backgroundColor: "#161616"
    }
})
