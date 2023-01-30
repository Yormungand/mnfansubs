import s from "../Utils/getRelativeSize";
import {Text, View} from "react-native";

export default function ListHeader({headerName}) {
    return (
        <>
            <View style={{marginTop: 15, marginLeft: 10}}>
                <Text style={{color:"#fff", fontSize: 16}}>{headerName}</Text>
            </View>
        </>
    )
}
