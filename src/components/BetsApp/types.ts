export type BetProps = {
  id: number;
  initialBalance: number;
  minOddsPerBet: number;
  betsPerDay: number;
  days: number;
  balance: number;
  backupBalance?: number;
  day?: number;
  lost?: boolean;
  createdAt?: number;
};

export type BetWithNoBackup = BetProps & {
  saveBackup?: false;
};

export type BetWithBackup = BetProps & {
  saveBackup: true;
  backupAmount: number;
  backupBalance: number;
  minBalanceToBackup: number;
  dailyBackup: boolean;
};

export type Bet = BetWithBackup | BetWithNoBackup;
