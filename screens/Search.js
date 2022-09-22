import MovieCard from "../components/MovieCard";
import {FlatList, SafeAreaView, ScrollView, View} from "react-native";
import ListHeader from "../components/ListHeader";
import s from "../utils/getRelativeSize";

export default function Search({ navigation }) {
    const renderMovieItem = ({ item }) => (
        <View style={{marginBottom: s(10)}}>
            <MovieCard item={item} navigation={navigation} />
        </View>
    )
    return (
        <>
            <FlatList data={[1]} renderItem={()=><></>}
                      ListFooterComponent={
                          <SafeAreaView>
                              <View>
                                  {/*<ListHeader headerName="Search"/>*/}
                                  <FlatList
                                      data={[ 1,2,3,4,5,6,7,8,9,10,11 ]}
                                      style={{ marginTop: 10, marginLeft: s(10) }}
                                      scrollEnabled={true}
                                      numColumns={3}
                                      // ListHeaderComponent={<View><Text>Home</Text></View>}
                                      // contentContainerStyle={{flexGrow: 1}}
                                      renderItem={renderMovieItem} />
                              </View>
                          </SafeAreaView>
                      }
            />
        </>
    )
}
