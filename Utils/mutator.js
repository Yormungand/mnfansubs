import {urls} from "./urls";
import {setGlobalState} from "../hooks/useGlobalState";

const mutator = (path, data) => {
    let status = 500;

    return (
        fetch(`${urls}${path}`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : "",
        })
            .then(res => {
                status = res.status;
                if (res.ok) {
                    if (res.status === 204)
                        return null;
                    else if (res.status === 401) {
                        setGlobalState("currentUser", null);
                        setGlobalState("userToken", null);
                    }
                    return res.json();
                } else
                    return res.json();
            })
            .then(jsonData=>{
                // console.log(`${urls}${path}`, status, jsonData)
                if (jsonData !== undefined)
                    return {status: status, payload: jsonData}
            })
            .catch(err=>{
                return {status: status};
            })
    )
}

export default mutator;
