import 'babel/polyfill';

import AccountStore from './stores/AccountStore';
import AccountActions from './actions/AccountActions';


import React from 'react';


export default class Test extends React.Component {


    constructor(props) {
        super();
        this.state = AccountStore.getState();
    }

    componentDidMount() {
        AccountStore.listen(this.onChange.bind(this));
        //AccountActions.fetchListings();
    }

    onChange(state) {
        this.setState(state);
    }

    componentWillUnmount() {
        AccountStore.unlisten(this.onChange.bind(this));
    }

    click() {
        var credentials = {email: "kyrre", password: "john"}
        AccountActions.addAccount(credentials)
    }

    render() {

        console.log(this.state.accounts);
        var accounts = this.state.accounts.map(function (account) {
            return <p>{account.email}</p>
        });

        return (
            <div className="container">
                <button onClick={this.click.bind(this)}>
                    Yolo
                </button>
                {accounts}
            </div>
        );
    }
}

