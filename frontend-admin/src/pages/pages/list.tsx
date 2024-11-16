import { Datagrid, EditButton, List, TextField } from "react-admin";

export const PageList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);
