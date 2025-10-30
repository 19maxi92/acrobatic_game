import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TestApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤸 Torre de Acróbatas</Text>
      <Text style={styles.subtitle}>Test - Si ves esto, React funciona!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>JUGAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
