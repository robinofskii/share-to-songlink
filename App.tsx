import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useSonglinkApi } from "./src/hooks/";
import { DataView } from "./src/components/DataView/DataView";
import { useMemo, useState } from "react";
import { useShareIntent } from "expo-share-intent";

export default function App() {
  const { hasShareIntent, shareIntent, resetShareIntent } = useShareIntent();

  const [songUrl, setSongUrl] = useState<string>("");
  const { data, loading, error, reset, retry } = useSonglinkApi({
    songUrl: songUrl,
  });

  useMemo(() => {
    if (hasShareIntent && shareIntent.text && shareIntent.text !== songUrl) {
      setSongUrl(shareIntent.text ?? "");
      resetShareIntent();
    }
  }, [hasShareIntent, shareIntent, resetShareIntent]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {data && <DataView data={data} />}
      {data || error ? (
        <Button title="Reset" onPress={reset} />
      ) : (
        <Text>Share a song URL to get started</Text>
      )}

      {loading && <Text>Loading...</Text>}
      {error && (
        <>
          <Text>Error: {error.message}</Text>
          <Button title="Retry" onPress={() => retry()} />
        </>
      )}
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
