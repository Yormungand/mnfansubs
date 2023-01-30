import {View, Text, Image, StyleSheet} from "react-native";
import s from "../utils/getRelativeSize";
import colors from "../utils/colors";

export default function MovieListCard({ movie }) {

    return (
        <>
            <View style={style.movieListItem}>
                <View style={{flex: 2}}>
                    <Image
                        source={{uri: "http://www.mnfansubs.net/resource/mnfansubs/image/2022/01/27/2ug4r62nckuoqehq/%D0%92%D0%B8%D1%82%D1%87%D0%B5%D1%80_m.png"}}
                        style={style.listItemImage}
                    />
                </View>
                <View style={{flex: 6, marginHorizontal: 10, paddingVertical: 5}}>
                    <Text style={{marginBottom: 5, fontSize: 16, fontWeight: "500", color: "#fff"}}>
                        {movie.name}
                    </Text>
                    <View style={{flexDirection: "row", marginBottom: 3}}>
                        <Text style={{marginRight: 15, color: colors.grey["600"], fontSize:14}}>{movie.year}</Text>
                        {
                            movie.totalNumber &&
                            <Text style={{color: colors.grey["600"], fontSize:14}}>{movie.totalNumber} анги</Text>
                        }
                    </View>
                    {/*<View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 5}}>
                        <View
                            style={style.collectionTag}
                        >
                            <Text style={style.collectionTagName}>Найруулагч Хосода Маморүгийн цуглуулга</Text>
                        </View>
                    </View>*/}
                    <View style={{flexDirection: "row", flexWrap: "wrap", marginTop: 5}}>
                        {
                            movie.categories.length > 0 &&
                            movie.categories.map((cat)=>(
                                <View key={`cat-${cat.id}`} style={style.categoryTag}>
                                    <Text style={style.categoryTagName}>{cat.name}</Text>
                                </View>
                            ))
                        }
                    </View>
                </View>
            </View>
        </>
    )

}

const style = StyleSheet.create({
    movieListItem: {
        borderRadius: 5,
        overflow: "hidden",
        flexDirection: "row",
        height: 150,
        backgroundColor: "#161616",
    },
    listItemImage: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
        zIndex: 1,
    },
    collectionTag: {
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: "#207fbc",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    collectionTagName: {
        color: "#dedede",
        fontSize: 11,
        lineHeight: 11,
    },
    categoryTag: {
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: "#484848",
        paddingVertical: 4,
        paddingHorizontal: 5,
        borderRadius: 3,
    },
    categoryTagName: {
        color: "#dedede",
        fontSize: 11,
        lineHeight: 11,
    }
})
