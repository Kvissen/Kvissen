import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

export interface AnswerOption {
    text: string,
    number: number,
    onClick: () => void
}

/**
 *
 *
 * @param options
 * @constructor
 */
export default function AnswerBox(options: AnswerOption)
{
    return (
        <Card
            sx={{
                backgroundColor: "lightgray",
                color: "black",
            }}
            raised={true}
            onClick={() => options.onClick()}
        >
            <CardHeader title={options.number}/>
            <CardContent>
                <Typography variant={"h6"} align={"center"}>{options.text}</Typography>
            </CardContent>
        </Card>
    );
}