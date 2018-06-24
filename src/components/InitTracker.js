import React, { Component } from 'react';

const CombatantTurnDisplay = props => {
  const { character } = props;
  return (
    <div className="flex-row init-panel-row">
      <p className="flex-item-1x">{character.initiative}</p>
      <p className="flex-item-3x">{character.name}</p>
    </div>
  );
};

class IniativePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [
        {
          id: 0,
          name: 'Lenny Bowbard',
          initiative: 0,
          modifier: 3
        },
        {
          id: 1,
          name: 'Fjord the Bjord',
          initiative: 0,
          modifier: 3
        },
        {
          id: 2,
          name: 'Haldenfrond',
          initiative: 0,
          modifier: 3
        },
        {
          id: 3,
          name: 'Ming',
          initiative: 0,
          modifier: 3
        },
        {
          id: 4,
          name: 'Namfoodle Nackle',
          initiative: 0,
          modifier: 3
        }
      ]
    };
    this.startEncounter = this.startEncounter.bind(this);
  }

  startEncounter() {
    console.log('start');
  }

  render() {
    const { characters } = this.state;
    return (
      <div>
        <div className="flex-column">
          <div className="flex-row init-panel-header">
            <p className="flex-item-1x title-style">Initiative</p>
            <p className="flex-item-3x title-style">Combatant Name</p>
          </div>
          {characters.map(character => (
            <CombatantTurnDisplay key={character.id} character={character} />
          ))}
        </div>
        <button onClick={this.startEncounter}>Start Encounter</button>
      </div>
    );
  }
}

export default IniativePanel;
