import axios from "axios";

// Songlink: https://linktree.notion.site/API-d0ebe08a5e304a55928405eb682f6741

const API_KEY = "https://api.song.link/v1-alpha.1";

export const api = axios.create({
  baseURL: API_KEY,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
