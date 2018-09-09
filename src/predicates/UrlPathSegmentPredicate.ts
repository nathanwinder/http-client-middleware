import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlPathSegmentPredicateFunction {
  (segment: string | undefined | null): boolean;
}

export type UrlPathSegmentPredicate =
  | UrlPathSegmentPredicateFunction
  | string
  | RegExp;

export function createUrlPathSegmentPredicateFunction(
  predicate: UrlPathSegmentPredicate | undefined | null
): UrlPathSegmentPredicateFunction {
  return createSimpleStringPredicateFunction(predicate, {
    ignoreCase: true,
    nullMatchesEmpty: true,
    nullMatchesWhitepsace: true
  });
}
