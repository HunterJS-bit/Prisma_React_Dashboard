import React from 'react';
import { Skeleton } from 'antd';

const SkeletonList = (props) => {

	SkeletonList.defaultProps = {
		length: 1
	}

	const items = props.length ;

	return (<div className="skelet-placeholder">
		{Array.from(Array(items), (e, i) => {
		    return <Skeleton active avatar key={i}>a</Skeleton>
		  })}

		</div>);
}

export default SkeletonList;