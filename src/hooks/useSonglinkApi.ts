import { useMemo, useState } from "react";
import { api } from "../helpers/SonglinkApi";
import { SonglinkApiResponse } from "../types";
import { useShare } from "./useExpoShare";
import { sanatizePlatformShareString } from "../helpers";

type fetchDataParamsT = {
  platformLink: string;
  userCountry?: string;
  songIfSingle?: boolean;
};

type useSonglinkApiT = {
  songUrl: string;
};

export const useSonglinkApi = ({ songUrl }: useSonglinkApiT) => {
  const { share } = useShare();

  const [data, setData] = useState<SonglinkApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({
    platformLink,
    userCountry,
    songIfSingle = true,
  }: fetchDataParamsT) => {
    setLoading(true);
    const sanitizedShareString = sanatizePlatformShareString(platformLink);

    if (!sanitizedShareString.isValid) {
      setError(new Error("Invalid share string"));
      setLoading(false);
      return;
    }

    api
      .get(`/links`, {
        params: {
          url: sanitizedShareString.songUrl,
          songIfSingle: songIfSingle,
          userCountry: userCountry,
        },
      })
      .then((response) => {
        setData(response.data);
        share(response.data.pageUrl, {
          dialogTitle: "Share this song",
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const retry = (url: string = songUrl) => {
    if (url) {
      fetchData({ platformLink: songUrl });
    }
    setError(null);
  };

  useMemo(() => {
    if (songUrl) {
      fetchData({ platformLink: songUrl });
    }
  }, [songUrl]);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return { data, loading, error, fetchData, reset, retry };
};
