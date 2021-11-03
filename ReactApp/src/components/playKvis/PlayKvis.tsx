import {observer} from "mobx-react";
import {Kvis} from "../../models/Kvis";
import {v4 as uuidv4} from "uuid";
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";
import QuestionBox from "./QuestionBox";
import {Box, Grid} from "@mui/material";
import AnswerBox from "./AnswerBox";
import {useState} from "react";

export function PlayKvis() {

    const kvis =
        new Kvis(uuidv4(), "Test Kvis", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer correct", true),
            ], "Test question")
        ])

    // Replace with KvisStore to persist
    const [currentQuestion, setCurrentQuestion] = useState(0)

    function alertUser(isCorrect: boolean) {
        if (isCorrect) {
            alert("Correct")
        } else {
            alert("Incorrect")
        }
    }

    return (
        <div className={"main-container"}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <QuestionBox question={kvis.questions[currentQuestion]}/>
                <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                    {
                        kvis.questions[currentQuestion].answers.map((answer) => {
                            return (
                                <Grid item sm={6}>
                                    <AnswerBox answer={answer} onAnswerSelected={(isCorrect => {
                                        alertUser(isCorrect)
                                    })}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </div>
    )

}

const PlayKvisObserver = observer(PlayKvis)
export default PlayKvisObserver;
