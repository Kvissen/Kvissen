// Erlend
import React from 'react';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {store} from "../../stores/QuizStore";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom";

function EnterCode() {
    const history = useHistory();
    return (
        <Grid container spacing={2} alignContent={"center"} className={"entercodebg"}>
            <Grid item xs={6} md={4} margin={"128px auto"} className={"entercodebox"}>
                <Typography align={"center"}>ENTER CODE</Typography>
                <TextField
                    margin="normal"
                    required
                    id="code"
                    label="Kvis Code"
                    fullWidth
                    name="code"
                    autoFocus
                    value={store.quizId}
                    onChange={(evt) => store.quizId = evt.target.value}
                />

                <Button onClick={() => {
                    store.startQuiz();
                    let getTokenUri = process.env.REACT_APP_BASE_URL! + "/api/auth/playerLogin"

                    // Retrieve token (redirected to LoginRecipient)
                    /*useEffect(() => {
                        window.location.href = getTokenUri;
                    }, [getTokenUri]);*/
                }}>
                    Start Kvis!
                </Button>
            </Grid>
        </Grid>
    )
}

const EnterCodeObserver = observer(EnterCode)
export default EnterCodeObserver;




