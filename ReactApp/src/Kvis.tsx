import React, {Component} from 'react';
import QuestionBox from "./QuestionBox";
import Grid from '@mui/material/Grid';
import {TextField} from "@mui/material";
import AnswerList from "./components/answerList/AnswerList";

export default class Kvis extends Component {

    render() {
        return (
            <Grid container direction={"row"} className={"quizbox"}>
                <Grid item xs={12} md={6}>
                    <QuestionBox />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AnswerList answerOptions={
                        [
                            {text: "yes", correct: false},
                            {text: "no", correct: false},
                            {text: "both no and yes", correct: true}
                        ]
                    }
                                onCorrect={()=>console.log("true dat")}
                                onWrong={()=>console.log("false dat")}
                    />

                </Grid>
            </Grid>

        );
    }
}