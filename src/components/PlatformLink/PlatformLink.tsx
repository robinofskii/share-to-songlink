import { Button } from "react-native";
import type { Platform } from "../../types";

type PlatformLinkPropsT = {
  platform: Platform;
};

export const PlatformLink = ({ platform }: PlatformLinkPropsT) => {
  return <Button title={platform} onPress={() => {}} />;
};
