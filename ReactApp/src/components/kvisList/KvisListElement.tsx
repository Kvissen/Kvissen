import {Box, Button, Card, CircularProgress} from "@mui/material";
import React, {useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {Kvis} from "../../models/Kvis";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {KvisRepository} from "../../data/repositories/KvisRepository";
import store from "../../stores/KvisStore";
import {KvisActivate} from "../../models/KvisActivate";

export default function KvisListElement({kvis}: { kvis: Kvis }) {

    const [open, setOpen] = useState(false);
    let activateKvisId = "";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handleAssign() {
        await KvisRepository.getInstance().activeKvis(new KvisActivate(kvis.uuid,activateKvisId));
        handleClose();
        alert("Kvis is now activated");
    }

    function RenderDialog() {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter code</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the code you want to assign to {kvis.name}.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Code"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            activateKvisId = e.target.value;
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={async () => handleAssign()}>Assign</Button>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <Box data-testid="kvislistelement-test-container">
            <RenderDialog/>
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
                                handleClickOpen();
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