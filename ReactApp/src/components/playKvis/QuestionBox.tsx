import {Question} from "../../models/Question";
import {Box, Card} from "@mui/material";

export default function QuestionBox({question}: { question: Question }) {

    return (
        <Box>
            <Card>
                <h2>{question.question}</h2>
            </Card>
        </Box>
    )
}
