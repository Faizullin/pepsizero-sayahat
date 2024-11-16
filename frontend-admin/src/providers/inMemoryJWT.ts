import {CUrls} from "@/core/constants/urls.ts";

const inMemoryJWT = () => {
    let inMemoryAccessToken: string | null = null;
    let isRefreshing: Promise<any> | null = null;
    let logoutEventName = 'ra-logout';
    let refreshEndpoint = CUrls.basicAuthRefreshUrl;
    let refreshTimeOutId: number | null = null;

    const setLogoutEventName = name => logoutEventName = name;
    const setRefreshTokenEndpoint = endpoint => refreshEndpoint = endpoint;

    // This countdown feature is used to renew the JWT before it's no longer valid
    // in a way that is transparent to the user.
    const refreshToken = (delay: number) => {
        refreshTimeOutId = window.setTimeout(
            getRefreshedToken,
            delay * 1000 - 5000
        ); // Validity period of the token in seconds, minus 5 seconds
    };

    const abordRefreshToken = () => {
        if (refreshTimeOutId) {
            window.clearTimeout(refreshTimeOutId);
        }
    };

    const waitForTokenRefresh = () => {
        if (!isRefreshing) {
            return Promise.resolve();
        }
        return isRefreshing.then(() => {
            isRefreshing = null;
            return true;
        });
    }

    // The method make a call to the refresh-token endpoint
    // If there is a valid cookie, the endpoint will set a fresh jwt in memory.
    const getRefreshedToken = () => {
        const request = new Request(refreshEndpoint, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            credentials: 'include',
        });

        isRefreshing = fetch(request)
            .then((response) => {
                if (response.status !== 200) {
                    // ereaseToken();
                    console.log(
                        'Token renewal failure'
                    );
                    return {token: null};
                }
                return response.json();
            })
            .then(({access, access_expiration}) => {
                if (access) {
                    setToken(access, access_expiration);
                    return true;
                }
                // ereaseToken();
                return false;
            });

        return isRefreshing;
    };


    const getToken = () => inMemoryAccessToken;

    const setToken = (token: string, delay: number) => {
        inMemoryAccessToken = token;
        // refreshToken(delay);
        return true;
    };

    // const ereaseToken = () => {
    //     inMemoryAccessToken = null;
    //     abordRefreshToken();
    //     window.localStorage.setItem(logoutEventName, String(Date.now()));
    //     return true;
    // }
    //
    // // This listener will allow to disconnect a session of ra started in another tab
    // window.addEventListener('storage', (event) => {
    //     if (event.key === logoutEventName) {
    //         inMemoryAccessToken = null;
    //     }
    // });

    return {
        // ereaseToken,
        getRefreshedToken,
        getToken,
        setLogoutEventName,
        setRefreshTokenEndpoint,
        setToken,
        waitForTokenRefresh,
    }
};

export default inMemoryJWT();