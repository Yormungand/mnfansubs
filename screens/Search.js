import MovieCard from "../components/MovieCard";
import {FlatList, SafeAreaView, ScrollView, StyleSheet, TextInput, View} from "react-native";
import ListHeader from "../components/ListHeader";
import s from "../Utils/getRelativeSize";
import MovieListCard from "../components/MovieListCard";
import fetcher from "../Utils/fetcher";
import {setGlobalState} from "../hooks/useGlobalState";
import {useEffect, useState} from "react";

export default function Search({navigation}) {

    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const renderMovieItem = ({item}) => (
        <View style={{marginBottom: 10}}>
            <MovieCard item={item} navigation={navigation}/>
        </View>
    )

    const renderMovieListItem = ({item}) => (
        <View style={{marginBottom: 10}}>
            <MovieListCard movie={item}/>
        </View>
    )

    const searchMovie = () => {
        fetcher(`/api/movie/list?q=${query}&pageSize=40`)
            .then((data) => {
                if (data.status === 200)
                    setMovies(data.payload.thisPageElements);
            })
    }

    useEffect(() => {
        searchMovie()
        return () => {

        };
    }, [query]);

    useEffect(() => {
        searchMovie()
        return () => {

        };
    }, []);


    return (
        <View style={style.container}>
            <View>
                <TextInput
                    placeholder={"Search"}
                    placeholderTextColor={"#999"}
                    style={{
                        borderWidth: 1,
                        borderColor: "#666",
                        borderRadius: 5,
                        marginTop: 15,
                        paddingHorizontal: 20,
                        height: 50,
                        width: "100%",
                        color: "#fff",
                        backgroundColor: "rgba(22,22,22,1)"
                    }}
                    value={query}
                    onChangeText={setQuery}
                />
            </View>
            <FlatList
                data={[1]}
                renderItem={() => <></>}
                ListFooterComponent={
                    <SafeAreaView>
                        <View>
                            {/*<ListHeader headerName="Search"/>*/}
                            <FlatList
                                data={movies}
                                style={{marginTop: 15}}
                                scrollEnabled={true}
                                numColumns={1}
                                // ListHeaderComponent={<View><Text>Home</Text></View>}
                                // contentContainerStyle={{flexGrow: 1}}
                                renderItem={renderMovieListItem}
                            />
                        </View>
                    </SafeAreaView>
                }
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#161616",
        zIndex: 1,
        paddingHorizontal: 10
    },
})
