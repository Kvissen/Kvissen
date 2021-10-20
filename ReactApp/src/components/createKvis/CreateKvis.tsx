import React from 'react';
import {observer} from "mobx-react";
import {Button, Grid} from "@mui/material";
import './CreateKvisStyleSheet.css'
import CreateKvisBox from "./CreateKvisBox";

function CreateKvis() {
    return (
        <div className="main-container">
            <div className="flex-container">
                <h1>
                    Create a new kvis
                </h1>
                <Button
                    variant="contained"
                    className="create-kvis-button"
                    onClick={() => {

                }}>
                    Create Kvis
                </Button>
            </div>

            <CreateKvisBox/>
        </div>
    )
}

const CreateKvisObserver = observer(CreateKvis)
export default CreateKvisObserver;