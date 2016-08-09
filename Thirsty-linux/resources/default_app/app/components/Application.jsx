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

var Colors = mui.Styles.Colors;
var ThemeManager = new mui.Styles.ThemeManager();


//require('./tinder.css');

require('./test.css');

var styles = {
    main: {
        display: "flex",
        height: "100%",
        flexDirection: "column",
        minHeight: "80vh",
        padding: 0,
        "::after": {
            content: "none"
        }
    },
    footer: {
        flex: "none"
    },
    content: {
        flex: "1 0 auto",
        //padding: "var(--space) var(--space) 0",
        width: "100%",
        "::after": {
            content: '\00a0',
            display: "block",
            //marginTop: "var(--space)",
            height: "0px",
            visibility: "hidden"
        }
    }
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AccountStore.listen(this.onChange);
    }

    componentWillMount() {
        this.setState(AccountStore.getState());
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onChange);
    }

    onChange(state) {

        console.log("changing state");
        this.setState(state);
    }
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentWillUnmount() {
        console.log("unmounting");
    }

    storeChanged(state) {
    }

    render() {


        return (
            <div key="main" className="main" style={[styles.main]}>
                    <View row>

                        <View style={{border: "1px solid #ccc", marginTop: "0"}} column width="20%">

                            <div style={[{marginRight: "0px"}]}>
                                <Sidebar />
                            </div>

                        </View>

                        <View column style={{marginLeft: "0%"}} width="80%">

                            <main>
                                <RouteHandler {...this.props} accounts={this.state.accounts}/>
                            </main>

                        </View>

                    </View>

                <div key="footer" style={[styles.footer]}>
                    <View style={{justifyContent: "center"}}>
                        shit
                    </View>
                </div>

            </div>
        );
    }
}

App.childContextTypes = {muiTheme: React.PropTypes.object.isRequired};

export default Radium(App);
