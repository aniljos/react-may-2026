// type for the props(class/interface/type)

type MessageProps = {
    text: string;
    color?: string
}

function Message(props: MessageProps){

    console.log("Message props", props);

    return (
        <div>
            <h4 style={{color: props.color}} >{props.text}</h4>
            <p>This is a functional component</p>
            <p> Generated at:  {new Date().toLocaleString()} </p>
        </div>
    )
}

export default Message;