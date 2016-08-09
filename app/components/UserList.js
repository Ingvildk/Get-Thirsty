import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import mui from 'material-ui';
import _ from 'lodash';
import View from 'react-flexbox';

import s from 'underscore.string';

var {Link} = Router;
var {FlatButton} = mui;

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var ContentSend = require('material-ui/lib/svg-icons/content/inbox');
var Colors = mui.Styles.Colors;

let styles = {
    list: {
        overflowY: "auto",
        height: "65vh",
        minHeight: "65vh",
        maxHeight: "65vh"
    }
};

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }

    componentWillMount() {
    }

    click(userId) {
        this.context.router.transitionTo(`/users/${userId}`);
    }

    render() {
        var users = this.props.users;
        var filterText = this.props.filter;


        if (_.isEmpty(users)) {
            return (
                <p> No new users </p>
            );
        }

        users = _.filter(users, (user) => {

            if (_.isUndefined(filterText) || _.isEmpty(filterText)) {
                return true;
            }

            return s(user.bio).decapitalize().contains(filterText.toLowerCase());

        });

        var that = this;
        var currentYear = moment(new Date()).year();
        var items = _.uniq(_.filter(users, (user) => {
            return !_.isNull(user)
        }), (user) => {
            return user._id;
        }).map(function(user, i) {
            var age = currentYear - moment(user.birth_date).year();
            return (
                <div key={user._id} className="MaxUserList">
                    <ListItem
                            leftAvatar={
                                <Avatar src={user.photos[0].url} />
                            }
                            primaryText={
                                <div>
                                    <div>
                                        {user.name}, {age}
                                    </div>
                                    <div>
                                        {user.distance_mi} miles away, last active: {moment(user.ping_time).fromNow()}
                                    </div>

                                </div>
                            }
                            onClick={that.click.bind(that, user._id)}
                            secondaryText={
                                <div>
                                    <span style={{color: Colors.darkBlack}}>{user.bio}</span><br/>
                                </div>
                            }
                            secondaryTextLines={2}
                        />
                </div>
            );
        });

        return (
            <View column>
                <View row>
                    <List subheader="New recommendations">
                        <div style={[styles.list]}>
                            {items}
                        </div>
                    </List>
                </View>
                <View row>
                    <View column>
                        <FlatButton onClick={this.props.clear.bind(this)} label="Clear All" primary={true} />
                    </View>
                     <View column>
                        <FlatButton
                            onClick={this.props.like}
                            label="Pass All"
                            primary={true} />
                    </View>
                    <View column>
                        <FlatButton
                            onClick={this.props.like}
                            label="Like All"
                            primary={true} />
                    </View>
                </View>
            </View>
        );
    }
}
UserList.contextTypes = {router: React.PropTypes.func.isRequired}
export default Radium(UserList);
