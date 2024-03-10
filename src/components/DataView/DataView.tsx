import { View, Button, Text, Linking, StyleSheet } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { useShare } from "../../hooks";

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
      <Text>
        {data.entitiesByUniqueId[data.entityUniqueId].title} by{" "}
        {data.entitiesByUniqueId[data.entityUniqueId].artistName}
      </Text>
      {/* <A href={data.pageUrl}>Go to Songlink website</A> */}
      <View style={styles.buttonRow}>
        <Button
          title="Share"
          onPress={() => {
            share(data.pageUrl);
          }}
        />
        <Button
          title="Go to Songlink website"
          onPress={() => Linking.openURL(data.pageUrl)}
        />
      </View>
      {/* {Object.entries(data.linksByPlatform).map(([platform, link]) => {
        return (
          <View key={platform}>
            <Text>{platform}</Text>
            <A href={link.url}>{link.url}</A>
          </View>
        );
      })} */}
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
    gap: 10,
  },
  buttonRow: {
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
