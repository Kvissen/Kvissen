import {Answer} from "../../models/Answer";
import {Box, Card} from "@mui/material";

export default function AnswerBox(
    {answer, onAnswerSelected} : {answer: Answer, onAnswerSelected: (isCorrect : boolean) => (void)}
){

    return (
        <Box>
            <Card
                data-testid="answerbox-test-card"
                onClick={() => {
                onAnswerSelected(answer.isCorrect)
            }} sx={{padding: 1, cursor: "pointer"}}>
                <h4 data-testid="answerbox-test-h4">{answer.answer}</h4>
            </Card>
        </Box>
    )

}