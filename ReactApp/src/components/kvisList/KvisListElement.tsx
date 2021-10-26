import {Box, Button, Card} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function KvisListElement() {

    return (
        <Box>
            <Card>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Box p={2} display={"flex"} flexDirection={"column"}>
                        <h3 style={{margin: 0}}>Kvis name</h3>
                        <p style={{marginTop: 0}}>Kvissen</p>
                        <h3 style={{margin: 0}}>Questions</h3>
                        <p style={{marginTop: 0}}>24 Questions</p>
                    </Box>
                    <Box p={2} display={"flex"} >
                        <Button
                            className="basic-button"
                            variant="contained"
                            startIcon={<PlayArrowIcon/>}
                            onClick={() => {

                            }}
                        >
                            Start Kvis
                        </Button>
                    </Box>

                </Box>
            </Card>
        </Box>
    )
}