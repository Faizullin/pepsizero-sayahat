const baseApiUrl = import.meta.env.VITE_SIMPLE_REST_URL;
export const CUrls = {
    baseApiUrl,
    basicAuthRefreshUrl: `${baseApiUrl}/api/v1/auth/token/refresh/`,
}