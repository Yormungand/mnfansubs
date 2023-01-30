import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import s from "../utils/getRelativeSize"
import {Chip, TouchableRipple} from "react-native-paper";
import {urls} from "../Utils/urls";

export default function EpisodeCard({item}) {
    return (
        <>
            <View
                key={`episode-${item.id}`}
                style={{
                    position: 'relative',
                    borderRadius: 10,
                    marginBottom: 10,
                    marginRight: 10,
                    flex: 1,
                    backgroundColor: "#000",
                    overflow: "hidden"
                }}
                activeOpacity={0.4}
            >
                <SafeAreaView>
                    {
                        item.image &&
                        <Image
                            source={{uri: `http://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png`}}
                            style={{width: "100%", height: 110, resizeMode: 'cover'}}
                        />
                    }
                    <View style={{position: 'absolute', bottom: 10, zIndex: 3}} pointerEvents="none">
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                color: '#fff',
                                fontSize: 12,
                                overflow: "scroll",
                                width: 170,
                            }}>
                            {item.movie.name}: {item.episodeNumber}-р анги
                        </Text>
                    </View>
                    <TouchableRipple
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 2,
                            backgroundColor: 'rgba(0,0,0,0.35)',
                            borderRadius: 10
                        }}
                        onPress={() => console.log('Pressed')}
                        rippleColor="rgba(255, 255, 255, .42)">
                        <View></View>
                    </TouchableRipple>
                </SafeAreaView>
            </View>
        </>
    )
}
