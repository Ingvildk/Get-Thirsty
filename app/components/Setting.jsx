import _ from 'lodash';

import React from 'react';
import Radium from 'radium';
import mui from 'material-ui';
import View from 'react-flexbox';


import AccountActions from '../actions/AccountActions';

var {FlatButton, RaisedButton, TextField, Slider, Checkbox, DropDownMenu} = mui;

var menuItems = _.map(_.range(18, 60), (age) => {
            return {payload: age, text: age};
        });



class Setting extends React.Component {


    state = { bio: this.props.user.profile.bio,
              age_filter_max: this.props.user.profile.age_filter_max,
              age_filter_min: this.props.user.profile.age_filter_min,
              interested_in: this.props.user.profile.interested_in,
              lon: this.props.user.profile.pos.lon,
              lat: this.props.user.profile.pos.lat,
              men: _.contains(this.props.user.profile.interested_in, 0),
              women: _.contains(this.props.user.profile.interested_in, 1),
              distance_filter: this.props.user.profile.distance_filter,
              discoverable: this.props.user.profile.discoverable};

    componentWillReceiveProps(props) {
        this.setState({
              bio: props.user.profile.bio,
              age_filter_max: props.user.profile.age_filter_max,
              age_filter_min: props.user.profile.age_filter_min,
              interested_in: props.user.profile.interested_in,
              lon: props.user.profile.pos.lon,
              lat: props.user.profile.pos.lat,
              distance_filter: props.user.profile.distance_filter,
              discoverable: props.user.profile.discoverable
        });
    }

	discoverHandler(e, checked) {
        this.setState({discoverable: checked});
	}

    onMen(e, checked) {
        this.setState({men: checked});
	}

    onWomen(e, checked) {
        this.setState({women: checked});
	}


    onChangeMaxAge(e) {
        this.setState({age_filter_max: e.currentTarget.valueAsNumber });
    }

    onChangeMinAge(e) {
        this.setState({age_filter_min: e.currentTarget.valueAsNumber });
    }

    changeBio(e) {
        this.setState({bio: e.currentTarget.value});

    }

    changeLon(e) {
        this.setState({lon: e.currentTarget.value});

    }

    changeLat(e) {
        this.setState({lat: e.currentTarget.value});

    }

    changeDistance(e) {
        this.setState({distance_filter: e.currentTarget.valueAsNumber });
    }



    update() {
        var data = this.state;
        data.pos = {lat: this.state.lat,
                    lon: this.state.lon};

        if (this.state.men && this.state.women) {
            data.gender_filter = -1;
        } else {
            if (this.state.men) {
                data.gender_filter = 0;
            } else {
                data.gender_filter = 1;
            }
        }


       AccountActions.updateProfile(this.props.user, data);
    }



	render() {

        if (_.isUndefined(this.props.user)) {
            return <div/>;
        } else {

            return (
                    <div style={[{marginTop: "20px"}]}>
                        <div className="row">
                            <div className="col-lg-2 col-xs-2 col-sm-2">
                                <input
                                    ref="lat"
                                    style={[{width: "80px"}]}
                                    placeholder="lat"
                                    onChange={this.changeLat.bind(this)}
                                    value={this.state.lat}
                                    id="lat"
                                />
                            </div>
                            <div className="col-lg-2 col-xs-2 col-sm-2">
                                <input
                                    ref="lon"
                                    style={[{marginLeft: "5px", width: "80px"}]}
                                    placeholder="lon"
                                    onChange={this.changeLon.bind(this)}
                                    value={this.state.lon}
                                    id="lon"
                                />
                            </div>

                        </div>

                        <div style={[{marginTop: "5x"}]} className="row">
                            <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                                <label>Minimum Age ({this.state.age_filter_min})</label>
                                <input
                                    value={this.state.age_filter_min}
                                    onChange={this.onChangeMinAge.bind(this)}
                                    name="minAge"
                                    type="range"
                                    step="1"
                                    min="18"
                                    max="80"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                                <label>Maximum Age ({this.state.age_filter_max})</label>
                                <input
                                    onChange={this.onChangeMaxAge.bind(this)}
                                    value={this.state.age_filter_max}
                                    type="range"
                                    step="1"
                                    min="18"
                                    max="80"/>
                            </div>
                        </div>

                        <div style={[{marginTop: "20px"}]} className="row">
                            <div className="col-lg-2 col-sm-2 col-xs-2 col-md-2">
                                <Checkbox
                                    onCheck={this.onMen.bind(this)}
                                    defaultChecked={this.state.men}
                                    ref="genderMen"
                                    label="Men" />
                            </div>
                            <div className="col-lg-2 col-sm-2 col-xs-2 col-md-2">
                                <Checkbox
                                    onCheck={this.onWomen.bind(this)}
                                    defaultChecked={this.state.women}
                                    ref="genderFemale"
                                    label="Women" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                                <label>Distance filter ({this.state.distance_filter})</label>
                                <input
                                    onChange={this.changeDistance.bind(this)}
                                    value={this.state.distance_filter}
                                    type="range"
                                    step="1"
                                    min="1"
                                    max="99"/>
                            </div>
                        </div>
                        <div style={[{marginTop: "10px"}]} className="row">
                            <div className="col-lg-4 col-sm-4 col-xs-4 col-md-4">
                                <textarea
                                    style={[{resize: "None"}]}
                                    rows="10"
                                    cols="40"
                                    name="description"
                                    placeholder="description"
                                    onChange={this.changeBio.bind(this)}
                                    value={this.state.bio}/>
                            </div>
                        </div>

                        <div className="row">
                               <div className="col-lg-6 col-sm-6">
                                    <Checkbox
                                        onCheck={this.discoverHandler.bind(this)}
                                        name="CheckboxName1"
                                        value="discovered"
                                        defaultChecked={this.state.discoverable}
                                        ref="discovered"
                                        label="Discoverable"/>
                               </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-offset-4">
                                <RaisedButton
                                    onClick={this.update.bind(this)}
                                    label="Update"
                                    primary={true} />
                            </div>

                        </div>




                    </div>


            );
        }

	}
}
export default Radium(Setting);
