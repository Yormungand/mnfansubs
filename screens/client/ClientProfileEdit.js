import {Button, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "react-native-webview/lib/WebView.styles";
import React, {useEffect, useState} from "react";
import {useGlobalState} from "../../hooks/useGlobalState";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";

export default function ClientProfileEdit() {

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
        return () => {

        };
    }, []);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setDateShow(false);
        setDate(selectedDate)
        console.log(dayjs(currentDate).format("YYYY-MM-DD"))
        setBirthDate(dayjs(currentDate).format("YYYY-MM-DD"))
    };


    return (
        <View style={style.container}>
            {
                dateShow && (
                    <DateTimePicker
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1,
                            backgroundColor: '#f9f9f9',
                            elevation: 15,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 10},
                            shadowOpacity: 0.4,
                            shadowRadius: 10,
                        }}
                        value={date}
                        mode={'date'}
                        is24hour={true}
                        display="default"
                        onChange={onDateChange}
                    />
                )
            }
            <View>
                <Text style={style.inputLabel}>Нэвтрэх нэр</Text>
                <TextInput
                    placeholder="Нэвтрэх нэр"
                    placeholderTextColor="#777"
                    style={[style.profileInput]}
                    value={loginname}
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
                    />
                </View>
                <View style={[{width: "47%"}]}>
                    <Text style={style.inputLabel}>Өөрийн нэр</Text>
                    <TextInput
                        placeholder="Өөрийн нэр"
                        placeholderTextColor="#777"
                        style={style.profileInput}
                        value={givenname}
                    />
                </View>
            </View>
            <View>
                <Text style={style.inputLabel}>Хүйс</Text>
                <TextInput
                    placeholder="Хүйс"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={gender}
                />
            </View>
            <View>
                <Text style={style.inputLabel}>Төрсөн өдөр</Text>
                {
                    Platform.OS === "android" ?
                        <TouchableOpacity
                            onPress={()=>setDateShow(true)}
                            style={[style.profileInput, {flex: 1, alignItems: "flex-start", justifyContent: "center",}]}>
                            <Text style={{color: "#fff"}}>{birthDate ? birthDate : "Төрсөн өдөр"}</Text>
                        </TouchableOpacity>
                        :
                        <DateTimePicker
                            style={{
                                marginBottom: 15,
                                zIndex: 1,
                                backgroundColor: '#666',
                                elevation: 15,
                                shadowColor: '#000',
                                shadowOffset: {width: 0, height: 10},
                                shadowOpacity: 0.4,
                                shadowRadius: 10,
                            }}
                            value={date}
                            testID="dateTimePicker"
                            mode={'date'}
                            is24hour={true}
                            display="compact"
                            onChange={onDateChange}
                            locale="mn-MN"
                            fontSize={10}
                        />
                }
            </View>
            <View>
                <Text style={style.inputLabel}>Төрсөн өдөр</Text>
                <TextInput
                    placeholder="И-мэйл"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={email}
                />
            </View>
            <View>
                <Text style={style.inputLabel}>Төрсөн өдөр</Text>
                <TextInput
                    placeholder="Гар утас"
                    placeholderTextColor={"#777"}
                    style={style.profileInput}
                    value={phone}
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
            >
                <Ionicons name="save-sharp" color={"#000"} size={20}/>
                <Text style={{marginLeft: 10, color: "#000", fontWeight: "bold", fontSize: 16}}>Хадгалах</Text>
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
        color: "#fff",
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
