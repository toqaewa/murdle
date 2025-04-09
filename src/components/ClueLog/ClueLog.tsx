import "./ClueLog.css"

interface ClueLogProps {
  clues: string[];
}

export const ClueLog = ({ clues }: ClueLogProps) => {
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
    </div>
  );
};