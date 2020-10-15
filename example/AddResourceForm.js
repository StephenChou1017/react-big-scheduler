import React from "react";
import { Form as LegacyForm } from "@ant-design/compatible";
import { Modal, Input } from "antd";

const AddResourceForm = (props) => {
  const { visible, onCancel, onCreate, form } = props;
  const { getFieldDecorator } = form;
  return (
    <Modal
      visible={visible}
      title="New Resource"
      okText="Create"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <LegacyForm layout="vertical">
        <FormItem label="Name">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Please input the name of the resource!",
              },
            ],
          })(<Input />)}
        </FormItem>
      </LegacyForm>
    </Modal>
  );
};

export default AddResourceForm;
