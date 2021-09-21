import React, {Component} from 'react';

var questionNumber = 1

export default class Header extends Component {
    render() {
        return (<div>
            <h1>LOGO</h1>
            <p>Question {questionNumber}</p>
        </div>);
    }
}