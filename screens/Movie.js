import {Button, Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import s from "../utils/getRelativeSize";
import colors from "../utils/colors";
import {TouchableRipple} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";


export default function Movie({navigation, route}) {
    return (
        <>
            <View>
                <SafeAreaView
                    style={
                        {
                            position: "relative",
                            height: s(350),
                            width: s(375),
                            overflow: "hidden"
                        }
                    }>
                    <LinearGradient
                        colors={["transparent","rgba(0,0,0,0.25)"]}
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            zIndex: 3
                        }}/>
                    <Image
                        source={{uri: "https://www.mnfansubs.net/resource/mnfansubs/image/2022/04/03/ove5174um36qsy47/_l.jpg"}}
                        style={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: s(563),
                            resizeMode: 'contain',
                            zIndex: 1,
                        }}
                    />
                </SafeAreaView>
                <View style={{marginTop: s(10), paddingHorizontal: s(10)}}>
                    <Text style={{
                        color: colors.white,
                        fontSize: s(26),
                        fontWeight: "bold"
                    }}>
                        {route.params.name} {Platform.OS === 'ios' ? 'ios' : 'android genesis sucks'}
                    </Text>
                    <View>
                        <TouchableRipple style={[Styles.button, {marginVertical: s(10)}]}
                                         mode="contained" onPress={() => {
                            navigation.navigate("Player")
                        }}
                                         rippleColor="rgba(0, 0, 0, .42)">
                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                <Ionicons name="play" color={colors.black} size={s(14)} style={{marginRight: s(3)}}/>
                                <Text style={{color: colors.black, fontWeight: "bold", fontSize: s(14)}}>
                                    Тоглуулах
                                </Text>
                            </View>
                        </TouchableRipple>
                    </View>
                    <Text
                        numberOfLines={8}
                        style={{
                            marginTop: s(5),
                            color: colors.white,
                            fontSize: s(12),
                            fontWeight: "500"
                        }}>
                        Японд Ширай Рюү овгийн их багш Хасаши Ханзо, бяцхан хүү Сатошигийн хамтаар харих замд
                        өрсөлдөгч Лин Күэй овгийнхон мөшгөж таарна. Тэднийг алсны дараагаар гэртээ ирэхэд Лин Күэй
                        овгийнхон эхнэр Харумиг нь төдийгүй Ширай Рюү овгийг бүгдийг нь хядсаныг олж мэднэ. Олон дайсны
                        эсрэг Ханзо ганцаар тулалдаж байхад Лин Күэйгийн Саб Зеро гэгч, хүү Сатошиг нь хэрцгийгээр
                        хөнөөнө. Дараагаар нь Ханзог өөрийг нь цааш харуулах боловч үл мэдэгдэх шалтгаанаар Ханзо нь
                        Тамын ертөнцөд амилсан байх нь тэр. Өс хонзондоо автсан түүнд тамын шидтэн Куан Чи Үхлийн
                        тулаанд орж, өөрт нь туслахын хажуугаар Саб Зерогоос өшөөгөө авах боломжийг Ханзод санал
                        болгоно. Ханзо ч үүнийг зөвшөөрч, өөрийн төрхийг Скорпион болгон хувиргана.
                    </Text>
                </View>
            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    button: {
        borderRadius: s(3),
        backgroundColor: "#fff",
        paddingVertical: s(10),
        paddingHorizontal: s(10),
        width: "100%",
    },
})
