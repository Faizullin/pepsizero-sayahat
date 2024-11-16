import {Edit, SimpleForm, TextInput, useRecordContext} from "react-admin";

const Form = () => {
    const record = useRecordContext();
    return (
        <SimpleForm>
            <TextInput source="title" name={"title"}/>
            <TextInput source="builder_type" name={"Builder Type"}/>
            <a
                href={`/#/builder/${record?.id}`}>
                Builder
            </a>
        </SimpleForm>
    )
}
export const PageEdit = () => {
    return (
        <Edit title="Edit a Blog">
            <Form/>
        </Edit>
    );
};
