import { Spinner } from "@verdantkit/react";
import { useEffect, useState } from "react";

import { BetsApp } from ".";
import { Bet } from "./types";
import { localStateKey } from "./utils/localStateKey";
import { syncFromLocalStorage } from "./utils/syncFromLocalStorage";

export const BetsAppContainer = () => {
  const [bets, setBets] = useState<Array<Bet>>();

  useEffect(() => {
    syncFromLocalStorage().then((bets) => {
      localStorage.setItem(localStateKey("bets"), JSON.stringify(bets));

      setBets(bets);
    });
  }, []);

  return bets instanceof Array ? (
    <BetsApp />
  ) : (
    <div className="w-full fixed top-0 left-0 flex flex-row gap-3 items-center justify-center min-h-screen text-4xl">
      <Spinner />
      Loading...
    </div>
  );
};
