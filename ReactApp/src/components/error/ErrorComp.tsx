// Erlend
import React from "react";

type MyComponentProps = { title: string, message: string };

export default function ErrorComp(props: MyComponentProps) {
    if (props.title === null || props.message === null) {
        return <h1>Something went wrong.</h1>
    } else {
        return <div><h1>{props.title}</h1><p>{props.message}</p></div>
    }
}