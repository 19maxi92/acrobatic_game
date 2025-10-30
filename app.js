import React, { useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Menu from './components/Menu';
import Game from './components/Game';
import GameOver from './components/GameOver';

export default function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = (finalScore) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
    }
    setGameState('gameOver');
  };

  const returnToMenu = () => {
    setGameState('menu');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {gameState === 'menu' && (
        <Menu onStart={startGame} highScore={highScore} />
      )}
      {gameState === 'playing' && (
        <Game onGameOver={endGame} />
      )}
      {gameState === 'gameOver' && (
        <GameOver 
          score={score} 
          highScore={highScore}
          onRestart={startGame}
          onMenu={returnToMenu}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
});