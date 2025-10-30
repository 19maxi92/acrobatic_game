import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground 
} from 'react-native';

export default function Menu({ onStart, highScore }) {
  return (
    <ImageBackground 
      source={require('../assets/splash.png')}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🤸 Torre de Acróbatas</Text>
        <Text style={styles.subtitle}>La Plata, Buenos Aires</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📋 Cómo Jugar</Text>
          <Text style={styles.infoText}>
            🎯 Apilá acróbatas para construir la torre más alta
          </Text>
          <Text style={styles.infoText}>
            ⚡ Combos perfectos = más puntos
          </Text>
          <Text style={styles.infoText}>
            🔥 Mantené racha para bonificaciones
          </Text>
          <Text style={styles.infoText}>
            🎪 Más acróbatas = más dificultad y puntos
          </Text>
        </View>

        {highScore > 0 && (
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>🏆 Récord</Text>
            <Text style={styles.scoreValue}>{highScore}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>▶ JUGAR</Text>
        </TouchableOpacity>

        <View style={styles.credits}>
          <Text style={styles.creditsText}>
            Inspirado en los grupos de acrobacia de La Plata:
          </Text>
          <Text style={styles.creditsSmall}>
            Mamarula • AÉREA • La Instalacción • Redes Club de Circo
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
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 40,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 4,
    borderColor: '#3498DB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#34495E',
    textAlign: 'left',
    marginVertical: 4,
    lineHeight: 20,
  },
  scoreBox: {
    backgroundColor: 'rgba(241, 196, 15, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F39C12',
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  button: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: '#C0392B',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  credits: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  creditsText: {
    fontSize: 12,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '600',
  },
  creditsSmall: {
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});