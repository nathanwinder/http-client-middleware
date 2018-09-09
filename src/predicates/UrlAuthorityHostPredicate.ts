import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlAuthorityHostPredicateFunction {
  (url: string | undefined | null): boolean;
}

export type UrlAuthorityHostPredicate =
  | UrlAuthorityHostPredicateFunction
  | string
  | RegExp;

export function createUrlAuthorityHostPredicateFunction(
  predicate: UrlAuthorityHostPredicate | undefined | null
): UrlAuthorityHostPredicateFunction {
  return createSimpleStringPredicateFunction(predicate);
}
