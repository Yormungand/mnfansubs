import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "react-native-webview/lib/WebView.styles";
import React, {useEffect, useState} from "react";
import {useGlobalState} from "../../hooks/useGlobalState";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";

export default function ClientProfile({navigation}) {

    const [currentUser] = useGlobalState("currentUser");

    const [loginname, setLoginname] = useState();
    const [surname, setSurname] = useState();
    const [givenname, setGivenname] = useState();
    const [gender, setGender] = useState();
    const [birthDate, setBirthDate] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const [date, setDate] = useState(new Date());

    const [dateShow, setDateShow] = useState(false);

    useEffect(() => {
        setLoginname(currentUser.loginname);
        setSurname(currentUser.surname);
        setGivenname(currentUser.givenname);
        setGender(currentUser.gender);
        setBirthDate(currentUser.birthDate);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
    }, []);

    useEffect(() => {
        navigation.addListener("focus", e=>{
            setLoginname(currentUser.loginname);
            setSurname(currentUser.surname);
            setGivenname(currentUser.givenname);
            setGender(currentUser.gender);
            setBirthDate(currentUser.birthDate);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
        });
        navigation.addListener("blur", e=>{
            setLoginname(currentUser.loginname);
            setSurname(currentUser.surname);
            setGivenname(currentUser.givenname);
            setGender(currentUser.gender);
            setBirthDate(currentUser.birthDate);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
        });
        return () => {
            navigation.addListener("focus", e=>{
                setLoginname(currentUser.loginname);
                setSurname(currentUser.surname);
                setGivenname(currentUser.givenname);
                setGender(currentUser.gender);
                setBirthDate(currentUser.birthDate);
                setEmail(currentUser.email);
                setPhone(currentUser.phone);
            });
            navigation.addListener("blur", e=>{
                setLoginname(currentUser.loginname);
                setSurname(currentUser.surname);
                setGivenname(currentUser.givenname);
                setGender(currentUser.gender);
                setBirthDate(currentUser.birthDate);
                setEmail(currentUser.email);
                setPhone(currentUser.phone);
            });
        }
    }, [navigation]);


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setDateShow(false);
        console.log(dayjs(currentDate).format("YYYY-MM-DD"))
        setBirthDate(dayjs(currentDate).format("YYYY-MM-DD"))
    };


    return (
        <View style={style.container}>
            <View>
                <Text style={style.inputLabel}>Нэвтрэх нэр</Text>
                <TextInput
                    placeholder="Нэвтрэх нэр"
                    placeholderTextColor="#777"
                    style={[style.profileInput]}
                    value={loginname}
                    editable={false}
                />
            </View>
            <View style={style.inputWrapper}>
                <View style={[{width: "47%"}]}>
                    <Text style={style.inputLabel}>Овог</Text>
                    <TextInput
                        placeholder="Овог"
                        placeholderTextColor="#777"
                        value={surname}
                        style={style.profileInput}
                        editable={false}
                    />
                </View>
                <View style={[{width: "47%"}]}>
                    <Text style={style.inputLabel}>Өөрийн нэр</Text>
                    <TextInput
                        placeholder="Өөрийн нэр"
                        placeholderTextColor="#777"
                        style={style.profileInput}
                        value={givenname}
                        editable={false}
                    />
                </View>
            </View>
            <View>
                <Text style={style.inputLabel}>Хүйс</Text>
                {/*<TextInput
                    placeholder="Хүйс"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={gender}
                    editable={false}
                />*/}
                {gender === "FEMALE" && <Text style={style.profileInput}>Эмэгтэй</Text>}
                {gender === "MALE" && <Text style={style.profileInput}>Эрэгтэй</Text>}
                {gender === "OTHER" && <Text style={style.profileInput}>Бусад</Text>}
            </View>
            <View>
                <Text style={style.inputLabel}>Төрсөн өдөр</Text>

                <TextInput
                    placeholder="Төрсөн өдөр"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={birthDate}
                    editable={false}
                />
            </View>
            <View>
                <Text style={style.inputLabel}>И-мэйл</Text>
                <TextInput
                    placeholder="И-мэйл"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={email}
                    editable={false}
                />
            </View>
            <View>
                <Text style={style.inputLabel}>Утас</Text>
                <TextInput
                    placeholder="Гар утас"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={phone}
                    editable={false}
                />
            </View>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    marginTop: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    backgroundColor: "#55acee"
                }}
                onPress={()=>navigation.navigate("ClientProfileEdit")}
            >
                <Ionicons name="settings-sharp" color={"#000"} size={20}/>
                <Text style={{marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 16}}>Мэдээлэл засах</Text>
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
    profileInput: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        color: "#999",
        backgroundColor: "#161616",
    },
    inputWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputLabel: {
        marginBottom: 5,
        color: "#666"
    }
})
