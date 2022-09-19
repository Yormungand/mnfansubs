import {Button, Dimensions, Image, Platform, Text, View} from "react-native";
import s from "../utils/getRelativeSize";
import colors from "../utils/colors";


export default function Movie({navigation, route}) {
    return (
        <>
            <View>
                <Image
                    source={{uri: "https://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                    style={{
                        width: s(170),
                        height: s(255),
                        resizeMode: 'cover',
                        zIndex: 1,
                    }}
                />
                <View style={{marginTop: s(10), paddingHorizontal: s(10)}}>
                    <Text style={{
                        color: colors.white,
                        fontSize: s(26),
                        fontWeight: "bold"}}>
                        {route.params.name} {Platform.OS === 'ios' ? 'ios':'android'}
                    </Text>
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
