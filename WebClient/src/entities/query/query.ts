import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export type method = "GET" | "POST" | "PATCH" | "DELETE";

export interface useApiArgs<TData, TVariables> {
  endpoint: string;
  method: method;
  queryOptions?: Omit<
    UseQueryOptions<TData, AxiosError, TData, [string]>,
    "queryKey" | "queryFn"
  > & {
    onSuccess?: (data: TData) => void;
    onError?: (err: AxiosError) => void;
    onSettled?: (data: TData | undefined, err: AxiosError | null) => void;
  };
  mutationOptions?: Omit<
    UseMutationOptions<TData, AxiosError, TVariables>,
    "mutationFn"
  >;
}
