import { View, Button, Text } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { A } from "@expo/html-elements";
import { shareAsync } from "expo-sharing";
import { useExpoShare } from "../../hooks";

interface Props {
  data: SonglinkApiResponse | null;
}

const DataView = ({ data }: Props) => {
  const { share } = useExpoShare();
  if (!data) {
    return null;
  }

  return (
    <View>
      <Text>
        {data.entitiesByUniqueId[data.entityUniqueId].title} by{" "}
        {data.entitiesByUniqueId[data.entityUniqueId].artistName}
      </Text>
      {/* <A href={data.pageUrl}>Go to Songlink website</A> */}
      <Button
        title="Share"
        onPress={() => {
          share(data.pageUrl);
        }}
      />
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

export default DataView;
