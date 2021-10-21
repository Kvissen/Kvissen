import React, {Component} from "react";
import {Card, Button, TextField, Grid, Box} from "@mui/material";
import './CreateKvisStyleSheet.css'
import AddIcon from '@mui/icons-material/Add';
import {store} from "../../stores/QuizStore";

export default class CreateKvisBox extends Component {

    render() {
        return (
            <Card className="create-kvis-box">
                <h2 className="create-kvis-question-header">Question 1</h2>
                <TextField
                    margin="normal"
                    required
                    label="Enter question"
                    fullWidth
                    autoFocus
                />
                <Grid direction='row' container spacing={1}>
                    <Grid container item sm={6}>
                        <TextField
                            margin="normal"
                            required
                            label="Enter Answer 1"
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid container item sm={6}>
                        <TextField
                            margin="normal"
                            required
                            label="Enter Answer 2"
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid container item sm={6}>
                        <TextField
                            required
                            label="Enter Answer 3"
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid container item sm={6}>
                        <TextField
                            required
                            label="Enter Answer 4"
                            fullWidth
                            autoFocus
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

                        }}
                    >
                        Add another question
                    </Button>
                </Box>
            </Card>
        )
    }
}