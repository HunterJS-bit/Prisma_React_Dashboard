import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Chart from '../../common/Chart';

const GET_ANALYTICS = gql`
  {
    analytics {
    	date,
    	count
    }
  }
`;

const Analytics = () => {

	const { loading, error, data } = useQuery(GET_ANALYTICS);

	if (loading) return 'Loading...';
  	if (error) return 	`Error! ${error.message}`;

  	console.log('OVdeee sammmm ');

  	console.log(data);

	return (<div id="analytics"><h1> Analytics </h1>
		<Chart ></Chart></div>);
}

export default Analytics;