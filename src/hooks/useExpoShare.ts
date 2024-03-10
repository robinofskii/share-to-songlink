import { Share, ShareOptions } from "react-native";

export const useShare = () => {
  const share = async (message: string, options: ShareOptions = {}) => {
    Share.share({
      message,
    });
    return;
  };

  return { share };
};
