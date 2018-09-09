export interface SimpleStringPredicateFunction {
  (value: string | undefined | null): boolean;
}

export type SimpleStringPredicate =
  | SimpleStringPredicateFunction
  | string
  | RegExp;

export interface SimpleStringPredicateOptions {
  ignoreCase: boolean;
  nullMatchesEmpty: boolean;
  nullMatchesWhitepsace: boolean;
}

const defaultOptions: SimpleStringPredicateOptions = {
  ignoreCase: false,
  nullMatchesEmpty: false,
  nullMatchesWhitepsace: false
};

export function createSimpleStringPredicateFunction(
  predicate: SimpleStringPredicate | undefined | null,
  options: Partial<SimpleStringPredicateOptions> = defaultOptions
): SimpleStringPredicateFunction {
  const ops = { ...defaultOptions, ...options };
  if (predicate === undefined) return () => true;
  if (predicate === null)
    return value =>
      value == null ||
      (ops.nullMatchesEmpty && value === "") ||
      (ops.nullMatchesWhitepsace && isNullOrWhitespace(value));

  if (typeof predicate === "function") return predicate;

  if (typeof predicate === "string") {
    if (options.ignoreCase) {
      const lowerPredicate = predicate.toLowerCase();
      return value => value != null && value.toLowerCase() === lowerPredicate;
    } else {
      return value => value === predicate;
    }
  }

  if (predicate instanceof RegExp) {
    return value => value != null && predicate.test(value);
  } else {
    throw Error(
      `Expected a valid string predicate of type: (value: string) => boolean, string, or RegExp.`
    );
  }
}

export function isNullOrWhitespace(value: string | undefined | null) {
  if (value == null) return true;
  for (var i = 0; i < value.length; i++) {
    switch (value[i]) {
      case " ":
      case "\b":
      case "\f":
      case "\n":
      case "\r":
      case "\t":
      case "\v":
      case "\0":
        break;
      default:
        return false;
    }
  }
  return true;
}

export const whitespaceCharacters = " \b\f\n\r\t\v\0";
