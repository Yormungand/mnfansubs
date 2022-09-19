import {FlatList, Image, SafeAreaView, ScrollView, Text, View} from "react-native";
import EpisodeCard from "../components/EpisodeCard";
import MovieCard from "../components/MovieCard";
import s from "../utils/getRelativeSize"
import ListHeader from "../components/ListHeader";

export default function Home({ navigation }) {

    const renderEpisodeItem = ({item}) => <EpisodeCard item={item} navigation={navigation} />

    const renderMovieItem = ({ item }) => <MovieCard item={item} navigation={navigation} />

    return (
        <>
            <FlatList data={[1]}
                      renderItem={()=><></>}
                      style={{paddingBottom: s(40)}}
                      scrollEnabled
                      stickyHeaderHiddenOnScroll={true}
                      ListFooterComponent={
                          <>
                              <View>
                                  <ListHeader headerName="New episodes"/>
                                  <FlatList
                                      data={[ 1,2,3,4,1,1 ]}
                                      style={{ marginTop: 10, marginLeft: s(10) }} scrollEnabled={false} numColumns={2}
                                      renderItem={renderEpisodeItem} />
                              </View>
                              <View>
                                  <ListHeader headerName="Collections"/>
                                  <FlatList
                                      data={[ 1,2,3,4,5,6,7,8,9,10,11 ]}
                                      style={{ marginTop: 10, marginLeft: s(10) }}
                                      horizontal
                                      scrollEnabled={true}
                                      // ListHeaderComponent={<View><Text>Home</Text></View>}
                                      contentContainerStyle={{flexGrow: 1}}
                                      renderItem={renderMovieItem} />
                              </View>
                              <View>
                                  <ListHeader headerName="Home"/>
                                  <FlatList
                                      data={[ 1,2,3,4,5,6,7,8,9,10,11 ]}
                                      style={{ marginTop: 10, marginLeft: s(10) }}
                                      horizontal
                                      scrollEnabled={true}
                                      contentContainerStyle={{flexGrow: 1}}
                                      renderItem={renderMovieItem} />
                              </View>
                              <View style={{marginBottom: s(25)}}></View>
                          </>
                      }
            />
        </>
    )
}

/*function MovieListItem({ item }) {
    return <ListItem title={item.title} subtitle={<RelativeTime date={item.created} />} image={{ source: item.image.source, width: s(120), height: s(67.5) }} />;
}*/
