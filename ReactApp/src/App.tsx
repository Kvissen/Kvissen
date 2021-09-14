import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

function App() {
  return (
    <div className="App">
      <TextField id="filled-basic" label="Filled" variant="filled" /><br/>
      <Button variant="contained" color="primary">
        Commit
      </Button>
    </div>
  );
}

export default App;
