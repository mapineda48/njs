import { amountResults } from "service";

export function canFetch(amount: number) {
  return amount >= amountResults;
}
