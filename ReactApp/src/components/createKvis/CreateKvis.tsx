import React, {useState} from 'react';
import {observer} from "mobx-react";
import {Button} from "@mui/material";
import './CreateKvisStyleSheet.css'
import CreateKvisBox from "./CreateKvisBox";
import {Kvis} from "../../models/Kvis";
import { v4 as uuidv4 } from 'uuid';

export function CreateKvis() {

    const [kvis, setKvis] = useState<Kvis>()

    function OnClickAddKvis() {
        setKvis(new Kvis(uuidv4()))
    }

    function ShowKvisBox() {
        if (kvis!==undefined){
            return <CreateKvisBox key={kvis.uuid} kvis={kvis}/>
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
                    disabled={kvis !== undefined}
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