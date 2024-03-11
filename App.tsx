import { PaperProvider } from "react-native-paper";
import { Home } from "./src/components";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Home />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
