import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {v4 as uuidv4} from 'uuid';
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";
import {useEffect, useState} from "react";
import {KvisRepository} from "../../data/repositories/KvisRepository";

export function KvisList() {


    useEffect(() => {
        test();
    },[])

    async function test() {
        await fetch("http://localhost:8080/api/kvis/all", { method: 'GET'})
            .then(res => {
            return res.json();
        })
            .then(data => {
                setKvisses(data as Kvis[])
            })




    }
    const [kvisses, setKvisses] = useState<Kvis[]>([]);

    return (
        <div className="margin-container">
            <Grid direction='row' container spacing={4} justifyContent={"space-between"} alignItems={"center"}>
                {
                    kvisses.map((kvis) => {
                        return (
                            <Grid item sm={6} key={kvis.uuid}>
                                <KvisListElement kvis={kvis}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

const KvisListObserver = observer(KvisList)
export default KvisListObserver;