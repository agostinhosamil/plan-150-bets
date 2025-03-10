import { ApplicationContext } from "@verdantkit/react";

import { BetsAppContainer } from "./components/BetsApp/Container";

export const App = () => {
  return (
    <div className="w-full dark:bg-black pt-20 pb-40 flex flex-col gap-6 min-h-screen justify-center items-center text-zinc-50">
      <ApplicationContext headers={{}}>
        <BetsAppContainer />
      </ApplicationContext>
    </div>
  );
};
