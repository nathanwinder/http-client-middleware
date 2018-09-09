interface FinalSegment<Req, Res> {
  (request: Req): Res;
}

interface NextSegment<Req, Res, OutRes = Res> {
  (next: FinalSegment<Req, Res>): OutRes;
}

interface Segment<InReq, OutRes, OutReq = OutReq, InRes = OutRes> {
  (request: InReq): NextSegment<OutReq, OutRes, InRes>;
}

interface Middleware<Api, InReq, OutRes, OutReq = InReq, InRes = OutRes> {
  (api: Api): Segment<InReq, OutRes, OutReq, InRes>;
}

interface PipelineBuilder<Api, InReq, OutRes, OReq, ORes> {
  append<OutReq, InRes>(
    middleware: Middleware<Api, InReq, OutRes, OutReq, InRes>
  ): PipelineBuilder<Api, OutReq>;
  build(): FinalSegment<OReq, ORes>;
}

function createPipeline<Api, Req, Res>(): PipelineBuilder<
  Api,
  Req,
  Res,
  Req,
  Res
> {}

interface Api {}

interface ReqA {}
interface ReqB {
  test: string;
}
interface ReqC {}

interface ResA {}
interface ResB {}
interface ResC {}

function createMiddleware<Api, InReq, OutRes, OutReq, InRes>(
  middleware: Middleware<Api, InReq, OutRes, OutReq, InRes>
) {
  return middleware;
}

const middleware = createMiddleware((api: Api) => (req: ReqA) => next => {
  const b = req as ReqB;
  const c = next(b);
});

const pipe = createPipeline<boolean, string, number>().append;
