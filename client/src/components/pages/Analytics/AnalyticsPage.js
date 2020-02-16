import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Chart from '../../common/Chart';
import PieChart from '../../common/PieChart';

const GET_ANALYTICS = gql`
  {
    analytics {
      monthly {
         date,
         count
      }
      visitsByCountry {
        country,
        data,
      }
    }
  }
`;

const Analytics = () => {

	const { loading, error, data } = useQuery(GET_ANALYTICS);

	if (loading) return 'Loading...';
  if (error) return 	`Error! ${error.message}`;

  const { analytics } = data;

  console.log(analytics);

	return (<div id="analytics"><h1> Analytics </h1>
		<Chart data={analytics.monthly}></Chart>
    <PieChart data={analytics.visitsByCountry}></PieChart></div>);
}

export default Analytics;