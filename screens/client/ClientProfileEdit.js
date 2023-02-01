import {
    ActionSheetIOS, Alert,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import styles from "react-native-webview/lib/WebView.styles";
import React, {useEffect, useState} from "react";
import {setGlobalState, useGlobalState} from "../../hooks/useGlobalState";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import {Ionicons} from "@expo/vector-icons";
import mutator from "../../Utils/mutator";
import {Picker} from "@react-native-picker/picker";
import fetcher from "../../Utils/fetcher";
// import {stat} from "@babel/core/lib/gensync-utils/fs";
// import { Picker } from '@react-native-p'

export default function ClientProfileEdit({ navigation }) {

    const [currentUser] = useGlobalState("currentUser");

    const [loginname, setLoginname] = useState("");
    const [surname, setSurname] = useState("");
    const [givenname, setGivenname] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [date, setDate] = useState(new Date());

    const [dateShow, setDateShow] = useState(false);

    const [genders, setGenders] = useState([
        {value: "", label: "Хүйс сонгох"},
        {value: "MALE", label: "Эрэгтэй"},
        {value: "FEMALE", label: "Эмэгтэй"},
        {value: "OTHER", label: "Бусад"}]);

    const [gendersIos, setGendersIos] = useState([
        {value: "MALE", label: "Эрэгтэй"},
        {value: "FEMALE", label: "Эмэгтэй"},
        {value: "OTHER", label: "Бусад"}]);


    const [selGender, setSelGender] = useState();

    const submitProfile = () => {

        let params = `?givenname=${givenname}`;
        params+=`&surname=${surname}`;
        if (gender)
            params += `&gender=${gender}`;
        if (phone)
            params += `&phone=${phone}`;
        if (birthDate)
            params += `&birthDate=${birthDate}`;
        params += `&email=${email}`;
        console.log(params);
        mutator(`/api/core/profile/edit${params}`)
            .then((data, status)=>{
                console.log(status)
                if (data.status === 200) {
                    fetcher(`/api/core/signedUser`)
                        .then((res)=> {
                            if (res.status === 200) {
                                setGlobalState("currentUser", res.payload)
                                console.log(res.payload)
                                navigation.goBack()
                            }
                        })
                } else {
                    Alert.alert(`Error ${data.status}`, "Мэдээлэл засахад алдаа гарлаа")
                }
            });
    }

    const showGenderSheet = () => {
        if (gendersIos.length >= 1) {
            let sheetGenders = [];
            sheetGenders.push("Cancel");
            gendersIos.map(el => {
                sheetGenders.push(el.label);
            });
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: sheetGenders,
                    cancelButtonIndex: 0,
                    userInterfaceStyle: "dark",
                },
                buttonIndex => {
                    if (buttonIndex === 0) {

                    } else {
                        setGender(genders[buttonIndex -1].value);
                    }
                }
            )
        }
    }

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
            <ScrollView style={{marginBottom: 40}}>
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
                            onChangeText={setSurname}
                        />
                    </View>
                    <View style={[{width: "47%"}]}>
                        <Text style={style.inputLabel}>Өөрийн нэр</Text>
                        <TextInput
                            placeholder="Өөрийн нэр"
                            placeholderTextColor="#777"
                            style={style.profileInput}
                            value={givenname}
                            onChangeText={setGivenname}
                        />
                    </View>
                </View>
                {
                    Platform.OS === "android" ?
                        <PickerField label="Хүйс" value={gender} options={genders} onChange={(value)=>setGender(value)}/>
                        :
                        <TouchableOpacity
                            style={{
                                marginTop: 5,
                                marginBottom: 15,
                                flexDirection: "row",
                                borderRadius: 5,
                                paddingVertical: 7,
                                paddingHorizontal: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                backgroundColor: "#224A9F",
                            }}
                            onPress={showGenderSheet}>
                            {
                                gender ?
                                    <>
                                        {gender === "FEMALE" && <Text style={{color: "#fff", fontSize: 16}}>Эмэгтэй</Text>}
                                        {gender === "MALE" && <Text style={{color: "#fff", fontSize: 16}}>Эрэгтэй</Text>}
                                        {gender === "OTHER" && <Text style={{color: "#fff", fontSize: 16}}>Бусад</Text>}
                                    </>
                                    :
                                    <>
                                        <Text style={{color: "#fff", fontSize: 16}}>Хүйс сонгох</Text>
                                    </>
                            }
                        </TouchableOpacity>
                }

                <View style={{marginBottom: 15}}>
                    <Text style={style.inputLabel}>Төрсөн өдөр</Text>
                    {
                        Platform.OS === "android" ?
                            <TouchableOpacity
                                onPress={()=>setDateShow(true)}
                                style={[style.profileInput, {alignItems: "flex-start", justifyContent: "center",}]}>
                                <Text style={{color: "#fff", fontSize: 14}}>{birthDate ? birthDate : "Төрсөн өдөр"}</Text>
                            </TouchableOpacity>
                            :
                            <DateTimePicker
                                style={{
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
                            />
                    }
                </View>
                <View>
                    <Text style={style.inputLabel}>И-мэйл</Text>
                    <TextInput
                        placeholder="И-мэйл"
                        placeholderTextColor={"#777"}
                        style={style.profileInput}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View>
                    <Text style={style.inputLabel}>Утас</Text>
                    <TextInput
                        placeholder="Гар утас"
                        placeholderTextColor={"#777"}
                        style={style.profileInput}
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                <TouchableOpacity
                    style={style.clientButton}
                    onPress={()=>submitProfile()}
                >
                    <Ionicons name="save-sharp" color={"#000"} size={20}/>
                    <Text style={[style.clientButtonText,{marginLeft: 10}]}>Хадгалах</Text>
                </TouchableOpacity>
            </ScrollView>
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

function PickerField({label, options, value, onChange}) {
    return (
        <View>
            <Text style={style.inputLabel}>{label}</Text>
            <View style={[style.profileInput, {height: 50, justifyContent: "center", overflow: "hidden"}]}>
                <Picker
                    selectedValue={value}
                    dropdownIconColor={"#fff"}
                    style={{ height: 40, flex: 1, backgroundColor: "#161616"}}
                    itemStyle={{ color: "#fff", fontSize: 36, backgroundColor: "#161616"}}
                    onValueChange={(itemValue) => onChange(itemValue)}
                >
                    {options.map((option)=>(
                        <Picker.Item color={"#fff"} style={{color: "#fff", backgroundColor:"#161616"}} key={option.value} label={option.label} value={option.value}/>
                    ))}
                </Picker>
            </View>
        </View>
    )
}
