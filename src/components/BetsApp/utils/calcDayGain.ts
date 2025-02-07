import { Bet } from "../types";

export const calcDayGain = (balance: number, bet: Bet): number => {
  for (let i = 0; i < bet.betsPerDay; i++) {
    balance *= bet.minOddsPerBet;
  }

  return balance;
};
