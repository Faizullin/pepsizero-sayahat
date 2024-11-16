import { Datagrid, EditButton, List, TextField } from "react-admin";

export const BlogList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="category" />
      <EditButton />
    </Datagrid>
  </List>
);
