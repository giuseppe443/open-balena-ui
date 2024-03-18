import * as React from 'react';
import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  required,
} from 'react-admin';
import { useModifyRole } from '../lib/role';
import ManagePermissions from '../ui/ManagePermissions';

const RoleTitle = ({ record }) => {
  return <span>Role {record ? `"${record.name}"` : ''}</span>;
};

export const RoleList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <TextField source='name' />
        <Toolbar style={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0, background: 0, textAlign: 'center' }}>
          <EditButton label='' />
          <DeleteButton label='' size='medium' />
        </Toolbar>
      </Datagrid>
    </List>
  );
};

export const RoleCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source='name' validate={required()} />
    </SimpleForm>
  </Create>
);

export const RoleEdit = (props) => {
  const modifyRole = useModifyRole();

  return (
    <Edit title={<RoleTitle />} transform={modifyRole} {...props}>
      <SimpleForm toolbar={<Toolbar alwaysEnableSaveButton />}>
        <TextInput disabled source='id' />
        <TextInput source='name' validate={required()} />
        <ManagePermissions source='permissionArray' reference='role-has-permission' target='role' />
      </SimpleForm>
    </Edit>
  );
};

const role = {
  list: RoleList,
  create: RoleCreate,
  edit: RoleEdit,
};

export default role;
