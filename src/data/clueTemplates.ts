export const CLUE_TEMPLATES = {
    // Подсказки, связанные с персонажами
    SUSPECT: [
      "{suspect} был замечен около {location}.",
      "Кто-то видел {suspect} с {weapon}.",
      "{suspect} не появлялся в {location}."
    ],
  
    // Подсказки, связанные с оружием
    WEAPON: [
      "{weapon} найден в {location}.",
      "На {weapon} есть {suspect}.",
      "{weapon} пропал из {location}."
    ],
  
    // Подсказки, связанные с местами
    LOCATION: [
      "В {location} слышали крик.",
      "Дверь в {location} была заперта.",
      "В {location} нашли следы {weapon}."
    ]
  };