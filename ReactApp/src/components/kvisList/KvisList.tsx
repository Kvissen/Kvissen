import {Grid} from "@mui/material";
import {observer} from "mobx-react";
import KvisListElement from "./KvisListElement";
import {Kvis} from "../../models/Kvis";
import {v4 as uuidv4} from 'uuid';
import {Question} from "../../models/Question";
import {Answer} from "../../models/Answer";
import {useEffect} from "react";
import {KvisRepository} from "../../data/repositories/KvisRepository";

export function KvisList() {


    useEffect(() => {
        test();
        //console.log("Result ", t)
    },[])

    async function test() {
        console.log("Testing")
        await fetch("http://localhost:8080/api/kvis/all", { method: 'GET'})
            .then(res => {
            return res.json();
        })
            .then(data => {
                const t = data as Kvis[]
                console.log("log ", t)
                return data as Kvis[]
            })

        //console.log("Running repo")
        //return await KvisRepository.getInstance().getKvisses();
    }

    const kvisses = [
        new Kvis(uuidv4(), "Test Kvis", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question")
        ]),
        new Kvis(uuidv4(), "Test Kvis1", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question1")
        ]),
        new Kvis(uuidv4(), "Test Kvis2", [
            new Question(uuidv4(), [
                new Answer("Test answer", false),
                new Answer("Test answer1", false),
                new Answer("Test answer2", false),
                new Answer("Test answer3", false),
            ], "Test question2")
        ])
    ]

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
export default KvisListObserver