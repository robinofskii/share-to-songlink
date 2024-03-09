import { useState } from "react";
import { api } from "../helpers/SonglinkApi";
import { SonglinkApiResponse } from "../types";

type fetchDataParamsT = {
  platformLink: string;
  userCountry?: string;
  songIfSingle?: boolean;
};

const useSonglinkApi = () => {
  const [data, setData] = useState<SonglinkApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({
    platformLink,
    userCountry,
    songIfSingle = true,
  }: fetchDataParamsT) => {
    api
      .get(`/links`, {
        params: {
          url: platformLink,
          songIfSingle: songIfSingle,
          userCountry: userCountry,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return { data, loading, error, fetchData, reset };
};

export default useSonglinkApi;
