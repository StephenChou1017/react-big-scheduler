import React from 'react'
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;


const AddResourceForm = (props) => {
        const { visible, onCancel, onCreate, form } = props;
        return (
            <Modal
                visible={visible}
                title="New Resource"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical" form={form}>
                    <FormItem label="Name" name="username" message="Please input the name of the resource!"  rules={[{ required: true }]}>
                        <Input />
                    </FormItem>
                </Form>
            </Modal>
        );
  }

export default AddResourceForm