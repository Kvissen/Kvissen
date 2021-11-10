import QuestionBox from "./QuestionBox";
import {Box, Grid} from "@mui/material";
import AnswerBox from "./AnswerBox";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {store} from "../../stores/QuizStore";
import {observer} from "mobx-react";

function PlayKvis() {
    const kvis = store.currentKvis
    const history = useHistory();

    // Replace with KvisStore to persist
    const [currentQuestion, setCurrentQuestion] = useState(0);

    function alertUser(isCorrect: boolean) {
        // if (isCorrect) {
        //     alert("Correct")
        // } else {
        //     alert("Incorrect")
        // }
    }

    function nextQuestion() {
        if (currentQuestion < kvis.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            history.replace("/summary-kvis")
        }
    }

    return (
        <div className={"main-container"}>
            <Box>
                <QuestionBox question={kvis.questions[currentQuestion]}/>
                <Box position={"absolute"} bottom={40} right={10} left={10}>
                    <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                        {
                            kvis.questions[currentQuestion].answers.map((answer) => {
                                return (
                                    <Grid item sm={6}>
                                        <AnswerBox answer={answer} onAnswerSelected={(isCorrect => {
                                            store.addResult(isCorrect)
                                            alertUser(isCorrect);
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
