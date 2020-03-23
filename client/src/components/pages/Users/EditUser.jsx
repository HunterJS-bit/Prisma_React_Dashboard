import React from 'react';
import { Tabs } from 'antd';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import EditUserInfo from './EditUserInfo';
import EditUserPassword from './EditUserPassword';

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


const { TabPane } = Tabs;


const EditUser = (props) => {
	const userID = props.match.params.id;
	const { loading, error, data } = useQuery(GET_USER, {
    	variables: { id: userID },
  	});

	if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { user } = data; 

  const callback = (key) => {
    // console.log(key);
  }

	return ( <div className="edit-user"> 
    <Tabs onChange={callback} type="card">
       <TabPane tab="Tab 1" key="1">
          <EditUserInfo user={user} ></EditUserInfo>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
           <EditUserPassword></EditUserPassword>
        </TabPane>
         </Tabs>
        </div>);
}

export default EditUser;