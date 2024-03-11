import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useSonglinkApi } from "../../hooks";
import { DataView } from "../DataView";
import { useMemo, useState } from "react";
import { useShareIntent } from "expo-share-intent";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export const Home = () => {
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

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      {data && (
        <>
          <DataView data={data} />
          <Button onPress={reset} mode="outlined" icon={"sync"}>
            Reset
          </Button>
        </>
      )}

      {error && (
        <>
          <Text variant="titleMedium">Error: {error.message}</Text>
          <Button onPress={() => retry()}>Retry</Button>
        </>
      )}
      {!data && !error && (
        <>
          <Text variant="titleMedium">
            Share a song with the app to get started
          </Text>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
