import {createGlobalState} from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    currentUser: null,
    userToken: null,
    expireDate: null,
    isExpired: null,
})

export {setGlobalState, useGlobalState}
