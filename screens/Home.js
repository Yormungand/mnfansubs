import {Dimensions, FlatList, ScrollView, View} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import ListHeader from "../components/ListHeader";
import {useCallback, useEffect, useState} from "react";
import {urls} from "../Utils/urls";
import {setGlobalState, useGlobalState} from "../hooks/useGlobalState";
import MovieCollectionsList from "../components/MovieCollectionsList";
import {FlashList} from "@shopify/flash-list";
import fetcher from "../Utils/fetcher";
import WatchedEpisodeCard from "../components/WatchedEpisodeCard";
import MovieCard from "../components/MovieCard";


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function Home({navigation}) {
    const [latestEpisodes, setLatestEpisodes] = useState([]);
    const [movieCollections, setMovieCollections] = useState([]);
    const [watchedEpisodes, setWatchedEpisodes] = useState([]);

    const [ongoingMovies, setOngoingMovies] = useState([]);
    const [completedMovies, setCompletedMovies] = useState([]);

    const [userToken] = useGlobalState("userToken");

    const getWatchedEpisodes = () => {
        fetcher(`/api/client/episode/watched?size=6`)
            .then((data) => {
                if (data.status === 200) {
                    if (data.payload.thisPageElements.length > 0)
                        setWatchedEpisodes(data.payload.thisPageElements)
                }
            })
    }
    const getLatestEpisodes = () => {
        fetcher(`/api/movie/episode/latest?size=8`)
            .then((data) => {
                if (data.status === 200)
                    setLatestEpisodes(data.payload)
            })
    }

    const getCollections = () => {
        fetcher(`/api/movie/collection`)
            .then((data) => {
                if (data.status === 200) {
                    setMovieCollections(data.payload)
                }
            })
    }

    const getMoviesList = (movieStatus) => {
        fetcher(`/api/movie/list?movieStatus=${movieStatus}`)
            .then((data) => {
                if (data.status === 200) {
                    if (movieStatus === "ONGOING") {
                        setOngoingMovies(data.payload.thisPageElements)
                    }
                    if (movieStatus === "COMPLETED") {
                        setCompletedMovies(data.payload.thisPageElements)
                    }
                }
            })
    }

    useEffect(() => {
        getLatestEpisodes();
        getCollections();
        getWatchedEpisodes();
        getMoviesList("ONGOING");
        getMoviesList("COMPLETED");
        return () => {

        };
    }, []);
    //

    const getEpisodeLayout = useCallback(
        (data, index) => ({
            length: 20,
            offset: index * 20,
            index
        }),
        [],
    );


    const renderEpisodeItem = ({item}) => <EpisodeCard item={item} navigation={navigation}/>;

    const renderWatchedEpisodeItem = ({item}) => <WatchedEpisodeCard item={item} navigation={navigation}/>
    const movieCollectionList = ({item}) => <MovieCollectionsList item={item}/>;

    const renderMovieCard = ({item}) => <MovieCard item={item} navigation={navigation}/>

    return (
        <>
            <FlatList
                data={[0]}
                estimatedItemSize={3}
                decelerationRate={0.555}
                windowSize={21}
                renderItem={() => (
                    <>
                        <View style={{marginTop: 20, marginBottom: 20}}>
                            <ListHeader headerName="Үзсэн гаргалтууд"/>
                            <FlatList
                                listKey={`episodesWatchedList`}
                                data={watchedEpisodes}
                                style={{marginTop: 10, marginLeft: 10}}
                                scrollEnabled
                                horizontal
                                maxToRenderPerBatch={2}
                                updateCellsBatchingPeriod={200}
                                getItemLayout={getEpisodeLayout}
                                renderItem={renderWatchedEpisodeItem}
                                ListEmptyComponent={()=>(
                                    renderWatchedEpisodeItem({})
                                )}
                            />
                        </View>
                        <View style={{marginBottom: 20}}>
                            <ListHeader headerName="Шинээр нэмэгдсэн ангиуд"/>
                            <FlatList
                                estimatedItemSize={800}
                                listKey={`episodesLatestList`}
                                data={latestEpisodes}
                                style={{marginTop: 10, marginLeft: 10}}
                                scrollEnabled
                                horizontal
                                maxToRenderPerBatch={2}
                                updateCellsBatchingPeriod={200}
                                renderItem={renderEpisodeItem}/>
                        </View>
                        <View style={{marginBottom: 20}}>
                            <ListHeader headerName="Орчуулж байгаа"/>
                            <FlatList
                                estimatedItemSize={800}
                                listKey={`ongoingMovies`}
                                data={ongoingMovies}
                                style={{marginTop: 10, paddingLeft: 10}}
                                scrollEnabled
                                horizontal
                                maxToRenderPerBatch={2}
                                updateCellsBatchingPeriod={200}
                                renderItem={renderMovieCard}/>
                        </View>
                        <View style={{marginBottom: 20}}>
                            <ListHeader headerName="Орчуулж дууссан"/>
                            <FlatList
                                estimatedItemSize={800}
                                listKey={`completedMovies`}
                                data={completedMovies}
                                style={{marginTop: 10, paddingLeft: 10}}
                                scrollEnabled
                                horizontal
                                maxToRenderPerBatch={2}
                                updateCellsBatchingPeriod={200}
                                renderItem={renderMovieCard}/>
                        </View>
                        <View style={{marginBottom: 20}}>
                            <FlatList
                                listKey={`collectionsList`}
                                data={movieCollections}
                                renderItem={movieCollectionList}
                            />
                        </View>
                        <View style={{marginBottom: 25}}></View>
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
