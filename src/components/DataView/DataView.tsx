import { View, Linking, StyleSheet, Image } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { useShare } from "../../hooks";
import { Button, Surface, Text } from "react-native-paper";

interface Props {
  data: SonglinkApiResponse | null;
}

export const DataView = ({ data }: Props) => {
  const { share } = useShare();

  if (!data) {
    return null;
  }

  return (
    <Surface elevation={1} style={styles.container}>
      <Image
        source={{
          uri: data.entitiesByUniqueId[data.entityUniqueId].thumbnailUrl,
        }}
        style={styles.coverImage}
      />
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
          Share
        </Button>
        <Button onPress={() => Linking.openURL(data.pageUrl)}>
          Go to Songlink website
        </Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
  },
  coverImage: {
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  buttonRow: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
