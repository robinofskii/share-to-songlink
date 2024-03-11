import { View, Linking, StyleSheet } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { useShare } from "../../hooks";
import { Button, Text } from "react-native-paper";

interface Props {
  data: SonglinkApiResponse | null;
}

export const DataView = ({ data }: Props) => {
  const { share } = useShare();

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        {data.entitiesByUniqueId[data.entityUniqueId].artistName}
      </Text>
      <Text variant="titleMedium">
        {data.entitiesByUniqueId[data.entityUniqueId].title}
      </Text>
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          icon={"share"}
          onPress={() => {
            share(data.pageUrl);
          }}
        >
          Share{" "}
        </Button>
        <Button onPress={() => Linking.openURL(data.pageUrl)}>
          Go to Songlink website
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 4,
  },
  buttonRow: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#f0f",
    borderRadius: 10,
  },
  secondaryButton: {
    backgroundColor: "#0ff",
    borderRadius: 10,
  },
});
