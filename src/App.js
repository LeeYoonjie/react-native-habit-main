import React from "react";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./AppNavigator";

export default function App() {
  return (
    <React.Fragment>
      <AppNavigator />
      <StatusBar style="auto" />
    </React.Fragment>
  );
}
