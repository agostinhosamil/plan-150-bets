import { BetsApp } from "./components/BetsApp";

export const App = () => {
  return (
    <div className="w-full bg-black pt-20 pb-40 flex flex-col gap-6 min-h-screen justify-center items-center text-zinc-50">
      <BetsApp />
    </div>
  );
};
