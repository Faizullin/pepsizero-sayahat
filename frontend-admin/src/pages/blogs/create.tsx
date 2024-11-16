import {Create, SimpleForm, TextInput} from "react-admin";


export const BlogCreate = () => {
    // const user = useGetIdentity({
    //
    // })
    // console.log({...user})
    return (
        <Create title="Create a Blog">
            <SimpleForm>
                <TextInput source="title" name={"title"}/>
                <TextInput source="slug" name={"slug"}/>
                <TextInput source="content" name={"content"} style={{display: 'none'}} defaultValue={"EMPTY"}/>
                <TextInput source="author" name={"author"} hidden={true} style={{display: 'none'}} defaultValue={1}/>
            </SimpleForm>
        </Create>
    );
};
