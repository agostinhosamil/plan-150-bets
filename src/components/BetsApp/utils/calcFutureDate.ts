import { Optional } from "@verdantkit/utils";

export const calcFutureDate = (days: number, startDate?: Optional<number>) => {
  // const startDate = bet.createdAt;

  if (!startDate) {
    return "Não definido";
  }

  const date = new Date(startDate);

  date.setDate(date.getDate() + days);

  return date.toLocaleDateString("pt-PT");
};
