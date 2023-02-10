import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {urls} from "../Utils/urls";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function EpisodeCard({item}) {
    const navigation = useNavigation()
    // console.log(`${item.image.path.replace(/ /g, '%20')}`)
    // console.log(`${item.image.path}`)
    return (
        <>
            <View
                key={`episode-${item.id}`}
                style={style.episodeCard}
                activeOpacity={0.4}
            >
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate("Player", {episodeId: item.id})}>
                    {
                        item.image &&
                        <Image
                            source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}_s.${item.image.ext}`}}
                            style={style.episodeCardImage}
                        />
                    }
                    <View style={style.episodeCardNameWrapper} pointerEvents="none">
                        <Text
                            style={style.episodeCardName}>
                            {item.movie.name} {item.episodeNumber ? `${item.episodeNumber}-р анги`:""}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    episodeCard: {
        position: 'relative',
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
        flex: 1,
        backgroundColor: "#000",
        overflow: "hidden",
    },
    episodeCardNameWrapper: {
        position: 'absolute',
        bottom: 0,
        zIndex: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "100%",
        backgroundColor: "rgba(0,0,0,.5)"
    },
    episodeCardName: {
        color: '#fff',
        fontSize: 0.06 * (windowWidth / 2),
        overflow: "scroll",
        width: "100%",
    },
    episodeCardImage: {
        width: windowWidth / 2.3,
        resizeMode: 'cover',
        aspectRatio: 16/9,
        backgroundColor: "#161616"
    }
})
