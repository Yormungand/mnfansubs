import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {urls} from "../Utils/urls";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
export default function WatchedEpisodeCard({item}) {

    const navigation = useNavigation()

    return (
        <>
            <View
                key={`episode-${item.episode.id}`}
                style={style.episodeCard}
            >
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate("Player", {episodeId: item.episode.id})}>
                    {
                        item.episode.image &&
                        <Image
                            source={{uri: `${urls}/resource/${encodeURIComponent(item.episode.image.path)}`}}
                            style={style.episodeCardImage}
                        />
                    }
                    <View style={style.episodeCardNameWrapper} pointerEvents="none">
                        {
                            item.episode.type.alias === "movie" ?
                                <Text style={style.episodeCardName}>
                                    {item.episode.movie.name}: {item.episode.name}
                                </Text>
                                :
                                <Text style={style.episodeCardName}>
                                    {item.episode.movie.name}: {item.episode.episodeNumber}-р анги
                                </Text>
                        }
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
    }
})
