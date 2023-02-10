import React, {useEffect, useRef, useState} from "react";
import mutator from "../Utils/mutator";
import fetcher from "../Utils/fetcher";
import {setGlobalState, useGlobalState} from "../hooks/useGlobalState";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Alert
} from "react-native";
import {urls} from "../Utils/urls";
import {Ionicons} from "@expo/vector-icons";

import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logo = require("../assets/logo-white.png")
const bg = require("../assets/images/animebg.jpg")
export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginRequest, setLoginRequest] = useState("");

    const [hidePassword, setHidePassword] = useState(true);

    const [localAuthType, setLocalAuthType] = useState("");
    const [useLocalAuth, setUseLocalAuth] = useState(false);

    const [biometricSupported, setBiometricSupported] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const login = () => {
        mutator(`/api/core/signin`, {loginname: username, password: password})
            .then(({data, status}) => {
                if (status === 200) {
                    AsyncStorage.setItem("rememberedLoginname", username).then()
                    AsyncStorage.setItem("asyncRemember", "true").then()
                    fetcher(`/api/core/signedUser`)
                        .then((data) => {
                            if (data.status === 200) {
                                setGlobalState("currentUser", data.payload)
                                console.log("CURRENT USER", data.payload)
                            }
                        })
                    fetcher(`/api/movie/user/subscription/checkExpired`)
                        .then((data)=>{
                            if (data.status === 200) {
                                console.log(`subscription status`, data.payload)
                            }
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
                } else {
                    Alert.alert(`Буруу`, `Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!`)
                }
            })
    }

    async function scanFingerPrint() {
        let message;
        if (localAuthType === "fingerprint") {
            message = "Хурууны хээгээ уншуулна уу."
        }
        let result = await LocalAuthentication.authenticateAsync({promptMessage: "Хурууны хээгээ уншуулна уу."})

        if (result.success) {
            if (loginRequest === "fingerprint") {

            }
        }
    }

    useEffect(() => {
        AsyncStorage.getItem("asyncRemember").then((asyncRemember)=>{
            if (asyncRemember) {
                setRememberMe(true);
            }
        })
        AsyncStorage.getItem("rememberedLoginname").then((rememberedLoginname)=>{
            setUsername(rememberedLoginname);
        })
    }, []);


    /**
     * todo Fingerprint
     */
    /*useEffect(() => {
        (async () => {
                const compatible = await LocalAuthentication.hasHardwareAsync();
                console.log(compatible)
                setBiometricSupported(compatible)
            }
        )();
    });*/


    /**
     * todo Fingerprint
     */
    /*useEffect(() => {
        scanFingerPrint()
        return () => {

        };
    }, [loginRequest]);*/


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
                    placeholder={"Нэвтрэх нэр"}
                    placeholderTextColor={"#999"}
                    style={style.formInput}
                    onChangeText={text => setUsername(text)}
                    returnKeyLabel={"next"}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    value={username}
                    onSubmitEditing={() => {
                        passwordRef.current.focus()
                    }}
                    ref={usernameRef}
                />
                <View>
                    <TextInput
                        placeholder={"Нууц үг"}
                        placeholderTextColor={"#999"}
                        style={style.formInput}
                        onChangeText={text => setPassword(text)}
                        onSubmitEditing={() => login()}
                        ref={passwordRef}
                        secureTextEntry={hidePassword}
                    />
                    <TouchableOpacity
                        style={style.eyeButton}
                        onPress={() => setHidePassword(!hidePassword)}
                    >
                        {
                            hidePassword ?
                                <Ionicons name="eye-off-sharp" color={"#fff"} size={20}/>
                                :
                                <Ionicons name="eye-sharp" color={"#fff"} size={20}/>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 15, width: 300}}>
                    <TouchableOpacity
                        activeOpacity={.5}
                        onPress={() => setRememberMe(!rememberMe)}
                        style={{flexDirection: "row", alignItems: "center"}}
                    >
                        {
                            rememberMe ?
                                <Ionicons name={"checkmark"} size={24} color={"#fff"}/>
                                :
                                <Ionicons name={"close"} size={24} color={"#fff"}/>
                        }
                        <Text style={{marginLeft: 10, color: "#fff", fontSize: 16}}>Нэвтрэх нэр сануулах</Text>
                    </TouchableOpacity>
                </View>
                {/*{todo Fingerprint
                    biometricSupported &&
                    <View style={{marginTop: 15, width: 300}}>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={() => setUseLocalAuth(!useLocalAuth)}
                            style={{flexDirection: "row", alignItems: "center"}}
                        >
                            {
                                useLocalAuth ?
                                    <Ionicons name={"checkmark"} size={24} color={"#fff"}/>
                                    :
                                    <Ionicons name={"close"} size={24} color={"#fff"}/>
                            }
                            <Text style={{marginLeft: 10, color: "#fff", fontSize: 16}}>Use finger</Text>
                        </TouchableOpacity>
                    </View>
                }*/}
                <TouchableOpacity
                    style={{
                        position: "relative",
                        borderRadius: 5,
                        marginTop: 15,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        width: 300,
                        zIndex: 2,
                        backgroundColor: "#161616"
                    }}
                    activeOpacity={.7}
                    onPress={() => {
                        login();
                        /*if (useLocalAuth)
                            setLoginRequest("localAuth")
                        else
                            setLoginRequest("normal")*/
                    }}
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
    },
    eyeButton: {
        position: "absolute",
        top: "30%",
        right: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: "rgba(22,22,22,.8)"
    }
});
