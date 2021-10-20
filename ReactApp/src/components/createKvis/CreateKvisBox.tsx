import {Component} from "react";
import {Card, Button} from "@mui/material";
import './CreateKvisStyleSheet.css'

export default class CreateKvisBox extends Component {

    render() {
        return (
            <Card className="create-kvis-box">
                <h2 className="create-kvis-question-header">Question 1</h2>
            </Card>
        )
    }
}