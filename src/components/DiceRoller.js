import React, { Component } from 'react';
import { Button, DieButton } from './Buttons';
import { random } from 'lodash';

const DiceButtons = props => {
  const { addDie, editModifier } = props;
  const dice = ['d100', 'd20', 'd12', 'd10', 'd8', 'd6', 'd4'];
  return (
    <div className="dice-grid">
      {dice.map(die => <DieButton onClick={addDie}>{die}</DieButton>)}
      <div className="dice-grid-modifiers grid-column-2x">
        <p className="dice-modifier-label">Modifier</p>
        <Button
          className="increment-button"
          onClick={() => editModifier('dec')}>
          -
        </Button>
        <span className="modifier-display" id="modifierDisplay">
          0
        </span>
        <Button
          className="increment-button"
          onClick={() => editModifier('inc')}>
          +
        </Button>
      </div>
    </div>
  );
};

class DiceRollerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rollResult: {
        final: '',
        breakdown: ''
      },
      rollRequest: '',
      numClicked: 0,
      lastClicked: 'd20',
      modifier: 0
    };
    this.addDie = this.addDie.bind(this);
    this.editModifier = this.editModifier.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.syncEntry = this.syncEntry.bind(this);
  }

  addDie(die) {
    let numClicked = this.state.numClicked;
    let modifier = this.state.modifier;
    if (this.state.lastClicked === die) {
      numClicked++;
    } else {
      numClicked = 1;
      modifier = 0;
      document.getElementById(
        `${this.state.lastClicked}Button`
      ).textContent = this.state.lastClicked;
    }
    this.setState(
      { lastClicked: die, numClicked: numClicked, modifier: modifier },
      () =>
        this.syncEntry(
          this.state.numClicked,
          this.state.lastClicked,
          this.state.modifier
        )
    );
  }

  editModifier(type) {
    let modifier = this.state.modifier;
    type === 'inc' ? modifier++ : modifier--;
    const num = this.state.numClicked === 0 ? 1 : this.state.numClicked;
    this.setState({ numClicked: num, modifier: modifier }, () =>
      this.syncEntry(
        this.state.numClicked,
        this.state.lastClicked,
        this.state.modifier
      )
    );
  }

  rollDice() {
    const rollResults = () => {
      const results = [];
      for (let i = 0; i < this.state.numClicked; i++) {
        results.push(random(1, this.state.lastClicked.split('d')[1]));
      }
      return results;
    };
    const resultArray = rollResults();
    const result =
      resultArray.reduce((curr, acc) => curr + acc) +
      Number(this.state.modifier);
    this.setState(
      {
        rollResult: {
          final: result,
          breakdown: `(${resultArray.join(' + ')}${
            this.state.modifier < 0 ? `) - ${this.state.modifier * -1}` : ``
          }${this.state.modifier > 0 ? `) + ${this.state.modifier}` : ''}${
            this.state.modifier === 0 ? ')' : ''
          }`
        }
      },
      () =>
        this.syncEntry(
          this.state.numClicked,
          this.state.lastClicked,
          this.state.modifier
        )
    );
  }

  resetAll() {
    document.getElementById('d100Button').textContent = 'd100';
    document.getElementById('d20Button').textContent = 'd20';
    document.getElementById('d12Button').textContent = 'd12';
    document.getElementById('d10Button').textContent = 'd10';
    document.getElementById('d8Button').textContent = 'd8';
    document.getElementById('d6Button').textContent = 'd6';
    document.getElementById('d4Button').textContent = 'd4';
    document.getElementById('modifierDisplay').textContent = 0;
    document.getElementById('rollDisplay').textContent = '';
    this.setState({
      rollRequest: '',
      numClicked: 0,
      lastClicked: 'd20',
      modifier: 0,
      rollResult: {
        final: '',
        breakdown: ''
      }
    });
  }

  syncEntry(num, last, mod, type = null) {
    const value = [num, last];
    if (mod !== 0) {
      mod > 0 ? value.push(`+${mod}`) : value.push(mod);
    }
    if (type !== null) {
      this.resetAll();
    } else {
      document.getElementById(`${last}Button`).textContent = `${num}${last}`;
      document.getElementById('modifierDisplay').textContent = mod;
      document.getElementById('rollDisplay').textContent = `${num}${last}${
        mod > 0 ? `+${mod}` : mod === 0 ? '' : `${mod}`
      }`;
    }
  }

  render() {
    const { rollResult } = this.state;
    return (
      <div>
        <div className="l-grid result-grid">
          <h3 className="grid-top">Roll Result:</h3>
          <p className="grid-bottom">{rollResult.final}</p>
          <p
            className={
              rollResult.final === '' ? 'grid-row-2x' : 'grid-row-2x more-info'
            }>
            {rollResult.breakdown}
          </p>
        </div>
        <div className="l-grid display-grid">
          <p id="rollDisplay" className="roll-display" />
          <Button classes="reset" onClick={this.resetAll}>
            Reset
          </Button>
        </div>
        <DiceButtons addDie={this.addDie} editModifier={this.editModifier} />
        <div className="l-grid dice-grid">
          <Button onClick={this.rollDice} classes="grid-column-all roll">
            Roll!
          </Button>
        </div>
      </div>
    );
  }
}

export default DiceRollerPanel;
