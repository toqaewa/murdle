import { useState } from 'react';

interface ClueLogProps {
  clues: string[];
  onNewClue?: (clue: string) => void;
}

export const ClueLog = ({ clues, onNewClue }: ClueLogProps) => {
  const [newClue, setNewClue] = useState('');

  const handleAddClue = () => {
    if (newClue.trim() && onNewClue) {
      onNewClue(newClue);
      setNewClue('');
    }
  };

  return (
    <div className="clue-log">
      <h3>Журнал подсказок</h3>
      <div className="clues-list">
        {clues.map((clue, index) => (
          <div key={index} className="clue-item">
            <span className="clue-number">{index + 1}.</span>
            {clue}
          </div>
        ))}
      </div>
      
      {onNewClue && (
        <div className="add-clue">
          <input
            type="text"
            value={newClue}
            onChange={(e) => setNewClue(e.target.value)}
            placeholder="Добавить свою подсказку..."
          />
          <button onClick={handleAddClue}>+</button>
        </div>
      )}
    </div>
  );
};