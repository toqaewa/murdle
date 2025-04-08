import { suspects, weapons, locations } from ".";
import type { Mystery } from "./types";

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
      "Камеры в библиотеке не работали",
    ],
  },
];