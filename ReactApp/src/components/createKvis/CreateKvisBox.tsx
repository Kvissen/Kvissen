import React, {useState} from "react";
import {Card, Button, TextField, Grid, Box, Checkbox, CircularProgress} from "@mui/material";
import './CreateKvisStyleSheet.css'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import {Question} from "../../models/Question";
import {v4 as uuidv4} from 'uuid';
import {Answer} from "../../models/Answer";
import {Kvis} from "../../models/Kvis";
import {KvisRepository} from "../../data/repositories/KvisRepository";

export default function CreateKvisBox({kvis} : {kvis: Kvis}) {

    async function saveKvis() {
        setIsLoading(true)
        kvis.ts = new Date().getTime()
        kvis.questions = questions
        kvis.creator = uuidv4()
        console.log(kvis)
        await KvisRepository.getInstance().addKvis(kvis);
        setIsLoading(false)
    }

    function ShowDoneButton() {
        if (questions.length > 0) {
            return (
                <Box mt={2} mb={2} display="flex"
                     justifyContent="end"
                     alignItems="end">
                    <Button
                        className="add-new-question"
                        variant="contained"
                        startIcon={<CheckIcon/>}
                        onClick={async () => {
                            saveKvis();
                        }}
                    >
                        Save Kvis
                    </Button>
                </Box>
            )
        }
        return null;
    }

    function ShowQuestionName() {
        if (questions.length > 0) {
            return (
                <Box mt={2} mb={2} display="flex"
                     justifyContent="end"
                     alignItems="end">
                    <TextField
                        margin="normal"
                        required
                        label="Enter Kvis name"
                        fullWidth
                        autoFocus
                        onChange={(e) => {
                            kvis.name = e.target.value;
                        }}
                    />
                </Box>
            )
        }
        return null;
    }

    function addQuestion() {
        setQuestions(prevState => {
            return [...prevState, new Question(uuidv4(), createInitialAnswerArray())]
        })
    }

    function createInitialAnswerArray() : Answer[] {
        return [
            new Answer(),
            new Answer(),
            new Answer(),
            new Answer()
        ]
    }

    const [questions, setQuestions] = useState<Question[]>([new Question(uuidv4(), createInitialAnswerArray())]);
    const [isLoading, setIsLoading] = useState(false)


    return (
        <div>
            <ShowQuestionName/>
            {isLoading && <CircularProgress />}
            {
                questions.map((question, i) => {
                    return (
                        <Box key={question.id} mb={2} mt={2}>
                            <Card className="create-kvis-box">
                                <h2 className="create-kvis-question-header">Question {i + 1}</h2>
                                <TextField
                                    margin="normal"
                                    required
                                    label="Enter question"
                                    fullWidth
                                    onChange={(e) => {
                                        question.question = e.target.value;
                                    }}
                                />
                                <Grid direction='row' container spacing={1}>
                                    <Grid container item sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Enter Answer 1"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[0].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox onChange={(e) => {
                                            question.answers[0].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Enter Answer 2"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[1].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox onChange={(e) => {
                                            question.answers[1].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 3"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[2].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox onChange={(e) => {
                                            question.answers[2].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 4"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[3].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox onChange={(e) => {
                                            question.answers[3].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                </Grid>
                                <Box mt={4} mb={4} display="flex"
                                     justifyContent="center"
                                     alignItems="center">
                                    <Button
                                        className="add-new-question"
                                        variant="contained"
                                        startIcon={<AddIcon/>}
                                        onClick={() => {
                                            addQuestion();
                                        }}
                                    >
                                        Add another question
                                    </Button>
                                </Box>
                            </Card>
                        </Box>
                    )
                })
            }
            <ShowDoneButton/>
        </div>
    )
}