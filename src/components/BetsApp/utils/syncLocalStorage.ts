import axios from "axios";

import { localStateKey } from "./localStateKey";

export const syncLocalStorage = async () => {
  const apiUrl = "http://plan-150-bets.atwebpages.com";
  const data = JSON.parse(localStorage.getItem(localStateKey("bets")) || "{}");
  const username = localStorage.getItem(localStateKey("username"));

  const response = await axios.post(apiUrl, {
    username,
    data,
  });

  return response.data;
};
