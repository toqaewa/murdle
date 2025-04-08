import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameScreen } from './screens/GameScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MURDLE</h1>
      </header>
      <main>
        <GameScreen />
      </main>
      <footer className="app-footer">
        <p>Игра-головоломка в стиле детектива</p>
      </footer>
    </div>
  );
}

export default App;
