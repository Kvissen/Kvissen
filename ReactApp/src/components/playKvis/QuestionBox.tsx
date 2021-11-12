import {Question} from "../../models/Question";
import {Box, Card} from "@mui/material";

export default function QuestionBox({question}: { question: Question }) {

    return (
        <Box>
            <Card data-testid="questionbox-test-card"
                sx={{padding: 1}}>
                <h2 data-testid="questionbox-test-h2">{question.question}</h2>
            </Card>
        </Box>
    )
}
