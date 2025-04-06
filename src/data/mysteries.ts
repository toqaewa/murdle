import { suspects, weapons, locations } from ".";

export interface Mystery {
  id: number;
  solution: {
    suspectId: number;
    weaponId: number;
    locationId: number;
  };
  clues: string[];
}

export const mysteries: Mystery[] = [
  {
    id: 1,
    solution: {
      suspectId: suspects[0].id,
      weaponId: weapons[1].id,
      locationId: locations[0].id,
    },
    clues: [
      "На полу найдены фиолетовые нити",
      "В чашке обнаружен яд",
    ],
  },
];