import fetcher from "../Utils/fetcher";
import {setGlobalState, useGlobalState} from "../hooks/useGlobalState";
import {useEffect} from "react";
import {Text} from "react-native";

export default function ClientExpireDate() {

    const [isExpired] = useGlobalState("isExpired");
    const [expireDate] = useGlobalState("expireDate")
    function checkExpired() {
        fetcher(`/api/movie/user/subscription/checkExpired`)
            .then((data)=>{
                if (data.status === 200)
                    setGlobalState("isExpired", data.payload)
            })
        fetcher(`/api/movie/user/subscription/getExpired`)
            .then((data) => {
                if (data.status === 200) {
                    const date1 = new Date(data.payload * 1000)
                    setGlobalState("expireDate", date1);
                    // console.log("date1=-=-", date1);
                    // console.log("date1 ===" , "date2", date1, new Date())
                    // console.log("difference", (date1.getTime() - new Date().getTime()), (1000 * 3600 * 24), (date1.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                    const difference = (date1.getTime() - new Date().getTime());
                    const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
                    let result = `Дууссан`;
                    if (totalDays > 0)
                        result = `${totalDays} өдөр`;
                    setGlobalState("expireDate", result)
                    // console.log(result)
                }
            })
    }

    useEffect(() => {
        checkExpired();
        return () => {

        };
    }, []);

    return (
        <>
            {
                isExpired ?
                    <Text style={{fontSize: 13, color: "#d00004"}}>
                        Дууссан
                    </Text>
                    :
                    <Text style={{fontSize: 13, color: "#fff"}}>
                        {expireDate}
                    </Text>
            }
        </>
    )

}
