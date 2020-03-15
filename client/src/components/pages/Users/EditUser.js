import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_USER = gql`
	query User($id: String!) {
    	user(id: $id) {
      		id
      		name
    }
  }
`;

const EditUser = (props) => {

	const userID = props.match.params.id;
	const { loading, error, data } = useQuery(GET_USER, {
    	variables: { id: userID },
  	});

	if (loading) return 'Loading...';
  	if (error) return `Error! ${error.message}`;
  	console.log(data);

	return (<h1> Edit User </h1>);
}

export default EditUser;