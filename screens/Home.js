import {Button, FlatList, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import MovieCard from "../components/MovieCard";
import s from "../utils/getRelativeSize"
import ListHeader from "../components/ListHeader";
import {useEffect, useState} from "react";
import fetcher from "../utils/fetcher";
import {urls} from "../Utils/urls";
import {setGlobalState, useGlobalState} from "../hooks/useGlobalState";
import MovieCollectionsList from "../components/MovieCollectionsList";

export default function Home({navigation}) {

    const [latestEpisodes, setLatestEpisodes] = useState([]);
    const [movieCollections, setMovieCollections] = useState([]);

    const [userToken] = useGlobalState("userToken");

    const getLatestEpisodes = () => {
        fetch(`${urls}/api/movie/episode/latest?size=8`,
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
                    setLatestEpisodes(response)
                }
            })
    }

    const getCollections = () => {
        fetch(`${urls}/api/movie/collection`,
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
                    setMovieCollections(response)
                }
            })
    }

    useEffect(() => {
        getLatestEpisodes();
        getCollections();
        return () => {

        };
    }, []);

    const getExpired = () => {
        fetcher(`/api/movie/user/subscription/getExpired`)
            .then((data) => {
                if (data.status === 200) {
                    const date1 = new Date(data.payload * 1000)
                    console.log("date1=-=-", date1);
                    console.log("date1 ===" , "date2", date1, new Date())
                    console.log("difference", (date1.getTime() - new Date().getTime()), (1000 * 3600 * 24), (date1.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                    const difference = (date1.getTime() - new Date().getTime());
                    const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
                    let result = "Дууссан";
                    if (totalDays > 0)
                        result = totalDays + ' өдөр';
                    console.log(result)
                }
            })
    }
    //
    const renderEpisodeItem = ({item}) => <EpisodeCard item={item} navigation={navigation}/>;

    const movieCollectionList = ({item}) => <MovieCollectionsList item={item}/>;

    return (
        <>
            <Button title={"get expired"} onPress={getExpired}/>
            <FlatList data={[0]}
                      renderItem={() => (
                          <>
                              <View>
                                  <ListHeader headerName="New episodes"/>
                                  <FlatList
                                      listKey={`episodesLatestList`}
                                      data={latestEpisodes}
                                      style={{marginTop: 10, marginLeft: 10}}
                                      scrollEnabled={false}
                                      numColumns={2}
                                      renderItem={renderEpisodeItem}/>
                              </View>
                              <View>
                                  <FlatList
                                      listKey={`collectionsList`}
                                      data={movieCollections}
                                      renderItem={movieCollectionList}
                                  />
                              </View>
                              <View style={{marginBottom: s(25)}}></View>
                          </>
                      )}
                      style={{paddingBottom: 40}}
                      scrollEnabled
                      stickyHeaderHiddenOnScroll={true}
            />
        </>
    )
}

/*function MovieListItem({ item }) {
    return <ListItem title={item.title} subtitle={<RelativeTime date={item.created} />} image={{ source: item.image.source, width: s(120), height: s(67.5) }} />;
}*/
