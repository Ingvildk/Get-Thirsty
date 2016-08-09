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


var {Snackbar, RaisedButton} = mui;
var Colors = mui.Styles.Colors;
var ThemeManager = new mui.Styles.ThemeManager();


import './test.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.getChildContext = this.getChildContext.bind(this);
    }

    componentDidMount() {
        AccountStore.listen(this.onChange);
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

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillUnmount() {
    }

    render() {


        return (
                <View column>
                     <header className="HolyGrail-header">
                        <div className="Header Header--cozy" role="banner">
                        </div>
                    </header>
                    <main className="HolyGrail-body">

                        <article className="HolyGrail-content">
                              <RouteHandler
                                 {...this.props}
                                 accounts={this.state.accounts}/>
                        </article>

                        <nav
                            className="HolyGrail-nav">
                            <Sidebar />
                        </nav>

                         <aside className="HolyGrail-ads u-textCenter">
                            <Adds/>
                        </aside>
                    </main>
                    <footer className="HolyGrail-footer">
                        <div className="Footer">
                            <Footer />
                            <Notification />
                        </div>
                    </footer>
                </View>
            );
    }
}

App.childContextTypes = {muiTheme: React.PropTypes.object.isRequired};

export default Radium(App);
