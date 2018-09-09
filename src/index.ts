interface PipelineRequest<Req, Res> {
  (request: Req): Res;
}

interface NextPipelineRequest<Req, Res> {
  (next: PipelineRequest<Req, Res>): Res;
}

interface PipelineMiddlewareRequest<Req, Res> {
  (request: Req): NextPipelineRequest<Req, Res>;
}

interface PipelineMiddleware<Api, Req, Res> {
  (api: Api): PipelineMiddlewareRequest<Req, Res>;
}

export function createHttpClient<Api, Req, Res>(
  middleware: PipelineMiddleware<Api, Req, Res>,
  ...more: Array<PipelineMiddleware<Api, Req, Res>>
) {}

const middleware: PipelineMiddleware<any, any, any> = api => req => next => {
  const res = next(req);
  return res;
};

interface PipelineSegment<Api, Req, Res, OReq, ORes> {
  append<TReq>(): PipelineSegment<Api, TReq, Res, OReq, ORes>;
  build(): PipelineRequest<OReq, ORes>;
}

function createPipeline<Api, Req, Res>(): PipelineSegment<
  Api,
  Req,
  Res,
  Req,
  Res
> {}

const client = createHttpClient(middleware);

const pipline = createPipeline<boolean, string, number>()
  .append<Date>()
  .build();

const builder = createPipelineBuilder<Api>();

builder.createMiddleware<ReqA, ResA>(api => req => res => {});

builder
  .createMiddleware<ReqA, ResA>()
  .WithRequestTransform<ReqB>(api => req => res => {});

builder
  .createMiddleware<ReqA, ResA>()
  .WithRequestTransform<ReqB>()
  .WithResponseTransform<ResB>(api => req => res => {});
