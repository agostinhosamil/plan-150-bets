type Balance = number | string;

export const balanceToString = (balance: Balance): string => {
  return String(balance)
    .split(".")
    .map((balanceSlice, balanceSliceIndex) =>
      balanceSliceIndex < 1 ? balanceSlice : balanceSlice.slice(0, 2)
    )
    .join(",");
};
