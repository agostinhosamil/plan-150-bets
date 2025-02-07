import { Bet } from "../types";

type BetCalendarDay = {
  number: number;
  backup: number;
  balance: number;
};

const MAX_BET_GAIN_AMOUNT: number = 50_000_000;

export const getBetCalendar = (bet: Bet): Array<BetCalendarDay> => {
  const { days, betsPerDay } = bet;

  const betCalendar: Array<BetCalendarDay> = [];

  let i = 1;
  let balance = bet.initialBalance;
  let backupBalance = 0;
  const totalBets = days * betsPerDay;

  for (; i <= totalBets; i++) {
    const day = Math.ceil(i / betsPerDay);

    let updatedBalance = balance * bet.minOddsPerBet;

    if (updatedBalance > MAX_BET_GAIN_AMOUNT) {
      const balanceDiff =
        (MAX_BET_GAIN_AMOUNT - updatedBalance) / (-1 * bet.minOddsPerBet);

      updatedBalance = (balance - balanceDiff) * bet.minOddsPerBet;

      backupBalance += balanceDiff;
    }

    balance = updatedBalance;

    const isLastBetOfLastDay = i >= totalBets;
    const isLastBetOfTheDay = Boolean(i % betsPerDay === 0);
    const isLastBetOfLastMonthDay = Boolean(
      isLastBetOfTheDay && day % 30 === 0
    );

    if (
      (bet.saveBackup && bet.dailyBackup) ||
      isLastBetOfLastDay ||
      isLastBetOfLastMonthDay
    ) {
      if (
        bet.saveBackup &&
        balance >= bet.minBalanceToBackup &&
        isLastBetOfTheDay
      ) {
        const amountToBackup = balance * (bet.backupAmount / 100);
        balance -= amountToBackup;
        backupBalance += amountToBackup;
      }
    }

    betCalendar.push({
      balance,
      number: day,
      backup: backupBalance,
    });
  }

  return betCalendar;
};
