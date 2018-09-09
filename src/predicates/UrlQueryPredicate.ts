import {
  createSimpleStringPredicateFunction,
  isNullOrWhitespace
} from "./SimpleStringPredicate";
import {
  UrlQueryParameterPredicate,
  UrlQueryParameterMap,
  createQueryParameterPredicateFunction
} from "./UrlQueryParameterPredicate";

export interface UrlQueryPredicateFunction {
  (query: string | undefined | null): boolean;
}

export interface UrlQueryPredicateConfig {
  [key: string]: UrlQueryParameterPredicate;
}

export type UrlQueryPredicate =
  | UrlQueryPredicateFunction
  | UrlQueryPredicateConfig
  | string
  | RegExp;

export function createUrlQueryPredicateFunction(
  predicate: UrlQueryPredicate | undefined | null
): UrlQueryPredicateFunction {
  if (predicate === undefined) return () => true;
  if (predicate === null) return query => isNullOrWhitespace(query);
  if (typeof predicate === "object" && !(predicate instanceof RegExp)) {
    const predicates = Object.keys(predicate).map(key => ({
      key,
      predicate: createQueryParameterPredicateFunction(predicate[key])
    }));
    return query => {
      const parameters = getQueryParameters(query);
      for (var i = 0; i < predicates.length; i++) {
        const value = parameters[predicates[i].key];
        const match = predicates[i].predicate(value);
        if (!match) return false;
      }
      return true;
    };
  } else {
    return createSimpleStringPredicateFunction(predicate, {
      ignoreCase: true,
      nullMatchesEmpty: true
    });
  }
}

export function getQueryParameters(
  query: string | undefined | null
): UrlQueryParameterMap {
  if (query == null) return {};

  return query.split("&").reduce(
    (map, p) => {
      const parts = p.split("=");
      map[parts[0]] = parts[1];
      return map;
    },
    {} as UrlQueryParameterMap
  );
}
