import React from 'react'
import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;


const ResourceClickableForm = Form.create()(
    (props) => {
        const { visible, onCancel, onEdit, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Edit Resource Name"
                okText="Edit"
                onCancel={onCancel}
                onOk={onEdit}
            >
                <Form layout="vertical" >
                    <FormItem label="Name">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input the name of the resource!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default ResourceClickableForm