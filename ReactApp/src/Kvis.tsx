import React, {Component} from 'react';
import AnswerBox from './components/answerBox/AnswerBox'
import QuestionBox from "./QuestionBox";
import Grid from '@mui/material/Grid';
import {TextField} from "@mui/material";


export default class Kvis extends Component {

    render() {
        return (
            <Grid container direction={"row"} className={"quizbox"}>
                <Grid item xs={12} md={6}>
                    <QuestionBox />
                </Grid>
                <Grid item xs={12} md={6}>
                    <AnswerBox number={0} text={"example text"}/>
                </Grid>
            </Grid>

        );
    }
}