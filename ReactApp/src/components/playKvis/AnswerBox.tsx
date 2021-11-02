import {Answer} from "../../models/Answer";
import {Box, Card} from "@mui/material";

export default function AnswerBox(
    {answer, onAnswerSelected} : {answer: Answer, onAnswerSelected: (isCorrect : boolean) => (void)}
){

    return (
        <Box>
            <Card onClick={() => {
                onAnswerSelected(answer.isCorrect)
            }}>
                <h4>{answer.answer}</h4>
            </Card>
        </Box>
    )

}