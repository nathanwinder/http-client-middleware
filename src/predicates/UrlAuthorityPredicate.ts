import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";
import {
  createUrlAuthorityUsersPredicateFunction,
  UrlAuthorityUserPredicate
} from "./UrlAuthorityUserPredicate";
import {
  createUrlAuthorityHostPredicateFunction,
  UrlAuthorityHostPredicate
} from "./UrlAuthorityHostPredicate";
import {
  UrlAuthorityPortPredicate,
  createUrlAuthorityPortPredicateFunction
} from "./UrlAuthorityPortPredicate";

export interface UrlAuthorityPredicateFunction {
  (url: string | undefined | null): boolean;
}

export interface UrlAuthorityPredicateConfig {
  user?: UrlAuthorityUserPredicate;
  host?: UrlAuthorityHostPredicate;
  port?: UrlAuthorityPortPredicate;
}

export type UrlAuthorityPredicate =
  | UrlAuthorityPredicateFunction
  | UrlAuthorityPredicateConfig
  | string
  | RegExp;

export function createUrlAuthorityPredicate(
  predicate: UrlAuthorityPredicate | null | undefined
): UrlAuthorityPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate == null) return authority => authority === null;
  if (typeof predicate === "string" || predicate instanceof RegExp)
    return createSimpleStringPredicateFunction(predicate);
  if (typeof predicate === "object") {
    const predicates = {
      user: createUrlAuthorityUsersPredicateFunction(predicate.user),
      host: createUrlAuthorityHostPredicateFunction(predicate.host),
      port: createUrlAuthorityPortPredicateFunction(predicate.port)
    };
    return (authority: string | undefined | null) => {
      const parts = getAuthorityParts(authority);
      const userMatch = predicates.user(parts.user);
      if (!userMatch) return false;

      const hostMatch = predicates.host(parts.host);
      if (!hostMatch) return false;

      const portMatch = predicates.port(parts.port);
      if (!portMatch) return false;

      return true;
    };
  }

  throw Error(`Expected UrlAuthorityPredicate recieved ${predicate}.`);
}

export interface AuthorityParts {
  user?: string | null;
  host?: string | null;
  port?: number | null;
}

export function getAuthorityParts(
  authority: string | undefined | null
): AuthorityParts {
  const parts: AuthorityParts = {};
  if (authority == null) return parts;

  let buffer: string = authority;
  const userAndRest = buffer.split("@");
  if (userAndRest.length > 2)
    throw new Error(
      `Invalid url authority. Value contained more than one '@' symbol. ${authority}`
    );
  const hasUser = userAndRest.length > 1;

  if (hasUser) {
    parts.user = userAndRest[0];
    buffer = userAndRest[1];
  } else {
    buffer = userAndRest[0];
  }

  const hostAndRest = buffer.split(":");
  if (hostAndRest.length > 2)
    throw Error(
      `Invalid url authority. Value contained more than one ':'. ${authority}`
    );
  const hasPort = hostAndRest.length > 1;

  if (hasPort) {
    parts.host = hostAndRest[0];
    parts.port = parseInt(hostAndRest[1], 10);
  } else {
    parts.host = hostAndRest[0];
  }

  return parts;
}
