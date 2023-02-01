import {Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
export default function EpisodeCard({item}) {
    const navigation = useNavigation()
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
                            source={{uri: `http://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png`}}
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
