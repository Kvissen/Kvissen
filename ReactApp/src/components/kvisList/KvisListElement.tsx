import {Box, Button, Card} from "@mui/material";
import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';
import {Kvis} from "../../models/Kvis";

export default function KvisListElement({kvis}: { kvis: Kvis }) {

    return (
        <Box data-testid="kvislistelement-test-container">
            <Card>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Box p={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                        <div>
                            <h3 style={{margin: 0}} data-testid="kvislistelement-test-kvisname-header">Kvis name</h3>
                            <p data-testid="kvislistelement-test-kvisname">{kvis.name}</p>
                        </div>
                        <div>
                            <h3 data-testid="kvislistelement-test-questions-header">Questions</h3>
                            <p style={{margin: 0}} data-testid="kvislistelement-test-questions">{kvis.questions?.length} Questions</p>
                        </div>
                    </Box>
                    <Box p={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                        <Button
                            className="basic-button"
                            variant="contained"
                            data-testid="kvislistelement-test-play"
                            startIcon={<PlayArrowIcon/>}
                            onClick={() => {

                            }}
                        >
                            Start Kvis
                        </Button>
                        <Button
                            className="basic-button"
                            variant="contained"
                            data-testid="kvislistelement-test-edit"
                            startIcon={<EditIcon/>}
                            onClick={() => {

                            }}
                        >
                            Edit Kvis
                        </Button>
                    </Box>

                </Box>
            </Card>
        </Box>
    )
}