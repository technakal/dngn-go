import React, { Component } from 'react';

const CombatantInTurn = props => {
  const {
    id,
    name,
    initiative,
    maxHitPoints,
    currentHitPoints
  } = props.combatant;
  const { updateValue } = props;
  return (
    <div>
      <input
        id={`in-${id}`}
        type="number"
        defaultValue={initiative}
        onChange={updateValue}
        className="border"
      />
      <p className="border">{name}</p>
    </div>
  );
};

class TurnDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      combatants: [
        {
          id: 0,
          name: 'Lenny Bowbard',
          initiative: 16,
          maxHitPoints: 10,
          currentHitPoints: 10
        },
        {
          id: 1,
          name: 'Fjord the Bjord',
          initiative: 22,
          maxHitPoints: 10,
          currentHitPoints: 10
        },
        {
          id: 2,
          name: 'Haldenfrond',
          initiative: 6,
          maxHitPoints: 10,
          currentHitPoints: 10
        },
        {
          id: 3,
          name: 'Stumblepuck',
          initiative: 10,
          maxHitPoints: 10,
          currentHitPoints: 10
        },
        {
          id: 4,
          name: 'Gorl',
          initiative: 6,
          maxHitPoints: 10,
          currentHitPoints: 10
        }
      ],
      turn: null
    };
    this.sortInitiative = this.sortInitiative.bind(this);
    this.compare = this.compare.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  sortInitiative() {
    this.setState({
      combatants: this.state.combatants.sort(this.compare('initiative'))
    });
  }

  compare(key, order = 'desc') {
    return function(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      let comparison = 0;
      if (a[key] > b[key]) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  updateValue(e) {
    const input = e.target.id.split('-');
    const index = this.state.combatants.findIndex(
      x => x.id === Number(input[1])
    );
    const combatants = this.state.combatants;
    combatants[index][
      input[0] === 'hp' ? 'currentHitPoints' : 'initiative'
    ] = Number(document.getElementById(e.target.id).value);
    this.setState({ combatants: combatants });
  }

  render() {
    return (
      <div className="turn-panel">
        <h2>Turn Order</h2>
        <div className="init-grid title-style">
          <p>Initiative Roll</p>
          <p>Combatant</p>
          {this.state.combatants.map(combatant => (
            <CombatantInTurn
              key={combatant.id}
              combatant={combatant}
              updateValue={this.updateValue}
            />
          ))}
        </div>
        <button onClick={this.sortInitiative}>Give it the ol' sort!</button>
      </div>
    );
  }
}

const InitiativePanel = () => {
  return <TurnDisplay />;
};

export default InitiativePanel;
