import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import moment from 'moment';
import View from 'react-flexbox';
import TimeAgo from './TimeAgo';

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var Colors = mui.Styles.Colors;

class Message extends React.Component {

    render() {

        var melding = this.props.message;

        var age = moment(melding.sent_date).fromNow();

        var person = this.props.person;
        var otherUserId = person.person._id;

        if (melding.from != otherUserId) {
            var _class = 'messageText';
            var super_class = 'bubble';
            var matchPhoto = "";
        } else {
            var _class = 'rightText';
            var super_class='bubble_alternative';
            var matchPhoto =
                <Avatar src={person.person.photos[0].url} />;
        }
        return (
                <div key={melding._id}  className={_class}>
                    <div className='rightImage'>
                        <div className ='chat'>
                            <View row>
                                <View column>
                                    {matchPhoto}
                                </View>
                                <View column>
                                    <p style={[{fontSize: "80%"}]}
                                       className={super_class}>
                                        {melding.message}
                                    </p>
                                </View>
                                <View column>
                                    <p style={[{fontSize: "60%"}]}>
                                        <TimeAgo interval={5000} time={melding.sent_date} />
                                    </p>
                                </View>
                            </View>
                        </div>
                    </div>
                </div>
        );

    }
}

export default Radium(Message);
