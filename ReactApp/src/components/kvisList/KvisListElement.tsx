import {Box, Button, Card} from "@mui/material";
import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';

export default function KvisListElement() {

    return (
        <Box>
            <Card>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Box p={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                        <div>
                        <h3 style={{margin: 0}}>Kvis name</h3>
                        <p >Kvissen</p>
                        </div>
                        <div>
                        <h3 >Questions</h3>
                        <p style={{margin: 0}}>24 Questions</p>
                        </div>
                    </Box>
                    <Box p={2} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} >
                        <Button
                            className="basic-button"
                            variant="contained"
                            startIcon={<PlayArrowIcon/>}
                            onClick={() => {

                            }}
                        >
                            Start Kvis
                        </Button>
                        <Button
                            className="basic-button"
                            variant="contained"
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