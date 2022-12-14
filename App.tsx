import React from 'react';
import { NativeBaseProvider, StatusBar, Box } from "native-base";
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold, Roboto_700Bold_Italic } from "@expo-google-fonts/roboto";
import { Spinner } from './src/components/Loader';
import { THEME } from './src/styles/theme';
import { Routes } from './src/Routes';
import { TimerContextProvider } from './src/context/TimerContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold, Roboto_700Bold_Italic });

  return (
    <NativeBaseProvider
      theme={THEME}
    >
      <StatusBar 
        barStyle='light-content'
        backgroundColor={"transparent"}
        translucent
      />
      <Box 
        flex={1}
      >
        <TimerContextProvider>
          { fontsLoaded ? <Routes /> : <Spinner background />}
        </TimerContextProvider>
      </Box>
    </NativeBaseProvider>
  );  
}
