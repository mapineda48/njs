import { amountResults } from "shared";

export function canFetch(amount: number) {
  return amount >= amountResults;
}
