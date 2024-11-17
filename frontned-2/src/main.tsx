import React from 'react'
import {createRoot} from 'react-dom/client'
import {HelmetProvider} from "react-helmet-async";
import {RouterProvider} from "react-router-dom";
import router from "@/routers/router.tsx";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <React.Suspense fallback={"Loading"}>
            {/*<IntlProvider*/}
            {/*  locale={langData.lang}*/}
            {/*  defaultLocale="en"*/}
            {/*  messages={langData.messages}*/}
            {/*>*/}
            {/*  <Provider store={store}>*/}
            <HelmetProvider>
                <RouterProvider router={router}></RouterProvider>
            </HelmetProvider>
            {/*</Provider>*/}
            {/*</IntlProvider>*/}
        </React.Suspense>
    </React.StrictMode>
)
