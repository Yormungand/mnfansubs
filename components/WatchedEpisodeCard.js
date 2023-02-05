import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {urls} from "../Utils/urls";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
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
                        <Text style={style.episodeCardName}>
                            {item.episode.movie.name}: {item.episode.episodeNumber}-р анги
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
        bottom: 10,
        zIndex: 3
    },
    episodeCardName: {
        paddingHorizontal: 10,
        color: '#fff',
        fontSize: 12,
        overflow: "scroll",
        width: 170,
    },
    episodeCardImage: {
        width: screenWidth / 2.3,
        resizeMode: 'cover',
        aspectRatio: 16/9,
    }
})
