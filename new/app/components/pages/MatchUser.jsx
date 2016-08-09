import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import _ from 'lodash';

import MatchProfile from '../MatchProfile';

import ChatStore from '../../stores/ChatStore';
import ChatActions from '../../actions/ChatActions';

let styles = {
};

class MatchUser extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        var userId = this.props.params.matchId;
        var user = _.filter(this.props.users, (user) => {
            return user._id === userId;
        });

        if (_.isEmpty(user)) {
            return <div>Click on the user, you want to chat with </div>;
        }
        var user = user[0];
        return (
            <div className="MaxMatchUser">
                <MatchProfile
                    account={this.props.account}
                    update={this.props.update}
                    accounts={this.props.accounts}
                    style={[styles.users]}
                    user={user}/>
            </div>
        );
    }
}
MatchUser.contextTypes = {router: React.PropTypes.func.isRequired}
export default Radium(MatchUser);
