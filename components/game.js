import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated
} from 'react-native';
import * as Haptics from 'expo-haptics';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAME_WIDTH = SCREEN_WIDTH - 40;
const GAME_HEIGHT = 500;

// Formaciones de acróbatas expandidas con más variedad
const ACROBAT_FORMATIONS = [
  // Formaciones individuales
  { emoji: '🤸', width: 50, count: 1, name: 'Voltereta', difficulty: 1 },
  { emoji: '🧘', width: 50, count: 1, name: 'Parada', difficulty: 1 },
  { emoji: '🤾', width: 50, count: 1, name: 'Salto', difficulty: 1 },
  { emoji: '🕺', width: 50, count: 1, name: 'Danza', difficulty: 1 },
  { emoji: '🤹', width: 50, count: 1, name: 'Malabar', difficulty: 1 },

  // Formaciones dúo
  { emoji: '🤸🤸', width: 80, count: 2, name: 'Dúo Voltereta', difficulty: 2 },
  { emoji: '🧘🧘', width: 80, count: 2, name: 'Dúo Parada', difficulty: 2 },
  { emoji: '🤾🤾', width: 80, count: 2, name: 'Dúo Salto', difficulty: 2 },
  { emoji: '🕺💃', width: 80, count: 2, name: 'Pareja Baile', difficulty: 2 },

  // Formaciones trío
  { emoji: '🤸🤸🤸', width: 110, count: 3, name: 'Trío Voltereta', difficulty: 3 },
  { emoji: '🧘🧘🧘', width: 110, count: 3, name: 'Trío Parada', difficulty: 3 },
  { emoji: '🤾🤸🤾', width: 110, count: 3, name: 'Trío Mixto', difficulty: 3 },

  // Formaciones especiales
  { emoji: '🤹🤹🤹🤹', width: 140, count: 4, name: 'Cuarteto Malabar', difficulty: 4 },
  { emoji: '🕺💃🕺', width: 110, count: 3, name: 'Trío Danza', difficulty: 3 },
];

export default function Game({ onGameOver }) {
  const [score, setScore] = useState(0);
  const [tower, setTower] = useState([{ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 30, width: 100 }]);
  const [fallingPiece, setFallingPiece] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [perfectStreak, setPerfectStreak] = useState(0);
  const [wobbleIntensity, setWobbleIntensity] = useState(0);

  const gameLoopRef = useRef(null);
  const wobbleAnim = useRef(new Animated.Value(0)).current;
  const comboAnim = useRef(new Animated.Value(0)).current;

  const createNewPiece = useCallback(() => {
    // Dificultad progresiva: al principio más piezas fáciles, luego más difíciles
    const level = Math.floor(score / 200);
    let availableFormations = ACROBAT_FORMATIONS;

    if (level < 2) {
      // Primeros niveles: solo individuales y dúos
      availableFormations = ACROBAT_FORMATIONS.filter(f => f.difficulty <= 2);
    } else if (level < 5) {
      // Niveles medios: hasta tríos
      availableFormations = ACROBAT_FORMATIONS.filter(f => f.difficulty <= 3);
    }
    // Niveles altos: todas las formaciones

    const formation = availableFormations[Math.floor(Math.random() * availableFormations.length)];
    const randomX = Math.random() * (GAME_WIDTH - formation.width) + formation.width / 2;

    setFallingPiece({
      x: randomX,
      y: 0,
      width: formation.width,
      emoji: formation.emoji,
      name: formation.name,
      count: formation.count,
      difficulty: formation.difficulty,
      speed: 2 + Math.min(level * 0.15, 2),
    });
  }, [score]);

  const endGameNow = useCallback(() => {
    setGameActive(false);
    clearInterval(gameLoopRef.current);
    setTimeout(() => onGameOver(score), 500);
  }, [score, onGameOver]);

  useEffect(() => {
    createNewPiece();
  }, [createNewPiece]);

  // Efecto de tambaleo de la torre
  useEffect(() => {
    if (wobbleIntensity > 0) {
      Animated.sequence([
        Animated.timing(wobbleAnim, {
          toValue: wobbleIntensity,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: -wobbleIntensity,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: wobbleIntensity * 0.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => setWobbleIntensity(0));
    }
  }, [wobbleIntensity, wobbleAnim]);

  // Animación de combo
  useEffect(() => {
    if (showCombo && combo > 1) {
      Animated.sequence([
        Animated.spring(comboAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.delay(1000),
        Animated.timing(comboAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowCombo(false));
    }
  }, [showCombo, combo, comboAnim]);

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

        return { ...prev, y: newY, speed: Math.min(prev.speed + 0.08, 5) };
      });
    }, 16);

    return () => clearInterval(gameLoopRef.current);
  }, [gameActive, fallingPiece, endGameNow]);

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

      // Calcular precisión y puntos
      const precision = overlap / fallingPiece.width;
      const isPerfect = precision > 0.95;

      // Sistema de combo
      let currentCombo = combo;
      if (isPerfect) {
        currentCombo += 1;
        setPerfectStreak(prev => prev + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } else if (precision > 0.75) {
        currentCombo += 1;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        currentCombo = 0;
        setPerfectStreak(0);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }

      setCombo(currentCombo);
      if (currentCombo > 1) {
        setShowCombo(true);
      }

      // Calcular puntos: base * precisión * acróbatas * multiplicador de combo * dificultad
      const basePoints = 50;
      const comboMultiplier = 1 + (currentCombo * 0.2);
      const points = Math.floor(
        basePoints * precision * fallingPiece.count * comboMultiplier * fallingPiece.difficulty
      );

      setScore(prev => prev + points);

      // Efecto de tambaleo: más intenso si el solapamiento es bajo
      const wobbleAmount = Math.max(0, (1 - precision) * 15);
      setWobbleIntensity(wobbleAmount);

      createNewPiece();
    } else {
      // Fallo al colocar
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      endGameNow();
    }
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
          <View style={styles.rightInfo}>
            <Text style={styles.landmark}>🏛️ Catedral LP</Text>
            {perfectStreak > 0 && (
              <View style={styles.streakBox}>
                <Text style={styles.streakText}>🔥 {perfectStreak}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Indicador de Combo */}
        {showCombo && combo > 1 && (
          <Animated.View
            style={[
              styles.comboIndicator,
              {
                opacity: comboAnim,
                transform: [
                  {
                    scale: comboAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.2],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.comboText}>
              {combo}x COMBO! ⚡
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.gameArea}
          onPress={dropPiece}
          activeOpacity={1}
        >
          <Animated.View
            style={[
              styles.gameContainer,
              {
                transform: [{ rotate: wobbleAnim.interpolate({
                  inputRange: [-15, 15],
                  outputRange: ['-3deg', '3deg'],
                }) }],
              },
            ]}
          >
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
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.bottomInfo}>
          <Text style={styles.instruction}>
            👆 Tocá para soltar · Torre: {tower.length - 1}
          </Text>
        </View>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 10,
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
  rightInfo: {
    alignItems: 'flex-end',
    gap: 8,
  },
  landmark: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  streakBox: {
    backgroundColor: 'rgba(230, 126, 34, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E67E22',
  },
  streakText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  comboIndicator: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    backgroundColor: 'rgba(46, 204, 113, 0.95)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#27AE60',
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  comboText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  bottomInfo: {
    marginTop: 15,
    width: '90%',
  },
  instruction: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(52, 73, 94, 0.3)',
  },
});