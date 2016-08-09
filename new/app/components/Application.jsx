import React from 'react';
import Router from 'react-router';
import {RouteHandler} from 'react-router';
import Radium from 'radium';

import fs from 'fs';
import mui from 'material-ui';
import View from "react-flexbox";

import Sidebar from './Sidebar';
import Login from './Login';

import AccountStore from '../stores/AccountStore';
import Adds from './Adds';
import Footer from './Footer';

import Notification from './Notification';

const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');


var {Snackbar, RaisedButton} = mui;
var Colors = mui.Styles.Colors;


import './test.css';

class App extends React.Component {


    state = {
        muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    }
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AccountStore.listen(this.onChange);
    }

    getChildContext() {
        return { muiTheme: this.state.muiTheme,
                          };
    }




    componentWillMount() {
        this.setState(AccountStore.getState());
        this.setState({autoHideDuration: 3000});
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    componentWillUnmount() {
    }

    render() {


        return (
                <View column>
                    <main className="HolyGrail-body">
                        <article className="HolyGrail-content">
                              <RouteHandler
                                 {...this.props}
                                 accounts={this.state.accounts}/>
                        </article>

                        <nav className="HolyGrail-nav">
                            <Sidebar />
                        </nav>
                        <Notification />
                    </main>
                </View>
            );
    }
}

App.childContextTypes = {muiTheme: React.PropTypes.object,};


export default Radium(App);
