import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import _ from 'lodash';

class Adds extends React.Component {
	render() {
		return (
			<aside className="HolyGrail-ads">
				<div style={[{marginLeft: "10px",
							  marginTop: "20px"}]}>
					<img src="./images/banner.gif" />
				</div>
			</aside>
			);
	}
}
export default Radium(Adds);
