import React from 'react';
import { Divider, Button } from 'antd';


const UserTableActions = (props) => {

return (<span>   <Button type="dashed">Edit User</Button>
	<Divider/>
    <Button type="danger">Remove User</Button></span>)

}

export default UserTableActions;