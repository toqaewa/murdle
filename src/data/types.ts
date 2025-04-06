export interface Suspect {
    id: number;
    name: string;
    description: string;
    hint?: string; // Уникальная подсказка для персонажа
    hatesLocations?: number[]; // ID мест, которые персонаж ненавидит
    ownsWeapons?: number[];    // ID оружия, которым владеет
    alibi?: string;           // Алиби для невиновных
}
  
export interface Weapon {
    id: number;
    name: string;
    clue: string;
    requiresSkill?: boolean;  // Нужен ли навык для использования
    fingerprintId?: number;   // Чьи отпечатки (suspectId)
}
  
export interface Location {
    id: number;
    name: string;
    clue: string;
    isOutdoor?: boolean;
    hasSecurity?: boolean;
}