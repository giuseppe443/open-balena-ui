import * as React from 'react';
import {
  ChipField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  required,
} from 'react-admin';
import SemVerChip from '../ui/SemVerChip';
import { TrimField } from '../ui/TrimField';

const ImageLabelTitle = ({ record }) => {
  return <span>Image Label {record ? `"${record.name}"` : ''}</span>;
};

export const ImageLabelList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source='id' />
        <ReferenceField label='Fleet' source='release image' reference='image' target='id' link={false}>
          <ReferenceField source='is a build of-service' reference='service' target='id' link={false}>
            <ReferenceField
              source='application'
              reference='application'
              target='id'
              link={(record, reference) => `/${reference}/${record['application']}`}
            >
              <ChipField source='app name' />
            </ReferenceField>
          </ReferenceField>
        </ReferenceField>
        <ReferenceField label='Release Rev.' source='release image' reference='image' target='id' link={false}>
          <ReferenceField source='id' reference='image-is part of-release' target='image' link={false}>
            <ReferenceField
              source='is part of-release'
              reference='release'
              link={(record, reference) => `/${reference}/${record['is part of-release']}`}
            >
              <SemVerChip />
            </ReferenceField>
          </ReferenceField>
        </ReferenceField>
        <ReferenceField label='Image' source='release image' reference='image' target='id' link={false}>
          <ReferenceField
            label='Service'
            source='is a build of-service'
            reference='service'
            target='id'
            link={(record, reference) => `/${reference}/${record['is a build of-service']}`}
          >
            <ChipField source='service name' />
          </ReferenceField>
        </ReferenceField>
        <TextField label='Name' source='label name' />
        <TrimField label='Value' source='value' />
        <Toolbar style={{ minHeight: 0, minWidth: 0, padding: 0, margin: 0, background: 0, textAlign: 'center' }}>
          <EditButton label='' />
          <DeleteButton label='' size='medium' />
        </Toolbar>
      </Datagrid>
    </List>
  );
};

export const ImageLabelCreate = (props) => (
  <Create {...props}>
    <SimpleForm redirect='list'>
      <ReferenceInput
        source='release image'
        reference='image'
        target='id'
        perPage={1000}
        sort={{ field: 'id', order: 'ASC' }}
      >
        <SelectInput optionText='id' optionValue='id' validate={required()} />
      </ReferenceInput>
      <TextInput label='Name' source='label name' validate={required()} />
      <TextInput label='Value' source='value' validate={required()} />
    </SimpleForm>
  </Create>
);

export const ImageLabelEdit = (props) => (
  <Edit title={<ImageLabelTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput
        source='release image'
        reference='image'
        target='id'
        perPage={1000}
        sort={{ field: 'id', order: 'ASC' }}
      >
        <SelectInput optionText='id' optionValue='id' validate={required()} />
      </ReferenceInput>
      <TextInput label='Name' source='label name' validate={required()} />
      <TextInput label='Value' source='value' validate={required()} />
    </SimpleForm>
  </Edit>
);

const imageLabel = {
  list: ImageLabelList,
  create: ImageLabelCreate,
  edit: ImageLabelEdit,
};

export default imageLabel;
