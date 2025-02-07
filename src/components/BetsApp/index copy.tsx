import "./normalize";

import {
  CheckButton,
  cn,
  CopyableText,
  DialogButton,
  Navigation,
  NavigationButton,
  NavigationHeader,
  NavigationScreen,
  TextField,
  useDialog,
} from "@verdantkit/react";
import { formatCurrency, range } from "@verdantkit/utils";
import { Fragment, useState } from "react";
import { FaCheck, FaInfo, FaPlus } from "react-icons/fa6";

import { useLocalState } from "./hooks/useLocalState";
import { Bet } from "./types";

const INITIAL_BETS_CONFIG: Array<Bet> = [
  {
    id: 1,
    days: 155,
    balance: 550,
    betsPerDay: 5,
    initialBalance: 550,
    minOddsPerBet: 1.02,
  },
  {
    id: 2,
    days: 155,
    balance: 550,
    betsPerDay: 5,
    minOddsPerBet: 1.02,
    initialBalance: 550,
  },
  {
    id: 3,
    days: 155,
    balance: 550,
    betsPerDay: 5,
    minOddsPerBet: 1.02,
    initialBalance: 550,
  },
  {
    id: 4,
    days: 155,
    balance: 550,
    betsPerDay: 5,
    minOddsPerBet: 1.02,
    initialBalance: 550,
  },
];

const MAX_BET_GAIN_AMOUNT: number = 50_000_000;

export const BetsApp = () => {
  const [bets, setBets] = useLocalState<Array<Bet>>(
    "bets",
    INITIAL_BETS_CONFIG
  );

  const [screen, setScreen] = useLocalState("screen", 1);

  const calcTotal = (bets: Array<Bet>): number => {
    return bets
      .filter((bet) => !bet.lost)
      .map((bet) => bet.balance)
      .reduce((current, next) => current + next, 0);
  };

  const CreateBetDialog = () => {
    const [days, setDays] = useState(5);
    const [betsPerDay, setBetsPerDay] = useState(5);
    const [initialBalance, setInitialBalance] = useState(200);
    const [minOddsPerBet, setMinOddsPerBet] = useState(2);

    const [saveBackup, setSaveBackup] = useState<boolean>(false);
    const [dailyBackup, setDailyBackup] = useState<boolean>(false);
    const [backupAmount, setBackupAmount] = useState<number>(0);
    const [minBalanceToBackup, setMinBalanceToBackup] = useState<number>(0);

    const dialog = useDialog();

    const buttonClickHandler = () => {
      const numericValue = [days, betsPerDay, initialBalance];

      if (!numericValue.some((value) => isNaN(value))) {
        const betProps: object = !saveBackup
          ? {}
          : {
              backupAmount,
              minBalanceToBackup,
              saveBackup,
              dailyBackup,
            };

        setBets([
          ...bets,
          {
            balance: initialBalance,
            initialBalance,
            betsPerDay,
            days,
            id: bets.length + 1,
            minOddsPerBet: minOddsPerBet / 100 + 1,
            lost: false,
            createdAt: Date.now(),
            ...betProps,
          },
        ]);

        dialog.close();
      } else {
        alert("Bad Ideia!!");
      }
    };

    return (
      <div className="w-full flex flex-col gap-4">
        <h4 className="font-extrabold">Criar nova cabeça</h4>
        <TextField
          label="Investimento inicial"
          value={initialBalance}
          onChange={(e) => setInitialBalance(Number(e.target.value))}
        />
        <div className="w-full flex flex-row gap-4">
          <div className="w-full">
            <TextField
              label="Apostas por dia"
              value={betsPerDay}
              onChange={(e) => setBetsPerDay(Number(e.target.value))}
            />
          </div>
          <div className="w-full">
            <TextField
              label="Dias"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>
          <div className="w-full flex flex-col gap-2 items-end">
            <TextField
              label="Odds por aposta (%)"
              value={minOddsPerBet}
              onChange={(e) => setMinOddsPerBet(Number(e.target.value))}
            />
            <span className="text-xs text-zinc-500">
              Odds: {minOddsPerBet / 100 + 1}
            </span>
          </div>
        </div>
        <div>
          <div className="w-full flex flex-row gap-3">
            <div className="w-full">
              <CheckButton
                type="radio"
                onChange={(e) => setSaveBackup(e.target.checked)}
              >
                <span>Armazenar backup</span>
              </CheckButton>
            </div>
            {saveBackup && (
              <div className="w-full">
                <CheckButton
                  type="radio"
                  onChange={(e) => setDailyBackup(e.target.checked)}
                >
                  <span>Backup diário</span>
                </CheckButton>
              </div>
            )}
          </div>
          {saveBackup && (
            <div className="w-full flex flex-row gap-4 mt-4">
              <div className="w-full">
                <TextField
                  label="Backup a partir de"
                  value={minBalanceToBackup}
                  onChange={(e) =>
                    setMinBalanceToBackup(Number(e.target.value || "0"))
                  }
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <TextField
                  label="Valor do backup (%)"
                  value={backupAmount}
                  onChange={(e) => setBackupAmount(Number(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
        <button
          className="w-full flex flex-row justify-center px-6 py-4 rounded-md bg-purple-700 hover:bg-purple-800 active:bg-purple-900 active:scale-95 transition-all font-bold"
          type="button"
          role="button"
          onClick={buttonClickHandler}
        >
          Criar
        </button>
      </div>
    );
  };

  // const initialBalance = 500;
  // const minOddsPerBet = 1.02;
  // const betsPerDay = 5;
  // const days = 155;

  return (
    <Fragment>
      <h1 className="text-6xl font-black uppercase">150 Bets App</h1>
      <ul className="w-full max-w-4xl bg-emerald-950 rounded-lg p-6 flex flex-row flex-wrap gap-y-4">
        {bets.map((bet) => (
          <li
            key={bet.id}
            className={cn(
              "inline-flex w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-5 relative flex-grow [&_*]:select-none last:border-r-0",
              bet.id === screen
                ? "border-b-8 border-b-zinc-50 border-solid"
                : null
            )}
          >
            <div
              className="w-full cursor-pointer hover:scale-105 active:scale-95 transition-transform flex flex-col gap-3 items-center relative text-center"
              onClick={() => setScreen(bet.id)}
            >
              {bet.lost && (
                <i className="inline-flex px-3 py-1 rounded-md bg-red-600 bg-opacity-55 text-zinc-50 absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full text-xs">
                  Perdido
                </i>
              )}
              <strong>Cabeça Nº #{bet.id}</strong>
              <span className="text-xs text-zinc-300">
                Saldo:{" "}
                {bet.balance ? formatCurrency(bet.balance, "AKZ") : "null"}
              </span>
            </div>
            {screen === bet.id && !bet.lost && (
              <div className="w-full absolute bottom-2 left-0 px-4 translate-y-7">
                <button
                  className="cursor-pointer w-full outline-0 border-0 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-800 active:scale-95 font-bold uppercase text-xs"
                  type="button"
                  onClick={() => {
                    setBets(
                      bets.map((currentBet) => {
                        if (currentBet.id !== bet.id) {
                          return currentBet;
                        }

                        return {
                          ...currentBet,
                          lost: true,
                        };
                      })
                    );
                  }}
                >
                  Marcar perdido
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {bets.map((bet) => {
        const { betsPerDay, days, initialBalance, minOddsPerBet, id } = bet;
        const totalBets = betsPerDay * days;
        let balance = initialBalance;
        let backupBalance = 0;

        const balances: Array<[number, number]> = [];

        if (id !== screen) {
          return null;
        }

        let dayNum = 0;

        const calc = (value: number): number => {
          for (let i = 1; i < betsPerDay; i++) {
            value *= minOddsPerBet;
          }

          return value;
        };

        const calcFutureDate = (days: number = bet.days) => {
          const startDate = bet.createdAt;

          if (!startDate) {
            return "Não definido";
          }

          const date = new Date(startDate);

          date.setDate(date.getDate() + days);

          return date.toLocaleDateString("pt-PT");
        };

        const calcTotalGain = (): number => {
          let balance = bet.balance;

          for (let i = 0; i < bet.days * bet.betsPerDay; i++) {
            let updatedBalance = balance * bet.minOddsPerBet;

            if (updatedBalance > MAX_BET_GAIN_AMOUNT) {
              const balanceDiff =
                (MAX_BET_GAIN_AMOUNT - updatedBalance) /
                (-1 * bet.minOddsPerBet);

              updatedBalance = Math.floor(
                (balance - balanceDiff) * bet.minOddsPerBet
              );

              // backupBalance += balanceDiff;
            }

            balance = updatedBalance;
          }

          return balance;
        };

        return (
          <div key={id} className="w-full flex flex-col gap-5 max-w-4xl">
            <Navigation home="calendar">
              <NavigationHeader className="w-full flex mb-5 flex-row gap-5 items-center justify-center">
                <NavigationButton
                  to="calendar"
                  className="flex flex-grow px-3 pt-3 pb-4 outline-none border bg-transparent border-solid border-zinc-400 rounded-lg cursor-pointer justify-center"
                >
                  <span>Calendário</span>
                </NavigationButton>
                <NavigationButton
                  to="history"
                  className="flex flex-grow px-3 pt-3 pb-4 outline-none border bg-transparent border-solid border-zinc-400 rounded-lg cursor-pointer justify-center"
                >
                  <span>Ver cronologia</span>
                </NavigationButton>
                <NavigationButton
                  to="details"
                  className="flex flex-grow flex-row items-center gap-4 px-3 pt-3 pb-4 outline-none border bg-transparent border-solid border-zinc-400 rounded-lg cursor-pointer justify-center"
                >
                  <i className="inline-flex size-5 rounded-full bg-white text-zinc-950 text-xs items-center justify-center">
                    <FaInfo />
                  </i>
                  <span>Detalhes</span>
                </NavigationButton>
              </NavigationHeader>
              <NavigationScreen name="calendar">
                <ol className="w-full max-w-4xl flex flex-row flex-wrap gap-5 relative">
                  {range(0, totalBets).map((i) => {
                    let updatedBalance = balance * minOddsPerBet;

                    if (updatedBalance > MAX_BET_GAIN_AMOUNT) {
                      const balanceDiff =
                        (MAX_BET_GAIN_AMOUNT - updatedBalance) /
                        (-1 * minOddsPerBet);

                      updatedBalance = Math.floor(
                        (balance - balanceDiff) * minOddsPerBet
                      );

                      backupBalance += balanceDiff;
                    }

                    balance = updatedBalance;

                    if (i % betsPerDay === 0) {
                      dayNum++;
                    }

                    balances.push([balance, dayNum]);

                    const currentBalanceValue = String(balance);

                    const getNextSlipValue = (): string => {
                      const updatedBalance = balance * bet.minOddsPerBet;

                      if (updatedBalance > MAX_BET_GAIN_AMOUNT) {
                        const balanceDiff =
                          (MAX_BET_GAIN_AMOUNT - updatedBalance) /
                          (-1 * minOddsPerBet);

                        return String(balance - balanceDiff);
                      }

                      return String(balance);
                    };

                    const buttonClickHandler: React.MouseEventHandler = (e) => {
                      e.preventDefault();

                      if (bet.lost) {
                        return;
                      }

                      setBets(
                        bets.map((currentBet) => {
                          if (currentBet.id !== bet.id) {
                            return currentBet;
                          }

                          return {
                            ...currentBet,
                            balance: Number(currentBalanceValue),
                          };
                        })
                      );
                    };

                    return (
                      <li
                        key={i}
                        className="w-full md:w-1/3 lg:w-5 xl:w-1/6 relative flex flex-grow"
                      >
                        <button
                          onClick={buttonClickHandler}
                          className={cn(
                            "w-full relative flex flex-col gap-3 text-center flex-grow bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 active:scale-105 transition-all cursor-pointer rounded-lg p-6 pb-10 justify-center items-center",
                            Number(currentBalanceValue) <= bet.balance
                              ? "!bg-purple-700 hover:!bg-purple-800 active:!bg-purple-900"
                              : null,
                            bet.lost &&
                              "pointer-events-none opacity-25 cursor-not-allowed"
                          )}
                        >
                          {Number(currentBalanceValue) <= bet.balance && (
                            <i className="absolute flex top-3 left-3 pointer-events-none">
                              <FaCheck />
                            </i>
                          )}
                          <div>
                            <h5 className="text-zinc-400 pointer-events-none select-none">
                              Day #{dayNum}
                            </h5>
                            <i className="text-xs text-zinc-200">
                              ({calcFutureDate(dayNum - 1)})
                            </i>
                          </div>

                          <strong
                            className={cn(
                              "text-white uppercase pointer-events-none select-none block mb-2",
                              balance >= 1_000_000
                                ? "text-xs font-extrabold"
                                : undefined
                            )}
                          >
                            Gain: {formatCurrency(balance)}
                          </strong>
                        </button>
                        <CopyableText data={getNextSlipValue()}>
                          <span
                            className={cn(
                              "absolute left-0 right-0 m-auto bottom-3 flex justify-center items-center mr-1 pb-2",
                              bet.lost &&
                                "pointer-events-none opacity-25 cursor-not-allowed"
                            )}
                          />
                        </CopyableText>
                      </li>
                    );
                  })}
                </ol>
              </NavigationScreen>
              <NavigationScreen name="history">
                <ol className="w-full max-w-4xl flex flex-col gap-5 relative">
                  {balances.map(([balance, dayNum], i) => {
                    if (i % betsPerDay !== 0) {
                      return null;
                    }

                    const won = calc(balance) <= bet.balance;

                    return (
                      <li
                        key={i}
                        className="w-full flex p-5 relative bg-[#0b0b0d] border border-zinc-800 border-solid rounded-xl text-center justify-center text-zinc-200 font-bold"
                      >
                        Day #{dayNum} ({calcFutureDate(dayNum - 1)}), You{" "}
                        {won
                          ? "won:"
                          : (bet.lost ? "should" : "will") + " win:"}
                        <i className="not-italic font-extrabold inline-block mx-2 text-emerald-600">
                          {formatCurrency(calc(balance), "AKZ")}
                        </i>{" "}
                        doing {betsPerDay} bets with a minimum of{" "}
                        {minOddsPerBet} odds per bet
                        {won && (
                          <div className="absolute size-7 rounded-full flex justify-center items-center bg-emerald-700 right-3 top-1/2 -translate-y-1/2 text-xs">
                            <FaCheck />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </NavigationScreen>
              <NavigationScreen name="details">
                <table className="w-full">
                  <tbody className="w-full">
                    <tr className="w-full">
                      <td className="w-1/2">
                        <div className="w-full flex flex-col bg-zinc-900 [&>span]:border-y [&>span]:border-solid [&>span]:border-zinc-500 [&>span]:p-6">
                          <span>#</span>
                          <span>Duração (Dias)</span>
                          <span>Iniciado em</span>
                          <span>Termina em</span>
                          <span>Investimento inicial</span>
                          <span>Min. de odds por aposta</span>
                          <span>Min. de apostas por dia</span>
                          {bet.saveBackup && (
                            <Fragment>
                              <span>Backup (%)</span>
                              <span>Fazer backup a partir de</span>
                              <span>Saldo de backup</span>
                            </Fragment>
                          )}
                          <span>Salto atual</span>
                          <span>Backup totais ao final do ciclo</span>
                          <span>Saldo total ao final do ciclo</span>
                          <span>Ganhos totais ao final do ciclo</span>
                        </div>
                      </td>
                      <td className="w-1/2">
                        <div className="w-full flex flex-col [&>span]:border-y [&>span]:border-solid [&>span]:border-zinc-500 [&>span]:p-6 [&>span]:font-extrabold">
                          <span>{bet.id}</span>
                          <span>
                            {bet.days} - ({Math.ceil(bet.days / 30)} meses)
                          </span>
                          <span>
                            {(bet.createdAt &&
                              new Date(bet.createdAt).toLocaleDateString(
                                "pt-PT"
                              )) ||
                              "Não informado"}
                          </span>
                          <span>{calcFutureDate()}</span>
                          <span>
                            {formatCurrency(bet.initialBalance, "AKZ")}
                          </span>
                          <span>{bet.minOddsPerBet}</span>
                          <span>{bet.betsPerDay}</span>
                          {bet.saveBackup && (
                            <Fragment>
                              <span>{bet.backupAmount}</span>
                              <span>
                                {formatCurrency(
                                  bet.minBalanceToBackup || 0,
                                  "AKZ"
                                )}
                              </span>
                              <span>
                                {formatCurrency(bet.backupBalance || 0, "AKZ")}
                              </span>
                            </Fragment>
                          )}
                          <span>{formatCurrency(bet.balance, "AKZ")}</span>
                          <span>{formatCurrency(backupBalance, "AKZ")}</span>
                          <span>{formatCurrency(calcTotalGain(), "AKZ")}</span>
                          <span>
                            {formatCurrency(
                              calcTotalGain() + backupBalance,
                              "AKZ"
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </NavigationScreen>
            </Navigation>

            <div className="w-full flex flex-row items-center justify-between gap-5 fixed m-auto max-w-4xl rounded-md shadow-xl bg-zinc-800 select-none p-4 bottom-9">
              <h4 className="text-xl inline-flex flex-row gap-3 items-center font-extrabold">
                <span>Balance: {formatCurrency(bet.balance, "AKZ")}</span>
                {bet.saveBackup && (
                  <i className="text-xs font-light">
                    Backup: {formatCurrency(bet.backupBalance || 0, "AKZ")}
                  </i>
                )}
              </h4>
              <div className="inline-flex w-14 bg-red-500 relative">
                <DialogButton
                  type="button"
                  role="button"
                  content={CreateBetDialog}
                  className="bg-purple-700 absolute top-0 left-0 -translate-y-1/2 scale-150 flex flex-row justify-center items-center text-xl hover:bg-purple-800 active:bg-purple-900 hover:scale-[1.6] active:scale-125 transition-all rounded-full size-14 outline-0 border-0"
                >
                  <FaPlus />
                </DialogButton>
              </div>
              <h6 className="text-sm text-zinc-300">
                Total balance: {formatCurrency(calcTotal(bets), "AKZ")}
              </h6>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};
