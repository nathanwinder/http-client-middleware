import {
  UrlQueryPredicate,
  createUrlQueryPredicateFunction
} from "./UrlQueryPredicate";
import { whitespaceCharacters } from "./SimpleStringPredicate";

describe("UrlQueryPredicate nully predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("undefined predicate matches anything", () => {
    steps.givenThePredicateIs(undefined);
    steps.givenTheQueryIs("key=value");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches null", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheQueryIs(null);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches undefined", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheQueryIs(undefined);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches does not match value", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheQueryIs("key=value");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("null predicate matches empty string", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheQueryIs("");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("null predicate matches whitespace", () => {
    steps.givenThePredicateIs(null);
    steps.givenTheQueryIs(whitespaceCharacters);
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });
});

describe("UrlQueryPredicate string predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("string predicate match", () => {
    steps.givenThePredicateIs("http");
    steps.givenTheQueryIs("http");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("string predicate mismatch", () => {
    steps.givenThePredicateIs("http");
    steps.givenTheQueryIs("file");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("string predicate ignores case", () => {
    steps.givenThePredicateIs("http");
    steps.givenTheQueryIs("HtTp");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("configured predicate string match", () => {
    steps.givenThePredicateIs({
      key2: "value2"
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("configured predicate string mismatch", () => {
    steps.givenThePredicateIs({
      key2: "valueB"
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("Configured predicate string ignores case", () => {
    steps.givenThePredicateIs({
      key2: "VaLuE2"
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });
});

describe("UrlQueryPredicate RegExp predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("RegExp predicate match", () => {
    steps.givenThePredicateIs(/key1=value1/);
    steps.givenTheQueryIs("key1=value1&key2=value2");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("RegExp predicate mismatch", () => {
    steps.givenThePredicateIs(/key1/);
    steps.givenTheQueryIs("key=value");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("Configured regexp query value match", () => {
    steps.givenThePredicateIs({
      key2: /value/
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("Configured regexp query value mismatch", () => {
    steps.givenThePredicateIs({
      key2: /other/
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });
});

describe("UrlQueryPredicate delegate predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });

  test("Delegate predicate match", () => {
    steps.givenThePredicateIs(() => true);
    steps.givenTheQueryIs("file");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("Delegate predicate mismatch", () => {
    steps.givenThePredicateIs(() => false);
    steps.givenTheQueryIs("file");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });

  test("Configured delegate match", () => {
    steps.givenThePredicateIs({
      key2: () => true
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsAMatch();
  });

  test("Configured delegate mismatch", () => {
    steps.givenThePredicateIs({
      key2: () => false
    });
    steps.givenTheQueryIs("key1=value1&key2=value2&key3=value3");
    steps.whenEvaluated();
    steps.thenThereIsNotAMatch();
  });
});

describe("UrlQueryPredicate configured predicate Spec", () => {
  let steps: Steps;
  beforeEach(() => {
    steps = new Steps();
  });
});

class Steps {
  predicate: UrlQueryPredicate | undefined | null = undefined;
  scheme: string | undefined | null = undefined;
  match: boolean | undefined = undefined;

  public readonly givenThePredicateIs = (
    predicate: UrlQueryPredicate | undefined | null
  ) => {
    this.predicate = predicate;
  };

  public readonly givenTheQueryIs = (scheme: string | undefined | null) => {
    this.scheme = scheme;
  };

  public readonly whenEvaluated = () => {
    const predicate = createUrlQueryPredicateFunction(this.predicate);
    this.match = predicate(this.scheme);
  };

  public readonly thenThereIsAMatch = () => {
    expect(this.match).toBe(true);
  };

  public readonly thenThereIsNotAMatch = () => {
    expect(this.match).toBe(false);
  };
}
