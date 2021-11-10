import QuestionBox from "./QuestionBox";
import {Box, Grid} from "@mui/material";
import AnswerBox from "./AnswerBox";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {store} from "../../stores/QuizStore";
import {observer} from "mobx-react";

function PlayKvis() {
    const history = useHistory();

    function nextQuestion() {
        if (store.questionIndex < store.currentKvis.questions.length - 1) {
            store.incrementCurrentQuestion()
        } else {
            history.replace("/summary-kvis")
        }
    }

    return (
        <div className={"main-container"}>
            <Box>
                <QuestionBox question={store.currentKvis.questions[store.questionIndex]}/>
                <Box position={"absolute"} bottom={40} right={10} left={10}>
                    <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                        {
                            store.currentKvis.questions[store.questionIndex].answers.map((answer) => {
                                return (
                                    <Grid item sm={6}>
                                        <AnswerBox answer={answer} onAnswerSelected={(isCorrect => {
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
