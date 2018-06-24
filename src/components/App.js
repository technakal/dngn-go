import React from 'react';
import InitiativePanel from './InitTracker';
import DiceRollerPanel from './DiceRoller';
import logo from '../img/logo-thin-variant.svg';

const App = () => {
  return (
    <div>
      <header className="app-header">
        <img className="logo-main" src={logo} alt="DnD GO!" />
      </header>
      <div className="content-panel">
        <h2>Dice Roller</h2>
        <DiceRollerPanel />
      </div>
    </div>
  );
};

export default App;
