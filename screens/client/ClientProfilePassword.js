import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import mutator from "../../Utils/mutator";
import {useGlobalState} from "../../hooks/useGlobalState";

export default function ClientProfilePassword({ navigation }) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);

    const [currentUser] = useGlobalState("currentUser");
    const [userToken] = useGlobalState("userToken");

    const [pwToken, setPwToken] = useState("");

    const submit = () => {
        const form = {
            currentPassword: currentPassword,
            password: newPassword,
            passwordConfirm: reNewPassword,
        }

        const params = new URLSearchParams(form).toString()

        mutator(`/api/core/profile/password?${params}`)
            .then(({status, payload})=>{
                if (status === 200) {
                    Alert.alert("Амжилттай", payload.text);
                } else {
                    Alert.alert(`Алдаа ${status}`, `Буруу байна.`)
                }
            })
    }

    return (
        <View style={style.container}>
            <View>
                <Text style={style.inputLabel}>Одоогийн нууц үг</Text>
                <View>
                    <TextInput
                        placeholder="Одоогийн нууц үг"
                        placeholderTextColor="#777"
                        style={[style.profileInput]}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        secureTextEntry={hideCurrentPassword}
                    />
                    <TouchableOpacity
                        style={style.eyeButton}
                        onPress={()=>setHideCurrentPassword(!hideCurrentPassword)}>
                        {
                            hideCurrentPassword ?
                                <Ionicons name="eye-off-sharp" color={"#fff"} size={20}/>
                                :
                                <Ionicons name="eye-sharp" color={"#fff"} size={20}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={style.inputLabel}>Шинэ нууц үг</Text>
                <View>
                    <TextInput
                        placeholder="Одоогийн нууц үг"
                        placeholderTextColor="#777"
                        style={[style.profileInput]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={hideNewPassword}
                    />
                    <TouchableOpacity
                        style={style.eyeButton}
                        onPress={()=>setHideNewPassword(!hideNewPassword)}>
                        {
                            hideNewPassword ?
                                <Ionicons name="eye-off-sharp" color={"#fff"} size={20}/>
                                :
                                <Ionicons name="eye-sharp" color={"#fff"} size={20}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={style.inputLabel}>Шинэ нууц үг давтах</Text>
                <View>
                    <TextInput
                        placeholder="Одоогийн нууц үг"
                        placeholderTextColor="#777"
                        style={[style.profileInput]}
                        value={reNewPassword}
                        onChangeText={setReNewPassword}
                        secureTextEntry={hideNewPassword}
                    />
                    <TouchableOpacity
                        style={style.eyeButton}
                        onPress={()=>setHideNewPassword(!hideNewPassword)}>
                        {
                            hideNewPassword ?
                                <Ionicons name="eye-off-sharp" color={"#fff"} size={20}/>
                                :
                                <Ionicons name="eye-sharp" color={"#fff"} size={20}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={style.clientButton}
                onPress={()=>submit()}
            >
                <Ionicons name="save-sharp" color={"#000"} size={20}/>
                <Text style={[style.clientButtonText, {marginLeft: 10}]}>Хадгалах</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 20,
        zIndex: 1
    },
    inputLabel: {
        marginBottom: 10,
        color: "#666"
    },
    profileInput: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: "#fff",
        backgroundColor: "#161616",
    },
    eyeButton: {
        position: "absolute",
        top: "10%",
        right: 0,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    clientButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#55acee"
    },
    clientButtonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    }
})
