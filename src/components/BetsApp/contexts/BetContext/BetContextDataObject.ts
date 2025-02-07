import { Bet } from "../../types";

export type BetContextDataObject = {
  bets: Array<Bet>;
  setBets: React.Dispatch<React.SetStateAction<Array<Bet>>>;
};
