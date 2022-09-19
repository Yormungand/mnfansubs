import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import s from "../utils/getRelativeSize"
import {Chip, TouchableRipple} from "react-native-paper";

export default function EpisodeCard({ item }) {
    return (
        <>
            <View style={{ position: 'relative', marginVertical: s(5), flex: 1}} activeOpacity={0.4}>
                <SafeAreaView>
                    <Image source={{uri: "https://www.mnfansubs.net/resource/mnfansubs/image/2022/08/30/tfrvg3vmwsju0fpe/_m.jpg"}}
                           style={{ width: s(170), height: s(100), resizeMode: 'cover', borderRadius: 10 }}
                    />
                    <View style={{position: 'absolute', bottom: s(5), zIndex: 3}} pointerEvents="none">
                        <Text
                            style={{paddingHorizontal: s(5), color: '#fff', fontSize: 13, overflow: "scroll", width: s(170),}}>
                            Mortal kombat, one piece: {item}-р анги
                        </Text>
                    </View>
                    <TouchableRipple style={{position: 'absolute', top: 0, left: 0, width: s(170), height: s(100), zIndex: 2, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 10}} onPress={() => console.log('Pressed')}
                                     rippleColor="rgba(255, 255, 255, .42)" >
                        <View></View>
                    </TouchableRipple>
                </SafeAreaView>
            </View>
        </>
    )
}
