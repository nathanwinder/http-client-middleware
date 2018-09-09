export interface UrlAuthorityPortPredicateFunction {
  (port: number | undefined | null): boolean;
}

export type UrlAuthorityPortPredicate =
  | UrlAuthorityPortPredicateFunction
  | number
  | RegExp;

export function createUrlAuthorityPortPredicateFunction(
  predicate: UrlAuthorityPortPredicate | undefined | null
): UrlAuthorityPortPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate == null) return port => port === predicate;
  if (typeof predicate === "function") return predicate;
  if (typeof predicate === "number") return port => port === predicate;
  if (predicate instanceof RegExp) return port => predicate.test(port + "");

  throw Error(`Expected UrlAuthorityPortPredicate but received ${predicate}.`);
}
