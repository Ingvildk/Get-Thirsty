import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import View from 'react-flexbox';
import Shell from 'shell';


class Footer extends React.Component {

    openExternal() {
        Shell.openExternal('https://www.google.com');
    }
	render() {
		return (
			<footer className="HolyGrail-footer">
    			<View style={{justifyContent: 'center',
    						   alignItems: 'center'}}>

					<img
					    style={[{cursor: "pointer"}]}
					    onClick={this.openExternal.bind(this)}
					    src="./images/footer_banner.jpg" />
				</View>
			</footer>
			);
	}
}
export default Radium(Footer);
