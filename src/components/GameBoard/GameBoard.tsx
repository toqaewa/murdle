import { useState } from 'react';
import { Suspect, Weapon, Location } from '../../data/types';

type CellValue = '❌' | '❓' | '✅' | null;

interface GameBoardProps {
  suspects: Suspect[];
  weapons: Weapon[];
  locations: Location[];
  onSubmit: (solution: {
    suspect: Suspect;
    weapon: Weapon;
    location: Location;
  }) => void;
}

export const GameBoard = ({ 
  suspects, 
  weapons, 
  locations, 
  onSubmit 
}: GameBoardProps) => {
  const [grid, setGrid] = useState<CellValue[][]>(
    Array(suspects.length).fill(null).map(() => Array(weapons.length).fill(null))
  );

  const [solution, setSolution] = useState<{
    suspect: Suspect | null;
    weapon: Weapon | null;
    location: Location | null;
  }>({ suspect: null, weapon: null, location: null });

  const handleCellClick = (row: number, col: number) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const current = newGrid[row][col];
      
      newGrid[row][col] = 
        current === null ? '❓' :
        current === '❓' ? '✅' :
        current === '✅' ? '❌' : null;

      // Автоматическое проставление ❌ в конфликтующих клетках
      if (newGrid[row][col] === '✅') {
        for (let i = 0; i < suspects.length; i++) {
          if (i !== row) newGrid[i][col] = '❌';
        }
        for (let j = 0; j < weapons.length; j++) {
          if (j !== col) newGrid[row][j] = '❌';
        }
      }

      return newGrid;
    });
  };

  const handleSubmit = () => {
    if (solution.suspect && solution.weapon && solution.location) {
      onSubmit({
        suspect: solution.suspect,
        weapon: solution.weapon,
        location: solution.location
      });
    }
  };

  return (
    <div className="game-board">
      <h2>SUSPECTS × WEAPONS</h2>
      <div className="grid">
        <div className="header-row">
          <div className="header-cell"></div>
          {weapons.map(w => (
            <div key={w.id} className="header-cell">{w.name}</div>
          ))}
        </div>
        
        {suspects.map((suspect, row) => (
          <div key={suspect.id} className="grid-row">
            <div className="header-cell">{suspect.name}</div>
            {weapons.map((weapon, col) => (
              <div
                key={`${row}-${col}`}
                className={`cell ${grid[row][col] || 'empty'}`}
                onClick={() => handleCellClick(row, col)}
              >
                {grid[row][col]}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="solution-form">
        <h3>SOLUTION</h3>
        <div className="selectors">
          <select
            value={solution.suspect?.id || ''}
            onChange={e => setSolution({
              ...solution,
              suspect: suspects.find(s => s.id === Number(e.target.value)) || null
            })}
          >
            <option value="">Who?</option>
            {suspects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={solution.weapon?.id || ''}
            onChange={e => setSolution({
              ...solution,
              weapon: weapons.find(w => w.id === Number(e.target.value)) || null
            })}
          >
            <option value="">With what?</option>
            {weapons.map(w => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>

          <select
            value={solution.location?.id || ''}
            onChange={e => setSolution({
              ...solution,
              location: locations.find(l => l.id === Number(e.target.value)) || null
            })}
          >
            <option value="">Where?</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!solution.suspect || !solution.weapon || !solution.location}
        >
          SOLVE
        </button>
      </div>
    </div>
  );
};