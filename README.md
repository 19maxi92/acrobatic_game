# 🤸 Torre de Acróbatas LP

Un juego móvil acrobático tipo "Stack Tower" donde construís una torre de acróbatas en diferentes formaciones. Inspirado en los grupos de acrobacia de La Plata, Argentina.

## 🎮 Características del Juego

- **Múltiples Formaciones**: 14 formaciones diferentes de acróbatas (solos, dúos, tríos y cuartetos)
- **Sistema de Combos**: Conseguí combos por colocaciones precisas para multiplicar tus puntos
- **Racha Perfecta**: Mantené una racha de colocaciones perfectas para bonificaciones 🔥
- **Física de Tambaleo**: La torre se tambalea cuando la precisión no es perfecta
- **Feedback Háptico**: Vibración para diferentes tipos de colocaciones
- **Dificultad Progresiva**: El juego se vuelve más difícil a medida que avanzás
- **Animaciones Fluidas**: Efectos visuales y animaciones usando React Native Reanimated

## 🎯 Cómo Jugar

1. Los acróbatas caen desde la parte superior
2. Tocá la pantalla para soltar al acróbata
3. Tratá de apilarlos con la mayor precisión posible
4. Más precisión = más puntos
5. Colocaciones perfectas (>95% precisión) generan combos
6. Mantené la racha para multiplicadores

## 🚀 Instalación y Desarrollo

### ⚡ Inicio Rápido (Recomendado)

1. **Instala las dependencias**:
   ```bash
   npm install
   ```

2. **Instala Expo Go en tu celular**:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

3. **Inicia el juego**:
   ```bash
   npm start
   ```

4. **Escanea el código QR** con Expo Go (Android) o la Cámara (iOS)

¡Y listo! El juego se ejecutará en tu celular.

### 📖 Guía Completa

Para instrucciones detalladas de todas las formas de ejecutar el juego, consultá [COMO_EJECUTAR.md](./COMO_EJECUTAR.md)

## 📱 Generar APK para Android

### Opción 1: Build Rápido (Recomendado)

```bash
npm run build:android
```

Este comando genera un APK de preview usando EAS Build.

### Opción 2: Build de Producción

```bash
npm run build:android:production
```

### Instalación de EAS CLI (si no lo tenés)

```bash
npm install -g eas-cli
```

Luego iniciá sesión:

```bash
eas login
```

### Configuración Inicial de EAS

```bash
eas build:configure
```

## 🎨 Estructura del Proyecto

```
acrobatic_game/
├── app.js                 # Componente principal
├── components/
│   ├── Game.js           # Lógica principal del juego
│   ├── Menu.js           # Pantalla de menú
│   └── GameOver.js       # Pantalla de game over
├── assets/               # Imágenes e íconos
├── app.json             # Configuración de Expo
├── eas.json             # Configuración de EAS Build
└── package.json         # Dependencias
```

## 🎪 Sistema de Puntuación

La puntuación se calcula con:

```
Puntos = 50 × Precisión × Cantidad_Acróbatas × Multiplicador_Combo × Dificultad
```

- **Precisión**: 0-1 (100% = colocación perfecta)
- **Cantidad de Acróbatas**: 1-4 según la formación
- **Multiplicador de Combo**: 1 + (combo × 0.2)
- **Dificultad**: 1-4 según la complejidad de la formación

## 🔥 Tipos de Colocaciones

- **Perfecta (>95%)**: +1 combo, racha perfecta, vibración media
- **Buena (>75%)**: +1 combo, vibración suave
- **Regular (<75%)**: Se reinicia el combo, vibración fuerte

## 🛠️ Tecnologías Utilizadas

- React Native
- Expo
- React Native Reanimated (animaciones)
- Expo Haptics (vibración)
- Expo Image (optimización de imágenes)

## 📜 Licencia

Este proyecto está inspirado en los grupos de acrobacia de La Plata:
- Mamarula
- AÉREA
- La Instalacción
- Redes Club de Circo

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abrí un issue o pull request.

## 📧 Contacto

Para consultas o sugerencias sobre el juego, por favor contactá al equipo de desarrollo.

---

**¡Disfrutá construyendo la torre más alta de acróbatas! 🤸🎪**
