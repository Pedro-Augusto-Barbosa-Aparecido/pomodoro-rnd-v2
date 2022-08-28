import React from 'react';
import { NativeBaseProvider, Center, StatusBar, Box } from "native-base";
import { Home } from './src/pages/Home';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold, Roboto_700Bold_Italic } from "@expo-google-fonts/roboto";
import { Spinner } from './src/components/Loader';
import { THEME } from './src/styles/theme';

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
        bg="gray.700"
        px={4}
        pt={10}
      >
        { fontsLoaded ? <Home /> : <Spinner />}
      </Box>
    </NativeBaseProvider>
  );  
}
