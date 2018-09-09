import { createSimpleStringPredicateFunction } from "./SimpleStringPredicate";
import {
  UrlPathSegmentPredicate,
  createUrlPathSegmentPredicateFunction
} from "./UrlPathSegmentPredicate";

export interface UrlPathPredicateFunction {
  (path: string | undefined | null): boolean;
}

export type UrlPathPredicate =
  | UrlPathPredicateFunction
  | string
  | RegExp
  | UrlPathSegmentPredicate[];

export function createUrlPathPredicateFunction(
  predicate: UrlPathPredicate | undefined | null
): UrlPathPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate === null) return path => path === null;
  if (predicate instanceof Array) {
    const predicates = predicate.map(p =>
      createUrlPathSegmentPredicateFunction(p)
    );
    return path => {
      const segments = getPathSegments(path);
      if (segments.length > predicates.length) return false;
      for (let i = 0; i < predicates.length; i++) {
        const match = predicates[i](segments[i]);
        if (!match) return false;
      }
      return true;
    };
  } else {
    return createSimpleStringPredicateFunction(predicate);
  }
}

export function getPathSegments(path: string | undefined | null): string[] {
  if (path == null) return [];
  return path.split("/");
}
