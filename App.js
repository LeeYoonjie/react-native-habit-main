import React from "react"; // React.Fragment를 사용하기 위해 React를 import
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AppNavigator from "./src/AppNavigator";

export default function App() {
  useEffect(() => {
    async function hideSplashScreen() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await SplashScreen.hideAsync();
      } catch (e) {
        console.error(e);
      }
    }
    hideSplashScreen();
  }, []);

  return (
    <React.Fragment>
      <AppNavigator />
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
