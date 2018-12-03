import React from 'react'
import { Modal, Form, Input, Button } from 'antd';
const FormItem = Form.Item;


const ResourceClickableForm = Form.create()(
    (props) => {
        const { visible, onCancel, onEdit, form, showDeleteConfirm, showDesactivationConfirm, showActivationConfirm, slotClickedStatus } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                title="Edit Resource Name"
                footer={[                    
                    <Button type="danger" onClick={showDeleteConfirm}>Delete</Button>, 
                    slotClickedStatus === 1 ? <Button type="dashed" onClick={showDesactivationConfirm}>Desactivate</Button> : <Button type="dashed" onClick={showActivationConfirm}>Activate</Button>,
                    <Button key="back" onClick={onCancel}>Cancel</Button>,
                    <Button key="edit" type="primary" onClick={onEdit}>
                        Edit
            </Button>,
                ]}
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