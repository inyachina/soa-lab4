export interface ApiResponse<R> {
  isSuccess: boolean;
  type: string;
  data: R;
}

export interface QueryParams {
  [key: string]: any;
}

export interface ApiError{
  message: string,
  type: string,
}
