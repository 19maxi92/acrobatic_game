import { Text, View } from 'react-native';

export default function App() {
  console.log('=== APP CARGANDO ===');
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 40, color: 'white' }}>FUNCIONA!</Text>
    </View>
  );
}
