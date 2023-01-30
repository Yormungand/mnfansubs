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
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="fade"
            openDuration={500}
            closeDuration={350}
            onClose={()=>onClose()}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0,0,0,0.3)",
                },
                container: {
                    backgroundColor: "#2b2b2b",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                },
            }}
            height={300}
        >
            {children}
        </RBSheet>
    )

}
