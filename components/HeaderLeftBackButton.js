import {View} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";

export default function HeaderLeftBackButton() {
    return (
        <View style={{backgroundColor: "#3d3d3d"}}>
            <Ionicons name={"arrow-left"} size={30} color={"#fff"}/>
        </View>
    )
}
