import {
  createUrlSchemePredicateFunction,
  UrlSchemePredicate
} from "./UrlSchemePredicate";
import { whitespaceCharacters } from "./SimpleStringPredicate";

describe("UrlSchemePredicate nully predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("undefined predicate matches anything", () => {
    steps.givenThePredicateIs(undefined);
    steps.givenTheSchemeIs("http");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches null", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheSchemeIs(null);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches undefined", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheSchemeIs(undefined);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches does not match value", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheSchemeIs("http");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("null predicate matches empty string", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheSchemeIs("");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches whitespace", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheSchemeIs(whitespaceCharacters);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });
});

describe("UrlSchemePredicate string predicate spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("string predicate match", () => {
    steps.givenThePredicateIs("http");
    steps.givenTheSchemeIs("http");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("string predicate mismatch", () => {
    steps.givenThePredicateIs("http");
    steps.givenTheSchemeIs("file");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });
});

describe("UrlSchemePredicate RegExp predicate spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("RegExp predicate match", () => {
    steps.givenThePredicateIs(/https?/);
    steps.givenTheSchemeIs("https");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("RegExp predicate mismatch", () => {
    steps.givenThePredicateIs(/https?/);
    steps.givenTheSchemeIs("file");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });
});

describe("UrlSchemePredicate delegate predicate spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("Delegate predicate match", () => {
    steps.givenThePredicateIs(() => true);
    steps.givenTheSchemeIs("file");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("Delegate predicate mismatch", () => {
    steps.givenThePredicateIs(() => false);
    steps.givenTheSchemeIs("file");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });
});

class Steps {
  predicate: UrlSchemePredicate | undefined | null = undefined;
  scheme: string | undefined | null = undefined;
  match: boolean | undefined = undefined;

  public readonly givenThePredicateIs = (
    predicate: UrlSchemePredicate | undefined | null
  ) => {
    this.predicate = predicate;
  };

  public readonly givenTheSchemeIs = (scheme: string | undefined | null) => {
    this.scheme = scheme;
  };

  public readonly whenEvaluated = () => {
    const predicate = createUrlSchemePredicateFunction(this.predicate);
    this.match = predicate(this.scheme);
  };

  public readonly thenThereIsAMatch = () => {
    expect(this.match).toBe(true);
  };

  public readonly thenThereIsNotAMatch = () => {
    expect(this.match).toBe(false);
  };
}
