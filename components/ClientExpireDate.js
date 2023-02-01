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
                    const difference = (date1.getTime() - new Date().getTime());
                    const totalDays = Math.ceil(difference / (1000 * 3600 * 24))
                    let result = `Дууссан`;
                    if (totalDays > 0)
                        result = `${totalDays} өдөр`;
                    // console.log(result);
                    setGlobalState("expireDate", result);
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
