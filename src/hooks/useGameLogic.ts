import { useState } from 'react';
import { type Mystery, mysteries } from '../data';
import { type Suspect, suspects } from '../data';
import { type Weapon, weapons } from '../data';
import { type Location, locations } from '../data';
// import { suspects, weapons, locations } from '../data';
import { generateClues } from '../utils/generateClues';
import { randomChoice } from '../utils/helpers';

// количество подсказок пока захардкожено
export const useGameLogic = (mysteries: Mystery[], initialCluesCount: number = 7) => {
  const [currentMystery] = useState(mysteries[0]);
  const [clues] = useState(() => {
    const solution = {
      suspect: suspects.find(s => s.id === currentMystery.solution.suspectId)!,
      weapon: weapons.find(w => w.id === currentMystery.solution.weaponId)!,
      location: locations.find(l => l.id === currentMystery.solution.locationId)!
    };
    return generateClues(solution, initialCluesCount);
  });
  
  const [result, setResult] = useState<{
    isSolved: boolean;
    message: string;
  }>({ isSolved: false, message: '' });

  const checkSolution = (playerSolution: {
    suspect: Suspect;
    weapon: Weapon;
    location: Location;
  }) => {
    const isCorrect = 
      playerSolution.suspect.id === currentMystery.solution.suspectId &&
      playerSolution.weapon.id === currentMystery.solution.weaponId &&
      playerSolution.location.id === currentMystery.solution.locationId;

    setResult({
      isSolved: isCorrect,
      message: isCorrect ? "✅ Верно!" : "❌ Неверно! Продолжайте расследование"
    });

    return isCorrect;
  };

  const resetGame = () => {
    setResult({ isSolved: false, message: '' });
    // возможно сюда надо вынести сброс всех стейтов
  };

  return {
    currentMystery,
    clues,
    result,
    checkSolution,
    resetGame,
    suspects,
    weapons,
    locations
  };
};