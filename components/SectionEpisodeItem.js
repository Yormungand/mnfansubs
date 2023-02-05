import {useNavigation} from "@react-navigation/native";
import {Dimensions, Image, Text, TouchableOpacity, View} from "react-native";
import {urls} from "../Utils/urls";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
export default function SectionEpisodeItem({item}) {

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
            <Image
                style={{
                    width: screenWidth / 3,
                    resizeMode: 'cover',
                    aspectRatio: 16 / 9,
                    marginRight: 10,
                    borderRadius: 3,
                    backgroundColor: "#161616"
                }}
                source={{uri: `${urls}/resource/${encodeURIComponent(item.image.name)}.${item.image.ext}`}}
            />
            <View style={{flex: 1, justifyContent: "center"}}>
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
                <Text style={{color: "#fff"}}>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
