import { Suspect, Weapon, Location } from '../data/types';
import { CLUE_TEMPLATES } from "../data/clueTemplates";
import { randomChoice, shuffleArray } from "./helpers";

interface Solution {
  suspect: Suspect;
  weapon: Weapon;
  location: Location;
}

/**
 * Основная функция генерации подсказок.
 * @param solution - Решение {suspect, weapon, location}
 * @param count - Желаемое количество подсказок (default: 5)
 */
export const generateClues = (
  solution: Solution,
  count: number = 5
): string[] => {
  const allClues: string[] = [
    ...getBasicClues(solution),      // Обязательные подсказки
    ...getSmartClues(solution),      // Умные подсказки (связи между данными)
    ...getRandomTemplateClues(solution, count)  // Случайные из шаблонов
  ];

  return shuffleArray(allClues).slice(0, count);
};

// --- Вспомогательные функции ---

/** Базовые подсказки (отпечатки, оружие, место) */
const getBasicClues = ({ suspect, weapon, location }: Solution): string[] => [
  `Отпечатки: ${suspect.name}`,
  `Оружие: ${weapon.name}`,
  `Место: ${location.name}`
];

/** Умные подсказки на основе связей в данных */
const getSmartClues = ({ suspect, weapon, location }: Solution): string[] => {
  const clues: string[] = [];

  if (suspect.ownsWeapons?.includes(weapon.id)) {
    clues.push(`${suspect.name} владел этим ${weapon.name.toLowerCase()}`);
  }

  if (location.hasSecurity) {
    clues.push(`В ${location.name} есть камеры наблюдения.`);
  }

  return clues;
};

/** Случайные подсказки из шаблонов CLUE_TEMPLATES */
const getRandomTemplateClues = (
  { suspect, weapon, location }: Solution,
  maxCount: number
): string[] => {
  const clues: string[] = [];
  const availableTemplates = Object.values(CLUE_TEMPLATES).flat();

  while (clues.length < maxCount && availableTemplates.length > 0) {
    const template = randomChoice(availableTemplates);
    const clue = template
      .replace(/{suspect}/g, suspect.name)
      .replace(/{weapon}/g, weapon.name)
      .replace(/{location}/g, location.name);

    if (!clues.includes(clue)) {
      clues.push(clue);
    }
  }

  return clues;
};