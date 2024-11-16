import {AuthProvider} from "react-admin";
import {CUrls} from "@/core/constants/urls.ts";
import inMemoryJWT from "./inMemoryJWT.ts";

const authProvider: AuthProvider = {
    login: async ({email, password}) => {
        const request = new Request(`${CUrls.baseApiUrl}/api/v1/auth/login/token/`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include',
        });
        inMemoryJWT.setRefreshTokenEndpoint(CUrls.basicAuthRefreshUrl);
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const respoonse_data= await response.json();
        const{access, access_expiration} = respoonse_data;
        const delay = (new Date(access_expiration as string)).getTime()  - Date.now();
        return inMemoryJWT.setToken(access, delay);
    },

    logout: () => {
        const request = new Request(`${CUrls.baseApiUrl}/api/v1/auth/logout/`, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: "include",
        });
        // inMemoryJWT.ereaseToken();

        return fetch(request).then(() => '/login');
    },

    checkAuth: () => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            // inMemoryJWT.ereaseToken();
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        return inMemoryJWT.waitForTokenRefresh().then(() => {
            return inMemoryJWT.getToken() ? Promise.resolve() : Promise.reject();
        });
    },
};

export default authProvider;