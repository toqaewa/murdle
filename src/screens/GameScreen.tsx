import { useState, useEffect } from 'react';
import { GameBoard } from '../components/GameBoard/GameBoard';
import { ClueLog } from '../components/ClueLog/ClueLog';
import { generateClues } from '../utils/generateClues';
import { mysteries, suspects, weapons, locations } from '../data';
import { Suspect, Weapon, Location } from '../data/types';
import { useGameLogic } from '../hooks/useGameLogic';

export const GameScreen = () => {
    const {
        currentMystery,
        clues,
        result,
        checkSolution,
        resetGame,
        suspects,
        weapons,
        locations
      } = useGameLogic(mysteries);

      const handleSolve = (solution: {
        suspect: Suspect;
        weapon: Weapon;
        location: Location;
      }) => {
        checkSolution(solution);
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
            isSolved={result.isSolved}
        />
        <ClueLog clues={clues} />
        </div>
    </div>
    );
};