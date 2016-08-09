import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import Router from 'react-router';
import mui from 'material-ui';
import moment from 'moment';

var {Link} = Router;

var {RaisedButton, List, MenuItem, IconMenu, Menu,
     FlatButton,
     IconMenu, IconButton, Avatar, ListItem,
     ListDivider} = mui;

var ContentSend = require('material-ui/lib/svg-icons/content/inbox');
var Colors = mui.Styles.Colors;

let MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');

let styles = {
    list: {
        overflowY: "auto",
        height: "55vh",
        minHeight: "55vh",
        maxHeight: "55vh"
    }
};

class AccountList extends React.Component {

    state = {loading: false};

    constructor(props) {
        super(props);
    }

    click(email) {
        this.context.router.transitionTo(`/settings/${email}`);
    }


    choose(user) {
        this.props.choose(user);
    }

    delete(user) {
        this.props.delete(user);
    }

    render() {

            let iconButtonElement = (
                <IconButton
                    touch={true}
                    tooltip="actions"
                    tooltipPosition="bottom-left">
                    <MoreVertIcon color={Colors.grey400} />
                </IconButton>
            );


            var users = this.props.users;

            if (_.isEmpty(users)) {
                return (
                    <p> You have no accounts! </p>
                );
            }

            var that = this;
            var items = _.map(users, (user) => {
                var profile = user.profile;
                var photo = _.first(profile.photos);
                var birth_date = moment(profile.birth_date).format('MMMM Do YYYY');

                let rightIconMenu = (
                    <IconMenu
                        iconButtonElement={iconButtonElement}>
                        <MenuItem index={1}>
                            <FlatButton
                                onClick={this.choose.bind(this, user)}
                                >Use</FlatButton>
                        </MenuItem>
                        <MenuItem index={2}>
                            <FlatButton
                                onClick={this.delete.bind(this, user)}
                            >Delete</FlatButton>
                        </MenuItem>
                    </IconMenu>
                );



                var item;
                if (!user.profile.banned) {
                    item = <ListItem
                                primaryText={profile.name}
                                rightIconButton={rightIconMenu}
                                secondaryTextLines={1}
                                secondaryText={birth_date}
                                onClick={that.click.bind(that, user.email)}
                                leftAvatar={<Avatar src={photo.url}/>}
                            />;
                } else {
                    item = <ListItem
                                primaryText={profile.name}
                                rightIconButton={rightIconMenu}
                                secondaryTextLines={2}
                                secondaryText={
                                    (
                                        <div>
                                            {birth_date}
                                            <span style={{color: "red"}}> (BANNED / INACTIVE) </span>
                                        </div>
                                    )
                                }
                                onClick={() => {}}
                                leftAvatar={<Avatar src={photo.url}/>}
                            />;
                }
                return (
                    <div key={user.email}>
                        {item}
                    </div>
                );
            });

            return (
                <List>
                    <div style={[styles.list]}>
                        {items}
                    </div>
                </List>
            );

        }
}
AccountList.contextTypes = {router: React.PropTypes.func.isRequired}
export default Radium(AccountList);
