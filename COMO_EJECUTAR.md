# 🚀 Cómo Ejecutar el Juego Torre de Acróbatas

## ⚡ Opción 1: Modo Desarrollo (RECOMENDADO para probar)

Esta es la forma más rápida de probar el juego en tu celular:

### Paso 1: Instalar Expo Go en tu celular
- **Android**: [Descarga Expo Go desde Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [Descarga Expo Go desde App Store](https://apps.apple.com/app/expo-go/id982107779)

### Paso 2: Iniciar el servidor de desarrollo

```bash
npm start
```

### Paso 3: Escanear el código QR
- Se abrirá una página web con un código QR
- **Android**: Abre Expo Go y escanea el QR
- **iOS**: Usa la app de Cámara nativa y escanea el QR

¡Listo! El juego se cargará en tu celular y podrás probarlo.

---

## 📦 Opción 2: Generar APK con EAS Build (para distribución)

Esta opción genera un archivo APK que podés instalar en cualquier Android sin necesidad de Expo Go.

### Requisitos previos

1. **Instalar EAS CLI globalmente**:
   ```bash
   npm install -g eas-cli
   ```

2. **Crear cuenta en Expo** (si no tenés):
   - Ve a https://expo.dev
   - Regístrate gratis

3. **Iniciar sesión**:
   ```bash
   eas login
   ```

### Generar el APK

```bash
# Build de preview (recomendado para pruebas)
npm run build:android

# O build de producción
npm run build:android:production
```

El proceso tarda 10-15 minutos. Al finalizar, te da un link para descargar el APK.

---

## 🖥️ Opción 3: Ejecutar en Web (para probar rápido)

```bash
npm run web
```

Se abrirá en tu navegador. **Nota**: Algunas funciones como vibración no funcionarán en web.

---

## 🔧 Opción 4: Ejecutar en Emulador Android

### Requisitos
- Android Studio instalado
- Emulador Android configurado

### Comando
```bash
npm run android
```

Esto abrirá automáticamente el emulador y cargará el juego.

---

## ⚠️ Solución de Problemas

### Error: "Cannot find module expo"
```bash
npm install
```

### Error: "Metro bundler error"
```bash
# Limpiar cache
npm start -- --clear
```

### Error: "EAS Build requires authentication"
```bash
eas login
```

### Error al escanear QR en Expo Go
- Asegurate de que tu celular y computadora estén en la misma red WiFi
- Si sigue sin funcionar, usa el modo tunnel:
  ```bash
  npm start -- --tunnel
  ```

---

## 📱 Recomendación Final

**Para probar y desarrollar**: Usa **Opción 1** (Expo Go)
- Es instantáneo
- Ves cambios en tiempo real
- No necesita configuración adicional

**Para distribuir a otros**: Usa **Opción 2** (EAS Build)
- Genera un APK instalable
- No necesita Expo Go
- Puede compartirse fácilmente

---

## 🎮 Controles del Juego

- **Toca la pantalla**: Soltar el acróbata
- **Objetivo**: Apilar con precisión para conseguir combos
- **Racha perfecta**: Mantené >95% de precisión

¡Divertite! 🤸🎪
