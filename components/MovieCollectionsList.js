import ListHeader from "./ListHeader";
import {FlatList, View} from "react-native";
import s from "../utils/getRelativeSize";
import * as React from "react"
import {useEffect, useState} from "react";
import MovieCard from "./MovieCard";
import {urls} from "../Utils/urls";
import {setGlobalState} from "../hooks/useGlobalState";
import { useNavigation } from "@react-navigation/native";


export default function MovieCollectionsList({item, style}) {

    const navigation = useNavigation();
    const [movies, setMovies] = useState([]);

    const renderMovieItem = ({item}) => <MovieCard item={item.movie} navigation={navigation}/>;

    const getCollectionMovies = () => {
        fetch(`${urls}/api/movie/collection/${item.collectionId}`,
            {
                method: "get", credentials: "include", headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            }
        )
            .then((res) => {
                if (res.ok) {
                    if (res.status === 204)
                        return null
                    if (res.status === 401) {
                        setGlobalState("currentUser", null);
                        setGlobalState("userToken", null);
                    }
                    return res.json()
                }
            })
            .then((response) => {
                if (response) {
                    setMovies(response)
                }
            })
    }

    useEffect(() => {

        getCollectionMovies();

        return () => {

        };
    }, [item]);


    return (
        <View key={`collection-${item.collectionId}`}>
            <ListHeader headerName={item.name}/>
            <FlatList
                listKey={`collectionList-${item.collectionId}`}
                data={movies}
                style={{ marginTop: 10, marginLeft: 10 }}
                horizontal
                scrollEnabled={true}
                // ListHeaderComponent={<View><Text>Home</Text></View>}
                contentContainerStyle={{flexGrow: 1}}
                renderItem={renderMovieItem} />
        </View>
    )

}
