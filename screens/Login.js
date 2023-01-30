import {useRef, useState} from "react";
import mutator from "../utils/mutator";
import fetcher from "../utils/fetcher";
import {setGlobalState, useGlobalState} from "../hooks/useGlobalState";
import {Text, TextInput, TouchableOpacity, View, StyleSheet, Image, ImageBackground} from "react-native";
import {urls} from "../Utils/urls";

const logo = require("../assets/logo-white.png")
const bg = require("../assets/images/animebg.jpg")
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginRequest, setLoginRequest] = useState("");

    const usernameRef = useRef();
    const passwordRef = useRef();

    const login = () => {
        mutator(`/api/core/signin`, {loginname: username, password: password})
            .then(({data, status}) => {
                // console.log(`${urls}/api/core/signin`, {loginname: username, password: password}, status)
                if (status === 200) {
                    fetcher(`/api/core/signedUser`)
                        .then((data)=> {
                            if (data.status === 200)
                                setGlobalState("currentUser", data.payload)
                        })
                    fetcher(`/api/core/csrf`)
                        .then((data) => {
                            if (data.status === 200)
                                setGlobalState("userToken", data.payload)
                        })
                    fetcher(`/api/movie/user/subscription/getExpired`)
                        .then((data) => {
                            if (data.status === 200)
                                console.log(data.payload)
                        })
                }
            })
    }

    return (
        <>
            <View style={style.container}>
                <ImageBackground
                    source={bg}
                    style={
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,.2)",
                            opacity: .15,
                            zIndex: 0
                        }
                    }
                />
                <Image
                    source={logo}
                    resizeMode="contain"
                    style={{width: 300, height: 50, marginBottom: 150}}/>
                <TextInput
                    placeholder={"Username"}
                    placeholderTextColor={"#999"}
                    style={style.formInput}
                    onChangeText={text => setUsername(text)}
                    returnKeyLabel={"next"}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    value={username}
                    onSubmitEditing={()=> {
                        passwordRef.current.focus()
                    }}
                    ref={usernameRef}
                />
                <TextInput
                    placeholder={"Password"}
                    placeholderTextColor={"#999"}
                    secureTextEntry
                    style={style.formInput}
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={()=>login()}
                    ref={passwordRef}
                />
                <TouchableOpacity
                    style={{
                        position: "relative",
                        borderRadius: 5,
                        marginTop: 30,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        width: 300,
                        zIndex: 2,
                        backgroundColor: "#161616"
                    }}
                    activeOpacity={.7}
                    onPress={() => login()}
                >
                    <Text style={{color: "#c1c1c1", fontSize: 18}}>Нэвтрэх</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#161616",
        zIndex: 1
    },
    formInput: {
        borderWidth: 1,
        borderColor: "#666",
        borderRadius: 5,
        marginTop: 15,
        paddingHorizontal: 20,
        height: 50,
        width: 300,
        color: "#fff",
        backgroundColor: "rgba(22,22,22,.8)"
    }
});
