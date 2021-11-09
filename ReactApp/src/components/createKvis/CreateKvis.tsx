import React, {useState} from 'react';
import {observer} from "mobx-react";
import {Button} from "@mui/material";
import './CreateKvisStyleSheet.css'
import CreateKvisBox from "./CreateKvisBox";

export function CreateKvis() {

    const [createKvis, setCreateKvis] = useState<boolean>(false)

    function OnClickAddKvis() {
        setCreateKvis(true)
    }

    function ShowKvisBox() {
        if (createKvis){
            return <CreateKvisBox data-testid="createkvis-test-kvisbox"/>
        }
        return null
    }

    return (
        <div className="main-container">
            <div className="flex-container">
                <h1 data-testid="createkvis-test-header">
                    Create a new kvis
                </h1>
                <Button
                    disabled={createKvis}
                    variant="contained"
                    id="create-kvis"
                    data-testid="createkvis-test-button"
                    className="create-kvis-button"
                    onClick={() => {
                        OnClickAddKvis();
                    }}>
                    Create Kvis
                </Button>
            </div>
            <ShowKvisBox data-testid="createkvis-test-showkvisbox"/>
        </div>
    )
}


const CreateKvisObserver = observer(CreateKvis)
export default CreateKvisObserver;