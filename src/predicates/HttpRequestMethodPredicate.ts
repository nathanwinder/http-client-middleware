import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";

export interface HttpRequestMethodPredicateFunction {
  (method: string | undefined | null): boolean;
}

export type HttpRequestMethodPredicate =
  | HttpRequestMethodPredicateFunction
  | string
  | RegExp;

export function createHttpRequestMethodPredicateFunction(
  predicate: HttpRequestMethodPredicate | undefined | null
): HttpRequestMethodPredicateFunction {
  return createSimpleStringPredicateFunction(predicate, true);
}
