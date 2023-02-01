import {urls} from "./urls";
import {setGlobalState} from "../hooks/useGlobalState";

const fetcher = (path) => {
    let status = 500;
    return fetch(`${urls}${path}`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            status = res.status;
            // console.log("payload: ", res.json())
            if (res.status === 401) {
                setGlobalState("currentUser", null);
                setGlobalState("userToken", null);
            }
            if (res.ok) {
                if (res.status === 204) {
                    return null;
                }
                return res.json();
            } else {
                return res.json()
                throw new Error(res.json())
            }

            // throw res;
        })
        .then(function (jsonData) {
            if (jsonData !== undefined) {
                return {status: status, payload: jsonData};
            }
        })
        .catch((error) => {
            return {status: status, payload: JSON.stringify(error)};
        });
};
export default fetcher;
