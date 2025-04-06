import { Suspect, Weapon, Location } from "../data";

interface Solution {
  suspect: Suspect;
  weapon: Weapon;
  location: Location;
}

export const generateSmartClues = (solution: Solution): string[] => {
  const { suspect, weapon, location } = solution;
  const clues: string[] = [];

  // 1. Подсказки на основе отношений персонажа
  if (suspect.hatesLocations?.includes(location.id)) {
    clues.push(`${suspect.name} ненавидит ${location.name} и избегал бы это место.`);
  }

  // 2. Подсказки про оружие
  if (weapon.fingerprintId && weapon.fingerprintId !== suspect.id) {
    clues.push(`На ${weapon.name} найдены чужие отпечатки.`);
  }

  // 3. Подсказки про место
  if (location.hasSecurity) {
    clues.push(`В ${location.name} есть камеры — проверьте записи.`);
  }

  // 4. Динамические подсказки (пример)
  const randomHour = Math.floor(Math.random() * 12) + 10; // 10-22 часа
  clues.push(`Преступление произошло около ${randomHour}:00.`);

  return clues;
};