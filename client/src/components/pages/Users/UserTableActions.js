import React from 'react';
import { Divider, Button } from 'antd';


const UserTableActions = (props) => {

	const editUser = () => {
		console.log('Edit user');
	}

	return (<span><Button type="dashed" onClick={editUser}>Edit User</Button>
				<Divider/>
    			<Button type="danger">Remove User</Button></span>)

}

export default UserTableActions;