import { useState, useEffect } from 'react';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { ClueLog } from '../components/ClueLog/ClueLog';
import { generateClues } from '../utils/generateClues';
import { mysteries, suspects, weapons, locations } from '../data';
import { Suspect, Weapon, Location } from '../data/types';

export const GameScreen = () => {
  const [currentMystery] = useState(mysteries[0]);
  const [clues, setClues] = useState<string[]>([]);

  // Получаем полные объекты решения для генерации подсказок
  const getSolutionObjects = () => {
    return {
      suspect: suspects.find(s => s.id === currentMystery.solution.suspectId)!,
      weapon: weapons.find(w => w.id === currentMystery.solution.weaponId)!,
      location: locations.find(l => l.id === currentMystery.solution.locationId)!
    };
  };

  // Инициализация подсказок
  useEffect(() => {
    setClues(generateClues(getSolutionObjects(), 7));
  }, [currentMystery]);

  const handleSolve = (playerSolution: {
    suspect: Suspect;
    weapon: Weapon;
    location: Location;
  }) => {
    const isCorrect =
      playerSolution.suspect.id === currentMystery.solution.suspectId &&
      playerSolution.weapon.id === currentMystery.solution.weaponId &&
      playerSolution.location.id === currentMystery.solution.locationId;

    setClues(prev => [
      ...prev,
      isCorrect ? "✅ Верно!" : "❌ Неверно! Продолжайте расследование"
    ]);

    // Добавляем новые подсказки при неверном ответе
    if (!isCorrect) {
      const newClues = generateClues(getSolutionObjects(), 2);
      setClues(prev => [...prev, ...newClues]);
    }
  };

  return (
    <div className="game-screen">
      <h1>MURDLE: Тайна {currentMystery.id}</h1>
      <div className="game-content">
        <GameBoard
          suspects={suspects}
          weapons={weapons}
          locations={locations}
          onSubmit={handleSolve}
        />
        <ClueLog clues={clues} />
      </div>
    </div>
  );
};