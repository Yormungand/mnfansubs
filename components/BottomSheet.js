import {useEffect, useRef} from "react";
import RBSheet from 'react-native-raw-bottom-sheet';
import s from "../utils/getRelativeSize";

export default function BottomSheet({ open, children, onClose, height, closeRequested }) {

    const refRBSheet = useRef();

    useEffect(()=>{
        if (closeRequested)
            refRBSheet.current.close();
    }, [closeRequested]);

    useEffect(()=>{
        if (open)
            refRBSheet.current.open();
        else
            refRBSheet.current.close();
    }, [open]);

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressBack={true}
            closeOnPressMask={true}
            animationType="fade"
            openDuration={350}
            closeDuration={350}
            onClose={()=>onClose()}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                },
                container: {
                    backgroundColor: "#2b2b2b",
                    borderTopLeftRadius: s(10),
                    borderTopRightRadius: s(10)
                },
            }}
            height={s(220)}
        >
            {children}
        </RBSheet>
    )

}
