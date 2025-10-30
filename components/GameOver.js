import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ImageBackground 
} from 'react-native';

export default function GameOver({ score, highScore, onRestart, onMenu }) {
  const isNewRecord = score === highScore && score > 0;

  return (
    <ImageBackground 
      source={require('../assets/splash.png')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.emoji}>💥</Text>
        <Text style={styles.title}>¡Torre Caída!</Text>
        
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Puntuación Final</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        {isNewRecord && (
          <View style={styles.recordBox}>
            <Text style={styles.recordText}>🏆 ¡NUEVO RÉCORD! 🏆</Text>
          </View>
        )}

        {!isNewRecord && highScore > 0 && (
          <View style={styles.highScoreBox}>
            <Text style={styles.highScoreLabel}>Tu mejor récord</Text>
            <Text style={styles.highScoreValue}>{highScore}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={onRestart}>
            <Text style={styles.buttonText}>🔄 REINTENTAR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonSecondary} onPress={onMenu}>
            <Text style={styles.buttonTextSecondary}>🏠 MENÚ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsBox}>
          <Text style={styles.tipTitle}>💡 Consejos Pro:</Text>
          <Text style={styles.tipText}>
            • Precisión perfecta = combos x2
          </Text>
          <Text style={styles.tipText}>
            • Mantené racha de perfecto para bonificación 🔥
          </Text>
          <Text style={styles.tipText}>
            • Figuras grandes dan más puntos pero son más difíciles
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
    opacity: 0.3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  scoreBox: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2980B9',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
  },
  recordBox: {
    backgroundColor: 'rgba(241, 196, 15, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#F39C12',
  },
  recordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  highScoreBox: {
    backgroundColor: 'rgba(149, 165, 166, 0.8)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  highScoreLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  highScoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  buttonPrimary: {
    backgroundColor: '#27AE60',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#229954',
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: 'rgba(52, 73, 94, 0.8)',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2C3E50',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipsBox: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'rgba(52, 152, 219, 0.3)',
  },
  tipTitle: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 11,
    color: '#34495E',
    textAlign: 'left',
    marginVertical: 2,
    lineHeight: 16,
  },
});