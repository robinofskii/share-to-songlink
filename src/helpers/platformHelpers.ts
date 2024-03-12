/**
 * Sanitizes the platform share string to extract the song URL.
 * @param shareString - The platform share string.
 * @returns An object containing the sanitized song URL and a flag indicating if the share string is valid.
 */
export const sanatizePlatformShareString = (
  shareString: string
): {
  songUrl: string;
  isValid: boolean;
} => {
  const songUrlRegex = /https?:\/\/[^\s]+/g;

  const songUrl = shareString.match(songUrlRegex);
  if (songUrl) {
    return {
      songUrl: songUrl[0],
      isValid: true,
    };
  }

  return {
    songUrl: "",
    isValid: false,
  };
};
