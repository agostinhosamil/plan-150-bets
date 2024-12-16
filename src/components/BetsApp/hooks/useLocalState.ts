import { useEffect, useState } from "react";

type LocalState<StateDataType = unknown> = [
  StateDataType,
  React.Dispatch<React.SetStateAction<StateDataType>>
];

const key = (key: string) => `__DATA_APP_STATE-${key}-config`;

export const useLocalState = <StateDataType = unknown>(
  stateKey: string,
  defaultValue?: StateDataType
): LocalState<StateDataType> => {
  const [state, setState] = useState<StateDataType>(() => {
    // ;
    const stateFromLocalStorage = localStorage.getItem(key(stateKey));

    if (stateFromLocalStorage) {
      const stateDataFromLocalStorage = JSON.parse(
        stateFromLocalStorage
      ) as StateDataType;
      return stateDataFromLocalStorage;
    }

    if (defaultValue) {
      localStorage.setItem(key(stateKey), JSON.stringify(defaultValue));
    }

    return defaultValue as StateDataType;
  });

  useEffect(() => {
    localStorage.setItem(key(stateKey), JSON.stringify(state));
  }, [state, stateKey]);

  // useEffect(() => {

  // }, [stateKey, state])

  return [state, setState];
};
