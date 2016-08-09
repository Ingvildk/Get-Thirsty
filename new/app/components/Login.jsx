import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import _ from 'lodash';
import View from 'react-flexbox';
import Facebook from './Facebook';


import AccountActions from '../actions/AccountActions';
import AccountStore from '../stores/AccountStore';


let {TextField, Dialog, RaisedButton} = mui;
let styles = {
};

class Login extends React.Component {

    //state = {email: 'marydooleyance@gmail.com',
    //         pass: 'xeng7aoHe'};
    //
    //
    //state = {email: "wayneeasteena@gmail.com",
    //         pass: "ajiNoh5yee"}
    //
    //
    //state = {email: "ruthusegura@gmail.com",
    //         pass: "Oot9eichahc"}
    //
    //
//    state = {email: "DurvaAsok453@hotmail.com",
//             pass:  "DrishtiAsis456@hotmail.com"};
//

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillMount() {
    }

    onSubmit(e) {
        e.preventDefault();
        this.refs.standardDialog.show();
    }

    componentWillReceiveProps(newProps) {

        let dialog = this.refs.standardDialog;

        if (!newProps.loading && dialog.state.open) {
            dialog.dismiss();
        }
    }

    validateForm() {
    }

    handleChange(e) {

        // http://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        var value = event.target.value;
        this.setState({ [event.target.id]: event.target.value });
        //var result = t.validate(value, t.Str);

        //var error = result.firstError();
        //if (! _.isNull(error)) {
        //    console.log(error);
        //    this.setState({errors:
        //                  {[event.target.id]: {errorText: error.message}
        //    }});
        //}

    }

    _onDialogSubmit() {
        AccountActions.create({email: this.state.email,
                               pass: this.state.pass})
    }

    render() {


        let standardActions = [
            { text: 'Cancel'}
        ];

        return (
            <div>
                <form
                    onSubmit={this.onSubmit.bind(this)}>
                        <input
                            onChange={this.handleChange.bind(this)}
                            style={[{marginLeft: "2px"}]}
                            value={this.state.email}
                            ref="email"
                            id="email"
                            placeholder="email"
                        />
                        <input
                            ref="pass"
                            style={[{marginLeft: "2px"}]}
                            onChange={this.handleChange.bind(this)}
                            placeholder="password"
                            value={this.state.pass}
                            id="pass"
                            type="password"
                        />
                        <button
                            style={[{marginLeft: "2px"}]}
                            onClick={this.onSubmit.bind(this)}
                            label="Login"
                            primary={true}>
                            Add
                        </button>
                </form>
                <Dialog
                    ref="standardDialog"
                    title="Dialog Add new account"
                    actions={standardActions}
                    actionFocus="submit"
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}>
                    <Facebook
                        email={this.state.email}
                        password={this.state.pass}/>
              </Dialog>
            </div>

        );
    }
}

export default Radium(Login);
