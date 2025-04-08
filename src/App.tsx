import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameScreen } from './screens/GameScreen';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <GameScreen />
      </main>
      {/* <footer className="app-footer">
        <p>Игра-головоломка в стиле детектива</p>
      </footer> */}
    </div>
  );
}

export default App;
