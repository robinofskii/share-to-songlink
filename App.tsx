import { PaperProvider } from "react-native-paper";
import { Home } from "./src/components";

export default function App() {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
}
