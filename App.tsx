import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import useSonglinkApi from "./src/hooks/useSonglinkApi";
import DataView from "./src/components/DataView/DataView";

const TEST_URL =
  "https://open.spotify.com/track/67Lj6xHDrizXIDDFKYwdae?si=a09cc5f2f0fb49cc";

export default function App() {
  const { data, loading, error, fetchData, reset } = useSonglinkApi();

  return (
    <View style={styles.container}>
      {data ? (
        <Button title="Reset" onPress={reset} />
      ) : (
        <Button
          title="Test Request"
          onPress={() => {
            fetchData({
              platformLink: TEST_URL,
              userCountry: "NL",
            });
          }}
        />
      )}

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      {data && <DataView data={data} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
