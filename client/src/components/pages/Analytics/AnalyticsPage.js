import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Chart from '../../common/Chart';
import PieChart from '../../common/PieChart';

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
  const { analytics } = data;

	return (<div id="analytics"><h1> Analytics </h1>
		<Chart data={analytics}></Chart>
    <PieChart></PieChart></div>);
}

export default Analytics;