import { useState } from 'react';
import { Suspect, Weapon, Location } from '../../data/types';
import "./GameBoard.css";

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
  isSolved: boolean;
}

export const GameBoard = ({ 
  suspects, 
  weapons, 
  locations, 
  onSubmit,
  isSolved, 
}: GameBoardProps) => {
  const [swGrid, setSwGrid] = useState<CellValue[][]>(
    Array(suspects.length).fill(null).map(() => Array(weapons.length).fill(null))
  );
  
  const [slGrid, setSlGrid] = useState<CellValue[][]>(
    Array(suspects.length).fill(null).map(() => Array(locations.length).fill(null))
  );
  
  const [wlGrid, setWlGrid] = useState<CellValue[][]>(
    Array(weapons.length).fill(null).map(() => Array(locations.length).fill(null))
  );

  const [solution, setSolution] = useState<{
    suspect: Suspect | null;
    weapon: Weapon | null;
    location: Location | null;
  }>({ suspect: null, weapon: null, location: null });

  // Обработчики кликов для каждой матрицы
  const handleSwClick = (row: number, col: number) => {
    setSwGrid(prev => updateGrid(prev, row, col));
  };

  const handleSlClick = (row: number, col: number) => {
    setSlGrid(prev => updateGrid(prev, row, col));
  };

  const handleWlClick = (row: number, col: number) => {
    setWlGrid(prev => updateGrid(prev, row, col));
  };

  const updateGrid = (prev: CellValue[][], row: number, col: number) => {
    const newGrid = [...prev];
    const current = newGrid[row][col];
    
    newGrid[row][col] = 
      current === null ? '❓' :
      current === '❓' ? '✅' :
      current === '✅' ? '❌' : null;

    if (newGrid[row][col] === '✅') {
      for (let i = 0; i < newGrid.length; i++) {
        if (i !== row) newGrid[i][col] = '❌';
      }
      for (let j = 0; j < newGrid[row].length; j++) {
        if (j !== col) newGrid[row][j] = '❌';
      }
    }

    return newGrid;
  };

  return (
    <div className="game-board">
      <h2 className="matrix-title">Детективная матрица</h2>
      
      <div className="corner-matrix-container">
        {/* Пустой угол */}
        <div></div>
        
        {/* горизонтальные заголовки */}
        <div className="suspects-header">
          {suspects.map(suspect => (
            <div key={`sh-${suspect.id}`} className="header-cell suspect-header">
              {suspect.icon}
            </div>
          ))}
          {locations.map(location => (
            <div key={`lh-${location.id}`} className="header-cell location-header">
              {location.icon}
            </div>
          ))}
        </div>
        
        {/* вертикальные заголовки */}
        <div className="weapons-header">
          {weapons.map(weapon => (
            <div key={`wh-${weapon.id}`} className="header-cell weapon-header">
              {weapon.icon}
            </div>
          ))}
          {locations.map(location => (
            <div key={`lh-${location.id}`} className="header-cell location-header">
              {location.icon}
            </div>
          ))}
        </div>
        
        {/* Основная матрица */}
        <div className="matrix-grid">
          {/* Suspects × Weapons (основной квадрат) */}
          <div className="sw-matrix">
            {suspects.map((suspect, sIdx) => (
              <div key={`sw-r-${suspect.id}`} className="matrix-row">
                {weapons.map((weapon, wIdx) => (
                  <div
                    key={`sw-c-${weapon.id}`}
                    className={`matrix-cell ${swGrid[sIdx][wIdx] || 'empty'}`}
                    onClick={() => handleSwClick(sIdx, wIdx)}
                  >
                    {swGrid[sIdx][wIdx]}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Weapons × Locations (правый квадрат) */}
          <div className="wl-matrix">
            {weapons.map((weapon, wIdx) => (
              <div key={`wl-r-${weapon.id}`} className="matrix-row">
                {locations.map((location, lIdx) => (
                  <div
                    key={`wl-c-${location.id}`}
                    className={`matrix-cell ${wlGrid[wIdx][lIdx] || 'empty'}`}
                    onClick={() => handleWlClick(wIdx, lIdx)}
                  >
                    {wlGrid[wIdx][lIdx]}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Suspects × Locations (нижний квадрат) */}
          <div className="sl-matrix">
            {suspects.map((suspect, sIdx) => (
              <div key={`sl-r-${suspect.id}`} className="matrix-row">
                {locations.map((location, lIdx) => (
                  <div
                    key={`sl-c-${location.id}`}
                    className={`matrix-cell ${slGrid[sIdx][lIdx] || 'empty'}`}
                    onClick={() => handleSlClick(sIdx, lIdx)}
                  >
                    {slGrid[sIdx][lIdx]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="solution-form">
        <h3>Ваше решение</h3>
        <div className="selectors">
          <select
            value={solution.suspect?.id || ''}
            onChange={e => setSolution({
              ...solution,
              suspect: suspects.find(s => s.id === Number(e.target.value)) || null
            })}
          >
            <option value="">Кто?</option>
            {suspects.map(s => (
              <option key={`opt-s-${s.id}`} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={solution.weapon?.id || ''}
            onChange={e => setSolution({
              ...solution,
              weapon: weapons.find(w => w.id === Number(e.target.value)) || null
            })}
          >
            <option value="">Чем?</option>
            {weapons.map(w => (
              <option key={`opt-w-${w.id}`} value={w.id}>{w.name}</option>
            ))}
          </select>

          <select
            value={solution.location?.id || ''}
            onChange={e => setSolution({
              ...solution,
              location: locations.find(l => l.id === Number(e.target.value)) || null
            })}
          >
            <option value="">Где?</option>
            {locations.map(l => (
              <option key={`opt-l-${l.id}`} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onSubmit(solution as any)}
          disabled={!solution.suspect || !solution.weapon || !solution.location}
          className="solve-button"
        >
          {isSolved ? 'Решено!' : 'Проверить решение'}
        </button>

        <div>
          {}
        </div>
      </div>
    </div>
  );
};