import React, {Component, useState} from "react";
import {Card, Button, TextField, Grid, Box} from "@mui/material";
import './CreateKvisStyleSheet.css'
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {IQuiz} from "../../stores/QuizStore";
import {store} from "../../stores/QuizStore";
import {Kvis} from "../../models/Kvis";
import {Question} from "../../models/Question";
import { v4 as uuidv4 } from 'uuid';

// @ts-ignore
export default function CreateKvisBox({kvis}) {

    function saveKvis() {
        console.log(questions)
    }

    function ShowDoneButton() {
        if (questions.length>0){
            return(
                <Box mt={2} mb={2} display="flex"
                     justifyContent="end"
                     alignItems="end">
                <Button
                    className="add-new-question"
                    variant="contained"
                    startIcon={<SaveIcon/>}
                    onClick={() => {
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

    function addQuestion() {
        setQuestions(prevState => {
            return [...prevState, new Question(uuidv4(), "", [])]
        })
    }

    const [questions, setQuestions] = useState<Question[]>([new Question(uuidv4(), "", [])])

    return (
        <div>
            {
                questions.map((question, i) => {
                    return (
                        <Box key={question.id} mb={2} mt={2}>
                            <Card className="create-kvis-box">
                                <h2 className="create-kvis-question-header">Question {i+1}</h2>
                                <TextField
                                    margin="normal"
                                    required
                                    label="Enter question"
                                    fullWidth
                                    autoFocus
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
                                                question.answers[0] = e.target.value
                                            }}
                                        />
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            label="Enter Answer 2"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[1] = e.target.value
                                            }}
                                        />
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 3"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[2] = e.target.value
                                            }}
                                        />
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 4"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[3] = e.target.value
                                            }}
                                        />
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