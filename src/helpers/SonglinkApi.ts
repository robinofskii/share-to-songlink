import axios from "axios";
import axiosRetry from "axios-retry";

// Songlink: https://linktree.notion.site/API-d0ebe08a5e304a55928405eb682f6741

const API_URL = "https://api.song.link/v1-alpha.1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosRetry(api, { retryDelay: axiosRetry.exponentialDelay, retries: 5 });
