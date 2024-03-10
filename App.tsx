import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import useSonglinkApi from "./src/hooks/useSonglinkApi";
import DataView from "./src/components/DataView/DataView";
import React, { useMemo } from "react";
import { useShareIntent } from "expo-share-intent";

const TEST_URL =
  "https://open.spotify.com/track/67Lj6xHDrizXIDDFKYwdae?si=a09cc5f2f0fb49cc";

export default function App() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

  const [song, setSong] = React.useState<string>("");
  const { data, loading, error, fetchData, reset } = useSonglinkApi({ song });

  useMemo(() => {
    if (hasShareIntent) {
      setSong(shareIntent.text ?? "");
      resetShareIntent();
    }
  }, [hasShareIntent, shareIntent, resetShareIntent]);

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
      {error && <Text>Error: {error.message}</Text>}
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
