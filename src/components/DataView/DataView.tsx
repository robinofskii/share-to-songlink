import { View, Linking, StyleSheet, Image } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { useShare } from "../../hooks";
import { Button, Card, IconButton, Surface, Text } from "react-native-paper";

interface Props {
  data: SonglinkApiResponse | null;
}

export const DataView = ({ data }: Props) => {
  const { share } = useShare();

  if (!data) {
    return null;
  }

  return (
    <Card style={styles.card}>
      <Card.Cover
        style={styles.coverImage}
        source={{
          uri: data.entitiesByUniqueId[data.entityUniqueId].thumbnailUrl,
        }}
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">
          {data.entitiesByUniqueId[data.entityUniqueId].title}
        </Text>
        <Text variant="bodyMedium">
          {data.entitiesByUniqueId[data.entityUniqueId].artistName}
        </Text>
        <Card.Actions>
          <Button mode="text" onPress={() => Linking.openURL(data.pageUrl)}>
            Songlink website
          </Button>
          <Button
            mode="contained"
            icon={"share"}
            onPress={() => {
              share(data.pageUrl);
            }}
          >
            Share
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );

  // return (
  //   <Surface elevation={1} style={styles.container}>
  //     <Image
  //       source={{
  //         uri: data.entitiesByUniqueId[data.entityUniqueId].thumbnailUrl,
  //       }}
  //       style={styles.coverImage}
  //     />
  //     <Text variant="bodyLarge">
  //       {data.entitiesByUniqueId[data.entityUniqueId].artistName}
  //     </Text>
  //     <Text variant="titleMedium">
  //       {data.entitiesByUniqueId[data.entityUniqueId].title}
  //     </Text>
  //     <View style={styles.buttonRow}>
  //       <Button
  //         mode="contained"
  //         icon={"share"}
  //         onPress={() => {
  //           share(data.pageUrl);
  //         }}
  //       >
  //         Share
  //       </Button>
  //       <Button onPress={() => Linking.openURL(data.pageUrl)}>
  //         Go to Songlink website
  //       </Button>
  //     </View>
  //   </Surface>
  // );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
  },
  coverImage: {
    width: 300,
    height: 300,
  },
  cardContent: {
    padding: 16,
  },
});
