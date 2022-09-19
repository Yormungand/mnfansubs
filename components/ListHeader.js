import s from "../utils/getRelativeSize";
import {Text, View} from "react-native";

export default function ListHeader({headerName}) {
    return (
        <>
            <View style={{marginTop: s(15), marginLeft: s(10)}}>
                <Text style={{color:"#fff", fontSize:s(16)}}>{headerName}</Text>
            </View>
        </>
    )
}
