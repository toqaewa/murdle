import { useState } from 'react';
import { Mystery, mysteries } from '../data/mysteries';
import { suspects, weapons, locations } from '../data';
import { generateClues } from '../utils/generateClues';
import { randomChoice } from '../utils/helpers';

export const useGameLogic = () => {
    const [currentMystery, setCurrentMystery] = useState<Mystery>(() => {
        const mystery = randomChoice(mysteries);
        return {
          ...mystery,
          clues: generateClues({
            suspect: suspects.find(s => s.id === mystery.solution.suspectId)!,
            weapon: weapons.find(w => w.id === mystery.solution.weaponId)!,
            location: locations.find(l => l.id === mystery.solution.locationId)!
          }, 7) // Генерируем 7 подсказок
        };
      });

  const [selected, setSelected] = useState({ suspect: null, weapon: null, location: null });
  const [clues, setClues] = useState<string[]>(currentMystery.clues);

  const checkSolution = () => {
    const isCorrect = 
      selected.suspect === currentMystery.solution.suspectId &&
      selected.weapon === currentMystery.solution.weaponId &&
      selected.location === currentMystery.solution.locationId;
    
    if (isCorrect) {
      setClues([...clues, "✅ Вы раскрыли дело!"]);
    } else {
      setClues([...clues, "❌ Неверно. Ищите новые улики."]);
    }
  };

  return { suspects, weapons, locations, clues, selected, setSelected, checkSolution };
};