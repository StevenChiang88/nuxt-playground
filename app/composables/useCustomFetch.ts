import { navigateTo, useCookie, useRuntimeConfig } from "nuxt/app";

type CustomFetchOptions = NonNullable<Parameters<typeof $fetch>[1]>;
type CustomFetchMethod = NonNullable<CustomFetchOptions["method"]>;
type CustomFetchBody = CustomFetchOptions["body"];

const ensureHeaders = (headers?: CustomFetchOptions["headers"]) =>
  headers instanceof Headers ? headers : new Headers(headers);

export const useCustomFetch = () => {
  const token = useCookie<string | null>("token");
  const xsrfToken = useCookie<string | null>("XSRF-TOKEN");
  const config = useRuntimeConfig();

  const customFetch = $fetch.create({
    baseURL: String(config.public.apiBaseUrl || ""),
    credentials: "include",
    onRequest({ options }) {
      const headers = ensureHeaders(options.headers);

      if (token.value && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token.value}`);
      }
      if (xsrfToken.value && !headers.has("X-XSRF-TOKEN")) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken.value));
      }

      options.headers = headers;
    },
    onResponseError({ response }) {
      if (response?.status === 401) {
        navigateTo("/auth");
      }
    },
  });

  const withMethod =
    (method: CustomFetchMethod) =>
    <T>(url: string, options: CustomFetchOptions = {}) =>
      customFetch<T>(url, { ...options, method });

  const withBody =
    (method: Extract<CustomFetchMethod, "POST" | "PUT" | "PATCH">) =>
    <T>(
      url: string,
      body?: CustomFetchBody,
      options: CustomFetchOptions = {}
    ) =>
      customFetch<T>(url, { ...options, method, body });

  return {
    $fetch: customFetch,
    get: withMethod("GET"),
    post: withBody("POST"),
    put: withBody("PUT"),
    delete: withMethod("DELETE"),
  };
};
