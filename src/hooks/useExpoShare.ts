import { SharingOptions, isAvailableAsync, shareAsync } from "expo-sharing";
import { useEffect } from "react";
import { Platform, Share } from "react-native";

export const useExpoShare = () => {
  const devicePlatform = Platform.OS;

  useEffect(() => {
    isAvailableAsync()
      .then((isAvailable) => {
        if (!isAvailable) {
          alert("Sharing via app is not available");
        }
      })
      .catch((error) => {
        console.error("Error checking if sharing is available", error);
      });
  });
  const share = async (message: string, options: SharingOptions = {}) => {
    // if (devicePlatform === "android") {
    Share.share({
      message,
    });
    return;
    // }
    // shareAsync(message, options).catch((error) => {
    //   console.error("Error sharing", error);
    // });
  };

  return { share };
};
