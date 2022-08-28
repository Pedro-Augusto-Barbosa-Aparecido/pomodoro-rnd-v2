import React from 'react';
import { NativeBaseProvider, Center, StatusBar } from "native-base";
import { Home } from './src/pages/Home';
import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Spinner } from './src/components/Loader';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider>
      <StatusBar 
        barStyle='light-content'
        backgroundColor={"transparent"}
        translucent
      />
      <Center 
        flex={1}
        bg="gray.700"
      >
        { fontsLoaded ? <Home /> : <Spinner />}
      </Center>
    </NativeBaseProvider>
  );  
}
