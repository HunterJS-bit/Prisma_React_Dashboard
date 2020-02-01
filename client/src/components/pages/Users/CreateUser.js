import React from 'react';
import { Form, Icon, Input, Button, Select } from 'antd';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';


const ADD_USER= gql`
  mutation registerUser($input: UserCreate!) {
    registerUser(input: $input) {
      id
    }
  }
`;

const { Option } = Select;

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

const CreateUser = () => {

  const [addUser] = useMutation(ADD_USER);


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Handle the form ');
    addUser( { variables: { input: { name: 'test', email: 'test', password: 'test' } } });
	}

    return (<Form {...formItemLayout} onSubmit={handleSubmit} className="user-form">
    	<h1>Create user </h1>
    	 <Form.Item label="Email">
       		 <Input
              placeholder="Email"
            />
          </Form.Item>
    	 <Form.Item label="Username">
       		 <Input
              prefix={<Icon type="user" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="Role">
          <Select
			    style={{ width: 200 }}
			    placeholder="Select a role"
			  >
			    <Option value="member">Member</Option>
			    <Option value="constributor">Constributor</Option>
			    <Option value="admin">Admin</Option>
			  </Select>
          </Form.Item>
          <Form.Item label="Password">
          	<Input.Password />
          </Form.Item>
          <Form.Item >
	          <Button type="primary" htmlType="submit">
	            Submit
	          </Button>
        </Form.Item>
    	</Form>);
}

export default CreateUser;