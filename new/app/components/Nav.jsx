import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';

var {FlatButton, Toolbar, ToolbarGroup,
    ToolbarSeparator,
    DropDownMenu,
    ToggleStarBorder, DropDownIcon,
    ToolbarTitle, FontIcon, RaisedButton,
    TextField, Checkbox, Slider} = mui;


class Nav extends React.Component {


    render() {
        return (
            <Toolbar style={{background: "white"}}>
                <ToolbarGroup key={0} float="left">
                    <FlatButton
                        onClick={this.props.clear.bind(this)}
                        label="Clear All"
                        primary={true} />
                    <FlatButton
                        onClick={this.props.like.bind(this)}
                        label="Like All"
                        primary={true} />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

export default Nav;
