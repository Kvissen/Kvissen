import React, {Component} from 'react';
import Grid from '@mui/material/Grid';
import AnswerList from "../answerList/AnswerList";
import KwestjenBox from '../kwestjenBox/KwestjenBox';

export default class KvisBox extends Component {

    render() {
        return (
            <Grid container direction={"row"} className={"quizbox"}>
                <Grid item xs={12} md={6}>
                    <KwestjenBox number={0} question={"Is PAAS part of SCRUM?"} pictureURL={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnexiilabs.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F05%2FPaaS.png&f=1&nofb=1"}/>
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