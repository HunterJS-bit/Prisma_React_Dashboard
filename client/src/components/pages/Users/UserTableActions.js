import React from 'react';
import { Divider, Button, Modal } from 'antd';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks'

const { confirm } = Modal;


const REMOVE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const UserTableActions = (props) => {

	const currentUser = props.user;
	const history = useHistory();
	const [deleteUser, { data }] = useMutation(REMOVE_USER);

	const editUser = () => {
		const { id } = currentUser;
		history.push(`/user-edit/${id}`);
	}

	const removeUser = async () => {
		console.log('remove Userr');
		const { id } = currentUser;
		await deleteUser({ variables: { id } });
	}

	const showDeleteConfirm = () => {
		  confirm({
		    title: 'Are you sure delete this User?',
		    content: 'Some descriptions',
		    okText: 'Yes',
		    okType: 'danger',
		    cancelText: 'No',
		    onOk() {
		      removeUser();
		    },
		    onCancel() {
		      return;
		    },
		  });
	}


	return (<span><Button type="dashed" onClick={editUser}>Edit User</Button>
				<Divider/>
    			<Button type="danger"  onClick={showDeleteConfirm}>Remove User</Button></span>)

}

export default UserTableActions;