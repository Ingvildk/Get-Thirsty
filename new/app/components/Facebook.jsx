import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import _ from 'lodash';
import View from 'react-flexbox';
import ipc from 'ipc';
import AccountActions from '../actions/AccountActions';


export default class Facebook extends React.Component {

    componentDidMount() {
        ipc.send('delete-cookies');
        let webview = document.querySelector('webview');
        webview.src = "https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=basic_info,email,public_profile,user_about_me,user_activities,user_birthday,user_education_history,user_friends,user_interests,user_likes,user_location,user_photos,user_relationship_details&response_type=token";


        AccountActions.create({email: this.props.email,
                               pass: this.props.password})
    }

    render() {
        return (
            <webview
                preload="./com.js"
                style={{display: "inline-block",
                        width: "800px",
                        height:"600px"}}
                />
        );
    }
}

