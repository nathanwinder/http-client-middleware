export interface HttpRequestBodyPredicateFunction {
  (body: string | undefined | null): boolean;
}

export type HttpRequestBodyPredicate = HttpRequestBodyPredicateFunction;

export function createHttpRequestBodyPredicateFunction(
  predicate: HttpRequestBodyPredicate | undefined | null
): HttpRequestBodyPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate == null) return body => body === null || body === "";
  return predicate;
}
