import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlAuthorityUserPredicateFunction {
  (user: string | undefined | null): boolean;
}

export type UrlAuthorityUserPredicate =
  | UrlAuthorityUserPredicateFunction
  | string
  | RegExp;

export function createUrlAuthorityUsersPredicateFunction(
  predicate: UrlAuthorityUserPredicate | undefined | null
): UrlAuthorityUserPredicateFunction {
  return createSimpleStringPredicateFunction(predicate);
}
