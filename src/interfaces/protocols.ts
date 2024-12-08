export interface HttpRequest<B> {
  body?: B;
  params?: unknown;
}

export interface HttpReponse<B> {
  statusCode: number;
  body?: B | unknown;
}
