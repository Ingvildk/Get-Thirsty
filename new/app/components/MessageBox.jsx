import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import ChatStore from '../stores/ChatStore';
import ChatActions from '../actions/ChatActions'

var {List, MenuItem, IconMenu, Avatar, ListItem, ListDivider} = mui;
var Colors = mui.Styles.Colors;

let styles = {
    list: {
        overflowY: "auto",
        height: "550px"
    }
};



class MessageBox extends React.Component {


    state = {message: ''}


    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange(e) {
        // http://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        var value = event.target.value;
        this.setState({ [event.target.id]: event.target.value });
    }

    handleKeyDown(e) {
        let ENTER = 13;
        if(e.which == ENTER) {
            this.onSubmit();
        }
    }

    onSubmit() {
        var message = this.state.message;
        this.setState({message: ''});
        this.props.submit(message)
    }

    render() {
      return (
        <div style={[{marginRight: "5px"}]}
                     className="InputAddOn">
                    <input
                        placeholder= 'Type in message '
                        type='text'
                        id="message"
                        ref="message"
                        value={this.state.message}
                        onKeyDown={this.handleKeyDown.bind(this)}
                        onChange={this.handleChange.bind(this)}
                        className="InputAddOn-field"/>
                    <button
                        onClick={this.onSubmit}
                        className="InputAddOn-item">
                        Send
                    </button>
                </div>
        );
    }

}

export default Radium(MessageBox);
