import React from "react";
import { View, Text } from "react-native";
import { SonglinkApiResponse } from "../../types";
import { openURL } from "expo-linking";
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
      {Object.entries(data.linksByPlatform).map(([platform, link]) => {
        return (
          <View key={platform}>
            <Text>{platform}</Text>
            <A href={link.url}>{link.url}</A>
          </View>
        );
      })}
    </View>
  );
};

export default DataView;
