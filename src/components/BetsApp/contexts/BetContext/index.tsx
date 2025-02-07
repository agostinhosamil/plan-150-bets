import { createContext } from "react";

import { BetContextDataObject } from "./BetContextDataObject";

export const BetContext = createContext<BetContextDataObject>(
  {} as BetContextDataObject
);
