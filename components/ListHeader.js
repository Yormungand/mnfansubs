import s from "../Utils/getRelativeSize";
import {Text, View} from "react-native";

export default function ListHeader({headerName}) {
    return (
        <>
            <View style={{
                marginTop: 10,
                marginBottom: 5,
                paddingHorizontal: 10,
            }}>
                <Text
                    style={{
                        color: "#bcbcbc",
                        fontSize: 20,
                        fontWeight: "bold",
                    }}>
                    {headerName}
                </Text>
            </View>
        </>
    )
}
