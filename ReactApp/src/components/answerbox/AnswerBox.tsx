import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

type AnswerOption = {
    text: string,
    number: number
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
        >
            <CardHeader title={options.number}/>
            <CardContent>
                <Typography variant={"h6"} align={"center"}>{options.text}</Typography>
            </CardContent>
        </Card>
    );
}