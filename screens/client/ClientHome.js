import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useGlobalState} from "../../hooks/useGlobalState";
import ClientExpireDate from "../../components/ClientExpireDate";

export default function ClientHome({navigation}) {

    const [currentUser] = useGlobalState("currentUser")

    return (
        <>
            <View style={style.container}>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <View style={style.userIcon}>
                            <Ionicons name="person-outline" color={"#fff"} size={20}/>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={{fontSize: 14, color: "#fff"}}>
                                {currentUser.surname} {currentUser.givenname}
                            </Text>
                            <Text style={{fontSize: 12, color: "#666"}}>
                                {currentUser.role.description}
                            </Text>
                        </View>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Text style={{fontSize: 13, color: "#fff"}}>
                            {currentUser.id}
                        </Text>
                        <Text style={{fontSize: 11, color: "#666"}}>
                            iD
                        </Text>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Text style={{fontSize: 13, color: "#fff"}}>
                            {currentUser.balance}
                        </Text>
                        <Text style={{fontSize: 11, color: "#666"}}>
                            Хандив
                        </Text>
                    </View>
                    <View style={{justifyContent: "center"}}>
                        <Text style={{fontSize: 13, color: "#fff"}}>
                            <ClientExpireDate/>
                        </Text>
                        <Text style={{fontSize: 11, color: "#666"}}>
                            Хугацаа дуусах
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <TouchableOpacity style={style.clientButton} onPress={()=>navigation.navigate("ClientProfile")}>
                        <Ionicons name="person-sharp" color={"#fff"} size={20}/>
                        <Text style={{marginLeft: 10, color: "#fff", fontSize: 18}}>Миний профайл</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        zIndex: 1
    },
    userIcon: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        backgroundColor: "#161616",
    },
    clientButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#161616"
    }
})
