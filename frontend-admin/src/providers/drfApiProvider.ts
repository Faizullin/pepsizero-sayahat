import {stringify} from "query-string";
import {DataProvider, Identifier} from "ra-core";
import {fetchUtils, PaginationPayload, SortPayload} from "react-admin";
import inMemoryJWT from "./inMemoryJWT.ts";
import {Options} from "ra-core/src/dataProvider/fetch.ts";
import {CUrls} from "@/core/constants/urls.ts";

const getPaginationQuery = (pagination?: PaginationPayload) => {
    if (!pagination) {
        return {}
    }
    return {
        page: pagination.page,
        page_size: pagination.perPage,
    };
};

const getFilterQuery = (filter: Record<string, never>) => {
    const {q: search, ...otherSearchParams} = filter;
    return {
        ...otherSearchParams,
        search,
    };
};

export const getOrderingQuery = (sort?: SortPayload) => {
    if (!sort) {
        return {}
    }
    const {field, order} = sort;
    return {
        ordering: `${order === "ASC" ? "" : "-"}${field}`,
    };
};

type R = typeof fetchUtils.fetchJson;
const drfApiProvider = (
    apiUrl: string,
    httpClient: R = fetchUtils.fetchJson,
): DataProvider => {
    const httpClientWithAuth = (url: string, options?: Options) => {
        const used_options: any = {
            headers: new Headers({Accept: 'application/json'}),
            ...options,
        };
        const token = inMemoryJWT.getToken();
        console.log("token", token)
        if (token) {
            used_options.headers?.set('Authorization', `Bearer ${token}`);
            return httpClient(url, used_options);
        } else {
            inMemoryJWT.setRefreshTokenEndpoint(CUrls.basicAuthRefreshUrl);
            return inMemoryJWT.getRefreshedToken().then((gotFreshToken) => {
                if (gotFreshToken) {
                    used_options.headers.set('Authorization', `Bearer ${inMemoryJWT.getToken()}`);
                }
                return httpClient(url, used_options);
            });
        }
    };

    const getOneJson = (resource: string, id: Identifier) =>
        httpClientWithAuth(`${apiUrl}/${resource}/${id}/`).then((response) =>
            JSON.parse(response.body),
        );

    return {
        getList: async (resource, params) => {
            const query = {
                ...getFilterQuery(params.filter),
                ...getPaginationQuery(params.pagination),
                ...getOrderingQuery(params.sort),
            };
            const url = `${apiUrl}/${resource}/?${stringify(query)}`;

            const {json} = await httpClientWithAuth(url);

            return {
                data: json.results,
                total: json.count,
            };
        },

        getOne: async (resource, params) => {
            const data = await getOneJson(resource, params.id);
            return {
                data,
            };
        },

        getMany: (resource, params) => {
            return Promise.all(params.ids.map((id) => getOneJson(resource, id))).then(
                (data) => ({data}),
            );
        },

        getManyReference: async (resource, params) => {
            const query = {
                ...getFilterQuery(params.filter),
                ...getPaginationQuery(params.pagination),
                ...getOrderingQuery(params.sort),
                [params.target]: params.id,
            };
            const url = `${apiUrl}/${resource}/?${stringify(query)}`;

            const {json} = await httpClientWithAuth(url);
            return {
                data: json.results,
                total: json.count,
            };
        },

        update: async (resource, params) => {
            const {json} = await httpClientWithAuth(`${apiUrl}/${resource}/${params.id}/`, {
                method: "PATCH",
                body: JSON.stringify(params.data),
            });
            return {data: json};
        },

        updateMany: (resource, params) =>
            Promise.all(
                params.ids.map((id) =>
                    httpClientWithAuth(`${apiUrl}/${resource}/${id}/`, {
                        method: "PATCH",
                        body: JSON.stringify(params.data),
                    }),
                ),
            ).then((responses) => ({data: responses.map(({json}) => json.id)})),

        create: async (resource, params) => {
            const {json} = await httpClientWithAuth(`${apiUrl}/${resource}/`, {
                method: "POST",
                body: JSON.stringify(params.data),
            });
            return {
                data: {...json},
            };
        },

        delete: async (resource, params) => {
            await httpClientWithAuth(`${apiUrl}/${resource}/${params.id}/`, {
                method: "DELETE",
            });
            return {
                data: params.previousData,
            } as any;
        },

        // delete: (resource, params) =>
        //   httpClient(`${apiUrl}/${resource}/${params.id}/`, {
        //     method: "DELETE",
        //   }).then(() => ({ data: params.previousData })),

        deleteMany: (resource, params) =>
            Promise.all(
                params.ids.map((id) =>
                    httpClientWithAuth(`${apiUrl}/${resource}/${id}/`, {
                        method: "DELETE",
                    }),
                ),
            ).then(() => ({data: []})),
    };
};


const drfDataProvider = drfApiProvider(
    CUrls.baseApiUrl + "/api/v2/admin",
    // (url: any, options?: fetchUtils.Options) => {
    //     // if (!options.headers) {
    //     //     options.headers = new Headers({Accept: 'application/json'});
    //     // }
    //     options!.headers = new Headers({
    //         Accept: 'application/json',
    //     })
    //     console.log(options?.headers)
    //     // const {token} = JSON.parse(localStorage.getItem('auth')!);
    //     // options.headers.set('Authorization', `Bearer ${token}`);
    //     return fetchUtils.fetchJson(url, options);
    // }
);

export default drfDataProvider;