import React from 'react';
import { Form, Input, Button, Select, Tabs } from 'antd';

const { Option } = Select;

const EditUserInfo = (props) => {

	return (<Form name="dynamic_rule">
           <Form.Item name="input-number" label="Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
             <Form.Item name="input-number" label="Email">
            <Input placeholder="input placeholder" />
          </Form.Item>
               <Form.Item
  	        name="select"
  	        label="Select"
  	        hasFeedback
  	        rules={[
  	          {
  	            required: true,
  	            message: 'Please select role!',
  	          },
  	        ]}
  	      >
  	        <Select placeholder="Please select a role">
  	          <Option value="admin">Admin</Option>
  	          <Option value="constributor">Constributor</Option>
  	          <Option value="user">User</Option>
  	        </Select>
  	      </Form.Item>
           <Form.Item
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            </Form>)
}

export default EditUserInfo;