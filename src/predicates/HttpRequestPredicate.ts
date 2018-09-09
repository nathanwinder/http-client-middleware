import {
  HttpRequestMethodPredicate,
  createHttpRequestMethodPredicateFunction
} from "./HttpRequestMethodPredicate";
import { UrlPredicate, createUrlPredicateFunction } from "./UrlPredicate";
import {
  HttpRequestHeadersPredicate,
  createHttpRequestHeadersPredicateFunction,
  HttpRequestHeaderMap
} from "./HttpRequestHeadersPredicate";
import {
  HttpRequestBodyPredicate,
  createHttpRequestBodyPredicateFunction
} from "./HttpRequestBodyPredicate";

export interface HttpRequestPredicateFunction {
  (url: Request): boolean;
}

export interface HttpRequestPredicateConfig {
  method?: HttpRequestMethodPredicate;
  url?: UrlPredicate;
  headers?: HttpRequestHeadersPredicate;
  body?: HttpRequestBodyPredicate;
}

export type HttpRequestPredicate =
  | HttpRequestPredicateFunction
  | HttpRequestPredicateConfig;

export function createHttpRequestPredicateFunction(
  predicate: HttpRequestPredicate | undefined | null
): HttpRequestPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate === null) return request => request === null;
  if (typeof predicate === "function") return predicate;
  if (typeof predicate === "object") {
    const predicates = {
      method: createHttpRequestMethodPredicateFunction(predicate.method),
      url: createUrlPredicateFunction(predicate.url),
      headers: createHttpRequestHeadersPredicateFunction(predicate.headers),
      body: createHttpRequestBodyPredicateFunction(predicate.body)
    };
    return request => {
      const methodMatch = predicates.method(request.method);
      if (!methodMatch) return false;

      const urlMatch = predicates.url(request.url);
      if (!urlMatch) return false;

      const headers: HttpRequestHeaderMap = {};
      request.headers.forEach((value, key) => {
        headers[key] = value;
      });
      const headersMatch = predicates.headers(headers);
      if (!headersMatch) return false;

      return true;
    };
  }

  throw Error(
    `Expected predicate of type HttpRequestPredicate, recieved ${predicate}.`
  );
}
