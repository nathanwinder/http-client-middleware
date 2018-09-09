import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface UrlQueryParameterMap {
  [key: string]: string;
}

export interface UrlQueryParameterPredicateFunction {
  (value: string | undefined | null): boolean;
}

export type UrlQueryParameterPredicate =
  | UrlQueryParameterPredicateFunction
  | string
  | RegExp;

export function createQueryParameterPredicateFunction(
  predicate: UrlQueryParameterPredicate | undefined | null
): UrlQueryParameterPredicateFunction {
  return createSimpleStringPredicateFunction(predicate, { ignoreCase: true });
}
