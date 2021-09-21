import React from "react";
import {Paper} from "@mui/material";

type AnswerOption = {
    text: string,
    number: number
}

export default function AnswerBox(options: AnswerOption)
{
    const mStyle = {
        backgroundColor: "grey",
        color: "blue"
    }

    return (
        <Paper style={mStyle} elevation={5} variant={"elevation"}>
            <h2>{options.number}</h2>
            <p>{options.text}</p>
        </Paper>
    );
}