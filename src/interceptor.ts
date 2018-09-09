import { Store } from "redux";

// An interceptor is a form of middlware where the request and response or seperate.
// Interceptros enable configuration of middleware.

export interface Interceptor<
  TApi,
  TReq,
  TRes,
  TApiPredicate,
  TReqPredicate,
  TResProvider
> {}

const interceptorA = {
  api: (api, req): boolean => false,
  request: (api, req): boolean => true,
  response: (api, req): any => null
};

const interceptorB = {
  api: {
    store: s => s.mocks.users.get.returns == "200-ok"
  },
  request: {
    method: "get",
    url: {
      scheme: "http",
      authority: {
        user: "",
        host: "",
        port: 443
      },
      path: ["users", "user", v => parseInt(v) !== Number.NaN],
      query: {
        age: v => parseInt(v) !== Number.NaN,
        race: v => v === undefined
      }
    },
    headers: {},
    body: () => {}
  },
  response: () => ({})
};

export interface RequestPredicateFunction {}

export interface RequestPredicateConfig {
  method?: RequestMethodPredicate;
}

export interface ReduxPredicateFunction {
  <S>(store: Store<S>): boolean;
}

export interface ReduxPredicateObject<S> {}

export type ReduxPredicate = ReduxPredicateFunction;
