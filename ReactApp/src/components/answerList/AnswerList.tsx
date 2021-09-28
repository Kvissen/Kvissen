import React from "react";
import AnswerBox from "../answerBox/AnswerBox";
import {Stack} from "@mui/material";

interface ListElement {
    text: string,
    correct: boolean
}

interface ListOfAnswers {
    answerOptions: Array<ListElement>,
    onCorrect: () => void,
    onWrong: () => void
}

class AnswerList extends React.Component<ListOfAnswers>
{
    render()
    {
        return (
            <Stack
                direction={"column"}
                justifyContent={"space-evenly"}
                alignItems={"stretch"}
                spacing={2}
            >
                { this.props.answerOptions.map( (option: ListElement, index: number) => this.createAnswerOption(index, option) ) }
            </Stack>
        );
    }

    createAnswerOption(num: number, option: ListElement)
    {
        return (
            <AnswerBox text={option.text} number={num}
                       onClick={
                           option.correct ?
                               () => this.correctClick() : () => this.wrongClick()
                       }/>
        );
    }

    wrongClick()
    { this.props.onWrong(); }

    correctClick()
    { this.props.onCorrect(); }
}

export default AnswerList;