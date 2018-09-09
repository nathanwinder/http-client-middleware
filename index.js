"use strict";
function createPipeline() { }
function createMiddleware(middleware) {
    return middleware;
}
var middleware = createMiddleware(function (api) { return function (req) { return function (next) {
    var b = req;
    var c = next(b);
}; }; });
var pipe = createPipeline().append;
