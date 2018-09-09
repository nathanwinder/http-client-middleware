# Http Client Middleware

This is a small Typescript library for use in creating an HTTP pipeline for client requests. This enables a number of behaviors including mocking server responses. This library is currently in Alpha development. If you are interested in contributing please let me know.

## Sample Mock

Here is a quick sample of what you'll be able to do with mock middlware

```typescript
const isInt = value => parseInt(value) !== Number.NaN;

const myMock = createMockMiddleware({
    api: {
        store: (state) =>
            state.mocks.enabled === true
            && state.mocks.tandc.get.returns === "200",
    },
    request: {
        method: "get",
        url: {
            path: ["api", "users", isInt, "terms-and-conditions"],
            query: {
                version: "1"
            }
        },
        headers: {
            "accept-language": /en/
        }
    },
    response: {
        statusCode: 200,
        statusText: "OK",
        headers: {
            "last-modified" : "2018-09-09T12:48:00"
        }
        body: {
         copy: "These are the terms and conditions..."
        }
    }
})
```

## Sample Middleware

Here is the concept for a simple middleware that adds auth headers to a request. This example is using Redux for app state and exposes access to the store through the middleware api argument.

```typescript
const successMiddleware = createMiddleware(api => request => next => {
  const state = api.getState();
  const token = state.auth.token;
  return next({
    ...request,
    headers: {
      ...request[headers],
      authorization: `bearer ${token}`
    }
  });
});
```
