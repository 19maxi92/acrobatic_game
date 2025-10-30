import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  ImageBackground 
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAME_WIDTH = SCREEN_WIDTH - 40;
const GAME_HEIGHT = 500;

// Figuras de acróbatas (pueden ser 1, 2 o 3 acróbatas)
const ACROBAT_FORMATIONS = [
  { emoji: '🤸', width: 50, count: 1, name: 'Solo' },
  { emoji: '🤸🤸', width: 80, count: 2, name: 'Dúo' },
  { emoji: '🤸🤸🤸', width: 110, count: 3, name: 'Trío' },
  { emoji: '🧘', width: 50, count: 1, name: 'Parada' },
  { emoji: '🤾🤾', width: 80, count: 2, name: 'Salto' },
];

export default function Game({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [tower, setTower] = useState([{ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 30, width: 100 }]);
  const [fallingPiece, setFallingPiece] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const gameLoopRef = useRef(null);

  useEffect(() => {
    // Crear primera pieza
    createNewPiece();
  }, []);

  useEffect(() => {
    if (!gameActive || !fallingPiece) return;

    gameLoopRef.current = setInterval(() => {
      setFallingPiece(prev => {
        if (!prev) return null;
        const newY = prev.y + prev.speed;
        
        if (newY >= GAME_HEIGHT - 50) {
          endGameNow();
          return prev;
        }
        
        return { ...prev, y: newY, speed: Math.min(prev.speed + 0.1, 6) };
      });
    }, 16);

    return () => clearInterval(gameLoopRef.current);
  }, [gameActive, fallingPiece]);

  const createNewPiece = () => {
    const formation = ACROBAT_FORMATIONS[Math.floor(Math.random() * ACROBAT_FORMATIONS.length)];
    const randomX = Math.random() * (GAME_WIDTH - formation.width) + formation.width / 2;
    
    setFallingPiece({
      x: randomX,
      y: 0,
      width: formation.width,
      emoji: formation.emoji,
      name: formation.name,
      count: formation.count,
      speed: 2 + score * 0.15,
    });
  };

  const dropPiece = () => {
    if (!fallingPiece || !gameActive) return;

    const lastInTower = tower[tower.length - 1];
    const overlap = Math.min(
      fallingPiece.x + fallingPiece.width / 2,
      lastInTower.x + lastInTower.width / 2
    ) - Math.max(
      fallingPiece.x - fallingPiece.width / 2,
      lastInTower.x - lastInTower.width / 2
    );

    if (overlap > 10 && fallingPiece.y >= lastInTower.y - 60 && fallingPiece.y <= lastInTower.y - 10) {
      const newWidth = overlap;
      const newX = (Math.min(fallingPiece.x + fallingPiece.width / 2, lastInTower.x + lastInTower.width / 2) +
                    Math.max(fallingPiece.x - fallingPiece.width / 2, lastInTower.x - lastInTower.width / 2)) / 2;
      
      const newPiece = {
        x: newX,
        y: lastInTower.y - 45,
        width: newWidth,
        emoji: fallingPiece.emoji,
        name: fallingPiece.name,
      };
      
      setTower(prev => [...prev, newPiece]);
      
      // Calcular puntos basados en precisión y cantidad de acróbatas
      const precision = overlap / fallingPiece.width;
      const points = Math.floor(precision * 100) * fallingPiece.count;
      setScore(prev => prev + points);
      
      createNewPiece();
    } else {
      endGameNow();
    }
  };

  const endGameNow = () => {
    setGameActive(false);
    clearInterval(gameLoopRef.current);
    setTimeout(() => onGameOver(score), 500);
  };

  return (
    <ImageBackground 
      source={require('../assets/splash.png')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Puntos</Text>
            <Text style={styles.scoreValue}>{score}</Text>
          </View>
          <Text style={styles.landmark}>🏛️ Catedral La Plata</Text>
        </View>

        <TouchableOpacity 
          style={styles.gameArea} 
          onPress={dropPiece}
          activeOpacity={1}
        >
          <View style={styles.gameContainer}>
            {/* Pieza cayendo */}
            {fallingPiece && (
              <View 
                style={[
                  styles.fallingPiece,
                  { 
                    left: fallingPiece.x - fallingPiece.width / 2,
                    top: fallingPiece.y,
                    width: fallingPiece.width,
                  }
                ]}
              >
                <Text style={styles.acrobatEmoji}>{fallingPiece.emoji}</Text>
                <Text style={styles.acrobatName}>{fallingPiece.name}</Text>
              </View>
            )}

            {/* Torre */}
            {tower.map((piece, index) => (
              <View
                key={index}
                style={[
                  styles.towerPiece,
                  { 
                    left: piece.x - piece.width / 2,
                    top: piece.y,
                    width: piece.width,
                  }
                ]}
              >
                {index === 0 ? (
                  <View style={styles.base}>
                    <Text style={styles.baseText}>BASE</Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.acrobatEmoji}>{piece.emoji}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </TouchableOpacity>

        <Text style={styles.instruction}>
          👆 Tocá la pantalla para soltar a los acróbatas
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scoreBox: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderRadius: 15,
    padding: 15,
    borderWidth: 3,
    borderColor: '#2980B9',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  landmark: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  gameArea: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    backgroundColor: 'rgba(236, 240, 241, 0.7)',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#34495E',
    overflow: 'hidden',
  },
  gameContainer: {
    flex: 1,
    position: 'relative',
  },
  fallingPiece: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  towerPiece: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acrobatEmoji: {
    fontSize: 28,
    textAlign: 'center',
  },
  acrobatName: {
    fontSize: 10,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  base: {
    backgroundColor: '#E67E22',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%',
  },
  baseText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  instruction: {
    marginTop: 20,
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 15,
    width: '90%',
  },
});