import {
  UrlSchemePredicate,
  createUrlSchemePredicateFunction
} from "./UrlSchemePredicate";
import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";
import {
  createUrlAuthorityPredicate,
  UrlAuthorityPredicate
} from "./UrlAuthorityPredicate";
import {
  UrlPathPredicate,
  createUrlPathPredicateFunction
} from "./UrlPathPredicate";
import {
  UrlQueryPredicate,
  createUrlQueryPredicateFunction
} from "./UrlQueryPredicate";
import {
  UrlFragmentPredicate,
  createUrlFragmentPredicateFunction
} from "./UrlFragmentPredicate";

export interface UrlPredicateFunction {
  (url: string | undefined | null): boolean;
}

export interface UrlPredicateConfig {
  scheme?: UrlSchemePredicate;
  authority?: UrlAuthorityPredicate;
  path?: UrlPathPredicate;
  query?: UrlQueryPredicate;
  fragment?: UrlFragmentPredicate;
}

export type UrlPredicate =
  | UrlPredicateFunction
  | UrlPredicateConfig
  | string
  | RegExp;

export function createUrlPredicateFunction(
  predicate: UrlPredicate | null | undefined
): UrlPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate === null) return url => url === null;
  if (
    typeof predicate === "function" ||
    typeof predicate === "string" ||
    predicate instanceof RegExp
  )
    return createSimpleStringPredicateFunction(predicate);

  if (typeof predicate === "object") {
    const predicates = {
      scheme: createUrlSchemePredicateFunction(predicate.scheme),
      authority: createUrlAuthorityPredicate(predicate.authority),
      path: createUrlPathPredicateFunction(predicate.path),
      query: createUrlQueryPredicateFunction(predicate.query),
      fragment: createUrlFragmentPredicateFunction(predicate.fragment)
    };
    return function(url: string | null | undefined) {
      const parts = getUrlParts(url);
      const schemeMatched = predicates.scheme(parts.scheme);
      if (!schemeMatched) return false;

      const authorityMatched = predicates.authority(parts.authority);
      if (!authorityMatched) return false;

      const pathMatched = predicates.path(parts.path);
      if (!pathMatched) return false;

      const queryMatched = predicates.query(parts.query);
      if (!queryMatched) return false;

      const fragmentMatch = predicates.fragment(parts.fragment);
      if (!fragmentMatch) return false;

      return false;
    };
  }
  throw new Error(
    "Expected a predicate of type: '(url: string) => boolean' or 'HttpRequestUrlPredicateConfig'"
  );
}

interface UrlParts {
  scheme?: string | null;
  authority?: string | null;
  path?: string | null;
  query?: string | null;
  fragment?: string | null;
}

function getUrlParts(url: string | undefined | null): UrlParts {
  const result: UrlParts = {};
  if (url == null) return result;
  // TODO: Parse url
  return result;
}
