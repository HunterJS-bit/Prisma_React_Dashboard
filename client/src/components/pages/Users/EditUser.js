import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
	query User($id: String!) {
    	user(id: $id) {
      		id
      		name
      		role
      		email
      		profileImage
    }
  }
`;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const EditUser = (props) => {

	const userID = props.match.params.id;
	const { loading, error, data } = useQuery(GET_USER, {
    	variables: { id: userID },
  	});

	if (loading) return 'Loading...';
  	if (error) return `Error! ${error.message}`;
  	console.log(data);

  	const onFinish = values => {
	    console.log('Received values of form: ', values);
	};

	return (<Form name="dynamic_rule">
		<h1> Edit User </h1>
         <Form.Item label="Name">
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
	        <Select placeholder="Please select a country">
	          <Option value="china">Admin</Option>
	          <Option value="usa">Constribtor</Option>
	          <Option value="usa">User</Option>
	        </Select>
	      </Form.Item>
         <Form.Item
        wrapperCol={{
          span: 12,
          offset: 6,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
		</Form>);
}

export default EditUser;