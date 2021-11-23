import React, {useState} from "react";
import {Card, Button, TextField, Grid, Box, Checkbox, CircularProgress} from "@mui/material";
import './CreateKvisStyleSheet.css'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";
import {Kvis} from "../../models/Kvis";
import {KvisRepository} from "../../data/repositories/KvisRepository";
import {parseJwt} from "../../util/Util";
import {useHistory} from "react-router-dom";

export default function CreateKvisBox() {

    const [kvis, setKvis] = useState<Kvis>(new Kvis("","","",0, [new Question(createInitialAnswerArray())]))
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    async function saveKvis() {
        setIsLoading(true)
        kvis.ts = new Date().getTime()
        kvis.creator = parseJwt(localStorage.getItem("access_token")!)["user-id"] as string
        console.log("Adding kvis")
        let url = await KvisRepository.getInstance().addKvis(kvis);
        setIsLoading(false)
        if(url){
            alert("Kvis created");
            history.goBack();
        } else {
            alert("Could not add kvis");
        }
    }

    function ShowDoneButton() {
        if (kvis.questions.length > 0) {
            return (
                <Box mt={2} mb={2} display="flex"
                     justifyContent="end"
                     alignItems="end">
                    <Button
                        className="add-new-question"
                        data-testid="createkvisbox-test-done"
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

    function addQuestion() {
        let newName = kvis.name
        let newQuestions = kvis.questions
        newQuestions.push(new Question(createInitialAnswerArray()))
        setKvis({...kvis, name: newName, questions: newQuestions})
    }

    function createInitialAnswerArray() : Answer[] {
        return [
            new Answer(),
            new Answer(),
            new Answer(),
            new Answer()
        ]
    }

    return (
        <div >
            <Box mt={2} mb={2} display="flex"
                 justifyContent="end"
                 alignItems="end">
                <TextField
                    margin="normal"
                    required
                    data-testid="createkvisbox-test-kvisname"
                    label="Enter Kvis name"
                    fullWidth
                    onChange={(e) => {
                        kvis.name = e.target.value;
                    }}
                />
            </Box>
            {isLoading && <CircularProgress />}
            {
                kvis.questions.map((question, i) => {
                    return (
                        <Box key={i} mb={2} mt={2} data-testid="createkvisbox-test-container">
                            <Card className="create-kvis-box">
                                <h2 className="create-kvis-question-header">Question {i + 1}</h2>
                                <TextField
                                    margin="normal"
                                    required
                                    label="Enter question"
                                    data-testid="createkvisbox-test-question"
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
                                            data-testid="createkvisbox-test-answer"
                                            label="Enter Answer 1"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[0].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox
                                            data-testid="createkvisbox-test-checkbox"
                                            onChange={(e) => {
                                            question.answers[0].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            margin="normal"
                                            required
                                            data-testid="createkvisbox-test-answer"
                                            label="Enter Answer 2"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[1].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox
                                            data-testid="createkvisbox-test-checkbox"
                                            onChange={(e) => {
                                            question.answers[1].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 3"
                                            data-testid="createkvisbox-test-answer"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[2].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox
                                            data-testid="createkvisbox-test-checkbox"
                                            onChange={(e) => {
                                            question.answers[2].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                    <Grid container item sm={6}>
                                        <TextField
                                            required
                                            label="Enter Answer 4"
                                            data-testid="createkvisbox-test-answer"
                                            fullWidth
                                            onChange={(e) => {
                                                question.answers[3].answer = e.target.value
                                            }}
                                        />
                                        <p>Correct</p>
                                        <Checkbox
                                            data-testid="createkvisbox-test-checkbox"
                                            onChange={(e) => {
                                            question.answers[3].isCorrect = e.target.checked
                                        }}/>
                                    </Grid>
                                </Grid>
                                <Box mt={4} mb={4} display="flex"
                                     justifyContent="center"
                                     alignItems="center">
                                    <Button
                                        data-testid="createkvisbox-test-addquestion"
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