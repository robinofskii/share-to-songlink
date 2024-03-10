import { View, Text } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { A } from "@expo/html-elements";

interface Props {
  data: SonglinkApiResponse | null;
}

const DataView = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <View>
      <A href={data.pageUrl}>Go to Songlink website</A>
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
