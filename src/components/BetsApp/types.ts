export type Bet = {
  id: number;
  initialBalance: number;
  minOddsPerBet: number;
  betsPerDay: number;
  days: number;
  balance: number;
  lost?: boolean;
  createdAt?: number;
};
