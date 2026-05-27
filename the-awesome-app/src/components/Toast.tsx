// <Toast ref={toastRef}/>

// toastRef.current.show({title: "Success", text: "The product has been added"});
// toastRef.current.dismiss());

import { useImperativeHandle, useState, type Ref } from "react";
import './Toast.css'

type Message = {
    title: string;
    text: string;
}
export type ToastHandle = {

    show: (message: Message) => void;
    dismiss: () => void;
}

type ToastProps = {
    ref: Ref<ToastHandle>
}

function Toast(props: ToastProps){

    const {ref} = props;
    const [message, setMessage] = useState<Message>({title: "", text: ""});
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {

        return {
            show: (message) => {
                setMessage(message);
                setVisible(true);
                setTimeout(() => {
                    setVisible(false)
                }, 5000)
            },
            dismiss: () => {
                setVisible(false);
            }
        }

    })

    if(!visible){
        return null;
    }

    return (
        <div className="app-toast">
            <div className="app-toast__header">
                <h6 className="app-toast__title">{message.title}</h6>
            </div>
            <p className="app-toast__text">{message.text}</p>
            <button className="app-toast__dismiss" onClick={() => setVisible(false)}>Dismiss</button>
        </div>
    )
}

export default Toast;