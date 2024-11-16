import {Edit, SimpleForm, TextInput, useRecordContext} from "react-admin";

const Form = () => {
    const record = useRecordContext();
    return (
        <SimpleForm>
            <TextInput source="title" name={"title"}/>

            <a
                href={`/#/builder/${record?.id}`}>
                Builder
            </a>
        </SimpleForm>
    )
}
export const BlogEdit = () => {
    return (
        <Edit title="Edit a Blog">
            <Form/>
        </Edit>
    );
};
