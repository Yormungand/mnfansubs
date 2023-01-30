import {urls} from "../Utils/urls";
import {setGlobalState} from "../hooks/useGlobalState";

const fetcher = (path) => {
    let status = 500;
    return fetch(`${urls}${path}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Accept-Encoding": "gzip, deflate, br"
        },})
        .then((res) => {
            status = res.status;
            if (res.ok) {
                if (res.status === 204) {
                    return null;
                } else if (res.status === 401){
                    setGlobalState("currentUser", null);
                    setGlobalState("userToken", null);
                }
                return res.json();
            }
            throw new Error(res.status);
        })
        .then(function (jsonData) {
            if (jsonData !== undefined) {
                return { status: status, payload: jsonData };
            }
        })
        .catch((error) => {
            return { status: status };
        });
};
export default fetcher;
