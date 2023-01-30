import {Dimensions} from "react-native";

const screenWidth = Dimensions.get("window").width;
export const designWidth = 375;

export default function getRelativeSize(rawSize){
    return Math.round((screenWidth / designWidth) * rawSize)
}
