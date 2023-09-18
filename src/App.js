import React from 'react';
import './App.css';
import { DebitCard } from './components/debit-card/DebitCard.js';
const title = "Cards List";

const App = () => {
    return (
        <div className="App">
			<div header={title}>{title}</div>
			<DebitCard />
        </div>
    );
}

export default App;
