import axios from "axios";

import { API_URL } from "../config";
import { Bet } from "../types";
import { localStateKey } from "./localStateKey";

export const syncFromLocalStorage = async (
  username?: string
): Promise<Array<Bet>> => {
  const bets: Array<Bet> = [];

  username =
    username ||
    JSON.parse(localStorage.getItem(localStateKey("username")) || "null");

  try {
    const response = await axios.post<Array<Bet>>(String(API_URL), {
      username,
    });

    const bets = response.data;

    if (bets instanceof Array && bets.length >= 1) {
      // localStorage.setItem(localStateKey("bets"), JSON.stringify(bets));
      return bets;
    }
  } catch (err) {
    console.log(err);
  }

  return bets;
};
