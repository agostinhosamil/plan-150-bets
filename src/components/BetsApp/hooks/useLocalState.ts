import { useEffect, useState } from "react";
import { localStateKey } from "../utils/localStateKey";

type LocalState<StateDataType = unknown> = [
  StateDataType,
  React.Dispatch<React.SetStateAction<StateDataType>>
];

export const useLocalState = <StateDataType = unknown>(
  stateKey: string,
  defaultValue?: StateDataType
): LocalState<StateDataType> => {
  const [state, setState] = useState<StateDataType>(() => {
    // ;
    const stateFromLocalStorage = localStorage.getItem(localStateKey(stateKey));

    if (stateFromLocalStorage) {
      const stateDataFromLocalStorage = JSON.parse(
        stateFromLocalStorage
      ) as StateDataType;
      return stateDataFromLocalStorage;
    }

    if (defaultValue) {
      localStorage.setItem(
        localStateKey(stateKey),
        JSON.stringify(defaultValue)
      );
    }

    return defaultValue as StateDataType;
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem(localStateKey(stateKey), JSON.stringify(state));
    }
  }, [state, stateKey]);

  // useEffect(() => {

  // }, [stateKey, state])

  return [state, setState];
};
