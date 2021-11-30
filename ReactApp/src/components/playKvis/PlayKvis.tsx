import QuestionBox from "./QuestionBox";
import {Box, CircularProgress, Grid} from "@mui/material";
import AnswerBox from "./AnswerBox";
import {useHistory} from "react-router-dom";
import {store} from "../../stores/KvisStore";
import {observer} from "mobx-react";
import {v4 as uuidv4} from "uuid";
import React from "react";

function PlayKvis() {
    const history = useHistory();

    function nextQuestion() {
        if (store.questionIndex < store.currentKvis.questions.length - 1) {
            store.incrementCurrentQuestion()
        } else {
            // Move the Kvis to completed
            store.setKvisCompleted()
            history.replace("/summary-kvis")
        }
    }

    return (
        <div className={"main-container"}>

            {(store.currentKvis === null || store.currentKvis.uuid === "0") ?
                <CircularProgress/> : null}

            <Box data-testid="playkvis-test-container">

                <QuestionBox question={store.currentKvis.questions[store.questionIndex]}/>

                <Box position={"absolute"} bottom={40} right={10} left={10}>
                    <Grid direction='row' container spacing={4} justifyContent={"space-between"}
                          alignItems={"center"}>
                        {
                            store.currentKvis.questions[store.questionIndex].answers.map((answer) => {
                                return (
                                    <Grid data-testid="playkvis-test-answerbox" key={uuidv4()} item sm={6}>
                                        <AnswerBox
                                            answer={answer} onAnswerSelected={(isCorrect => {
                                            store.addResult(isCorrect)
                                            nextQuestion();
                                        })}/>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}

const PlayKvisObserver = observer(PlayKvis)
export default PlayKvisObserver;