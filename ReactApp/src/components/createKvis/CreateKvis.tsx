import React, {useState} from 'react';
import {observer} from "mobx-react";
import {Button} from "@mui/material";
import './CreateKvisStyleSheet.css'
import CreateKvisBox from "./CreateKvisBox";
import {Kvis} from "../../models/Kvis";
import { v4 as uuidv4 } from 'uuid';

export function CreateKvis() {

    const [createKvis, setCreateKvis] = useState<boolean>(false)

    function OnClickAddKvis() {
        setCreateKvis(true)
    }

    function ShowKvisBox() {
        if (createKvis){
            return <CreateKvisBox/>
        }
        return null
    }

    return (
        <div className="main-container">
            <div className="flex-container">
                <h1>
                    Create a new kvis
                </h1>
                <Button
                    disabled={createKvis}
                    variant="contained"
                    className="create-kvis-button"
                    onClick={() => {
                        OnClickAddKvis();
                    }}>
                    Create Kvis
                </Button>
            </div>
            <ShowKvisBox/>
        </div>
    )
}


const CreateKvisObserver = observer(CreateKvis)
export default CreateKvisObserver;