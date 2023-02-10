import {Image, Text, TouchableOpacity} from "react-native";
import {urls} from "../Utils/urls";

export default function PlayerEpisodeItem({item, currentEpisode, onPress}) {
    return (
        <TouchableOpacity
            key={`episode-${item.id}`}
            style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 5,
                paddingHorizontal: 5,
                backgroundColor: currentEpisode === item.id ?
                    "rgba(255,255,255,.2)"
                    :
                    "transparent",
            }}
            onPress={()=>onPress(item.id)}
        >
            <Image
                source={{uri: `${urls}/resource/${item.image.name}_s.${item.image.ext}`.replace(/ /g, "%20")}}
                style={{
                    width: 100,
                    aspectRatio: 16 / 9
                }}
            />
            <Text style={{
                marginLeft: 10,
                color: "#fff",
                fontSize: 18
            }}>
                {item.episodeNumber}
            </Text>
        </TouchableOpacity>
    )
}
