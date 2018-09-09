import {
  HttpRequestHeaderValuePredicate,
  createHttpRequestHeaderValuePredicateFunction
} from "./HttpRequestHeaderValuePredicate";

export interface HttpRequestHeaderMap {
  [key: string]: string;
}

export interface HttpRequestHeadersPredicateFunction {
  (headers: HttpRequestHeaderMap | undefined | null): boolean;
}

export interface HttpRequestHeadersPredicateConfig {
  [header: string]: HttpRequestHeaderValuePredicate;
}

export type HttpRequestHeadersPredicate =
  | HttpRequestHeadersPredicateFunction
  | HttpRequestHeadersPredicateConfig;

export function createHttpRequestHeadersPredicateFunction(
  predicate: HttpRequestHeadersPredicate | undefined | null
): HttpRequestHeadersPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate === null)
    return headers => headers == null || Object.keys(headers).length == 0;
  if (typeof predicate === "function") return predicate;
  if (typeof predicate === "object") {
    const predicates = Object.keys(predicate).map(key => {
      return {
        key,
        predicate: createHttpRequestHeaderValuePredicateFunction(predicate[key])
      };
    });
    return (headers: HttpRequestHeaderMap | undefined | null) => {
      if (headers == null) return false;
      for (var i = 0; i < predicates.length; i++) {
        const value = headers[predicates[i].key];
        const match = predicates[i].predicate(value);
        if (!match) return false;
      }
      return true;
    };
  }

  throw Error(
    `Expected predicate of type HttpRequestHeadersPredicate, recieved ${predicate}`
  );
}
