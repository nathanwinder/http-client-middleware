import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlSchemePredicateFunction {
  (scheme: string | undefined | null): boolean;
}

export type UrlSchemePredicate = UrlSchemePredicateFunction | string | RegExp;

export function createUrlSchemePredicateFunction(
  predicate: UrlSchemePredicate | undefined | null
): UrlSchemePredicateFunction {
  return createSimpleStringPredicateFunction(predicate, {
    ignoreCase: true,
    nullMatchesEmpty: true,
    nullMatchesWhitepsace: true
  });
}
