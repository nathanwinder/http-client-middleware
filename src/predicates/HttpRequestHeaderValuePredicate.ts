import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface HttpRequestHeaderValuePredicateFunction {
  (value: string | undefined | null): boolean;
}

export type HttpRequestHeaderValuePredicate =
  | HttpRequestHeaderValuePredicateFunction
  | string
  | RegExp;

export function createHttpRequestHeaderValuePredicateFunction(
  predicate: HttpRequestHeaderValuePredicate
): HttpRequestHeaderValuePredicateFunction {
  return createSimpleStringPredicateFunction(predicate, true);
}
