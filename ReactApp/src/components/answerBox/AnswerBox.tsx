import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {Answer} from "../../models/Answer";

export interface AnswerOption {
    answer: Answer,
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
            onClick={ () => options.onClick() }
        >
            <CardHeader title={options.number}/>
            <CardContent>
                <Typography variant={"h6"} align={"center"}>{options.answer.answer} </Typography>
            </CardContent>
        </Card>
    );
}