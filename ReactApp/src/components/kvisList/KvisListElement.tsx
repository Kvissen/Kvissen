import {Box, Button, Card} from "@mui/material";
import React, {useEffect, useState} from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {Kvis} from "../../models/Kvis";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {KvisRepository} from "../../data/repositories/KvisRepository";
import {KvisActivate} from "../../models/KvisActivate";
import store from "../../stores/KvisStore";

export default function KvisListElement({kvis}: { kvis: Kvis}) {

    const [open, setOpen] = useState(false);
    const [activatedKvisses, setActivatedKvisses] = useState<KvisActivate[]>([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchActivatedKvisses();
    },[])

    async function fetchActivatedKvisses() {
       let activates = await KvisRepository.getInstance().getActivatedKvisses();
       setActivatedKvisses(activates)
    }

    function isActivated() : boolean {
        if (activatedKvisses.length > 0) return activatedKvisses.find(entity => entity.kvisId === kvis.uuid) !== undefined
        else return false;

}

    async function handleAssign() {
        await KvisRepository.getInstance().activateKvis(new KvisActivate(kvis.uuid, store.kvisCode))
            .then((response) => {
                    console.log("handleAssign: result: " + response + " " + store.kvisCode)
                    handleClose();
                    if (response === store.kvisCode) {
                        alert("Kvis is now activated with code " + store.kvisCode);
                    } else if (response === "in use") {
                        alert("The code " + store.kvisCode + " is already in use.")
                    } else {
                        alert("Error")
                    }
                }
            ).catch(() => {
            handleClose()
            alert("Could not activate Kvis as " + store.kvisCode)
        })
    }

    async function deactivateKvis() {
    }

    function DeactivateKvisLayout() {
        return (
            <Button
                className="basic-button"
                variant="contained"
                data-testid="kvislistelement-test-play"
                startIcon={<StopIcon/>}
                onClick={async () => {
                    await deactivateKvis();
                }}
            >
                Stop Kvis
            </Button>
        )
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
                            store.kvisCode = e.target.value;
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
                            <p style={{margin: 0}}
                               data-testid="kvislistelement-test-questions">{kvis.questions?.length} Questions</p>
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
                        {
                            isActivated() && <DeactivateKvisLayout/>
                        }
                    </Box>

                </Box>
            </Card>
        </Box>
    )
}