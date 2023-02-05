import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {urls} from "../Utils/urls";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
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
                            {item.movie.name}: {item.episodeNumber}-р анги
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
