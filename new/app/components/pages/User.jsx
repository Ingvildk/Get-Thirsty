import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';
import _ from 'lodash';

import Profile from '../Profile';
import UserActions from '../../actions/UserActions';

class User extends React.Component {

    constructor(props) {
        super(props);
    }

    like() {
        UserActions.likeUser(this.props.account,
                             this.props.params.userId);
    }

    pass() {
        UserActions.passUser(this.props.account,
                             this.props.params.userId);
    }

    render() {

        var userId = this.props.params.userId;
        var user = _.first(_.filter(this.props.users, (user) => {
            return user._id === userId;
        }));

        if (_.isUndefined(user)) {
            this.context.router.transitionTo(`/users`);
            return <div></div>;
        }

        return (
                <Profile
                    like={this.like.bind(this)}
                    pass={this.pass.bind(this)}
                    user={user} />
        );
    }
}

User.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(User);
