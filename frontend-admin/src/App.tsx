import {Admin, CustomRoutes, Resource, ShowGuesser,} from "react-admin";
import {Layout} from "./Layout";
import {BlogEdit} from "./pages/blogs/edit.tsx";
import {BlogList} from "./pages/blogs/list.tsx";
import {Route} from "react-router";
import Editor from "./pages/web-editor/editor";
import EditorPreview from "./pages/web-editor/preview";
import {PageList} from "./pages/pages/list.tsx";
import {PageEdit} from "./pages/pages/edit.tsx";
import drfDataProvider from "./providers/drfApiProvider.ts";
import authProvider from "./providers/authProvider.ts";
import LoginPage from "./pages/auth/LoginPage.tsx";
import {BlogCreate} from "@/pages/blogs/create.tsx";

export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={drfDataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
    >
        <Resource
            name="blogs/blogpost"
            options={{label: 'Blog posts'}}
            list={BlogList}
            create={BlogCreate}
            edit={BlogEdit}
            show={ShowGuesser}
        />
        {/*<Resource*/}
        {/*    name="users"*/}
        {/*    options={{label: 'Users'}}*/}
        {/*    list={ListGuesser}*/}
        {/*    edit={EditGuesser}*/}
        {/*    show={ShowGuesser}*/}
        {/*/>*/}
        <Resource
            name="pages/pagedocument"
            options={{label: 'Pages'}}
            list={PageList}
            edit={PageEdit}/>

        <CustomRoutes noLayout={true}>
            <Route path="/builder/:id" element={<Editor/>}/>
            <Route path="/builder/:id/preview" element={<EditorPreview/>}/>
        </CustomRoutes>
    </Admin>
);
