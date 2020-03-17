import React from 'react';
import { Form, Input, Button, Select, Tabs } from 'antd';
import { useMutation } from '@apollo/react-hooks';

const EditUserPassword = () => {

	return ( <Form
                name="normal_login"
                className="reset-password-form"
              >
                    <Form.Item
						        name="password"
						        label="New Password"
						        rules={[
						          {
						            required: true,
						            message: 'Please input your password!',
						          },
						        ]}
						        hasFeedback
						      >
						        <Input.Password />
						      </Form.Item>

						      <Form.Item
						        name="confirm"
						        label="Confirm Password"
						        dependencies={['password']}
						        hasFeedback
						        rules={[
						          {
						            required: true,
						            message: 'Please confirm your password!',
						          },
						          ({ getFieldValue }) => ({
						            validator(rule, value) {
						              if (!value || getFieldValue('password') === value) {
						                return Promise.resolve();
						              }
						              return Promise.reject('The two passwords that you entered do not match!');
						            },
						          }),
						        ]}
						      >
						        <Input.Password />
						      </Form.Item>
              </Form>)

}


export default EditUserPassword;