import ListHeader from "./ListHeader";
import {FlatList, View} from "react-native";
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
        <View style={{marginBottom: 20}} key={`collection-${item.collectionId}`}>
            <ListHeader headerName={item.name}/>
            <FlatList
                listKey={`collectionList-${item.collectionId}`}
                data={movies}
                style={{ marginTop: 10, marginLeft: 10 }}
                horizontal
                scrollEnabled={true}
                contentContainerStyle={{flexGrow: 1}}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={800}
                initialNumToRender={1}
                renderItem={renderMovieItem} />
        </View>
    )

}
