// App.tsx
import React, { useState, useEffect } from 'react';
import { getCredentials } from './src/services/credentials';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import InstructionsScreen from './src/screens/InstructionsScreen';

import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper'; 
import { lightTheme, darkTheme } from './src/theme'; 

import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

export default function App() {
  type Screen = 'login' | 'dashboard' | 'instructions';
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

    // --- 2. Load the fonts ---
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold, // You can load multiple weights
  });

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


  useEffect(() => {
    const checkCredentials = async () => {
      const creds = await getCredentials();
      if (creds) {
        setCurrentScreen('dashboard');
      }
    };
    checkCredentials();
  }, []);

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    if (currentScreen === 'instructions') {
      return <InstructionsScreen onBack={() => setCurrentScreen('login')} />;
    }
    if (currentScreen === 'dashboard') {
      return <DashboardScreen onLogout={handleLogout} />;
    }
    return <LoginScreen onConnect={handleLogin} onShowInstructions={() => setCurrentScreen('instructions')} />;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      {renderScreen()}
    </PaperProvider>
  );
}