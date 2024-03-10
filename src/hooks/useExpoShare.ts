import { SharingOptions, isAvailableAsync, shareAsync } from "expo-sharing";
import { useEffect } from "react";

export const useExpoShare = () => {
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
    shareAsync(message, options).catch((error) => {
      console.error("Error sharing", error);
    });
  };

  return { share };
};
