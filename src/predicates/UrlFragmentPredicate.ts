import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlFragmentPredicateFunction {
  (fragment: string | undefined | null): boolean;
}

export type UrlFragmentPredicate =
  | UrlFragmentPredicateFunction
  | string
  | RegExp;

export function createUrlFragmentPredicateFunction(
  predicate: UrlFragmentPredicate | undefined | null
): UrlFragmentPredicateFunction {
  return createSimpleStringPredicateFunction(predicate, true);
}
