export interface BaseEntity {
    id: number;
    name: string;
} 

export interface Suspect extends BaseEntity {
    description: string;
    hint?: string; // Уникальная подсказка для персонажа
    hatesLocations?: number[]; // ID мест, которые персонаж ненавидит
    ownsWeapons?: number[];    // ID оружия, которым владеет
    alibi?: string;           // Алиби для невиновных
}
  
export interface Weapon extends BaseEntity {
    clue: string;
    requiresSkill?: boolean;  // Нужен ли навык для использования
    fingerprintId?: number;   // Чьи отпечатки (suspectId)
}
  
export interface Location extends BaseEntity {
    clue: string;
    isOutdoor?: boolean;
    hasSecurity?: boolean;
}

export interface Mystery {
    id: number;
    solution: {
        suspectId: number;
        weaponId: number;
        locationId: number;
    };
    clues: string[];
}