import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { Home } from "./src/components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useMemo } from "react";

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === "dark"
        ? { ...MD3DarkTheme, colors: theme.dark }
        : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <Home />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
