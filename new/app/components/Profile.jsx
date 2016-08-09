import _ from 'lodash';

import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import Slider from './Slider';
import Router from 'react-router';
import View from 'react-flexbox';

var { Route, DefaultRoute, RouteHandler, Link } = Router;

var {Avatar, Card, CardHeader,
     RaisedButton,
     CardMedia, CardActions, FlatButton,
     CardText, CardTitle} = mui;

var styles = {
    main: {
        minHeight: "450px",
        maxHeight: "450px"
    },
    list: {
        overflowY: "auto",
        minHeight: "50px",
        maxHeight: "50px"
    }
};

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            currentPhotoIndex: 0
        });
    }

    click(id) {
    	this.context.router.transitionTo(`/dprofile/${id}`);
    }

    render() {

        var person = this.props.user;
        var photos = _.uniq(person.photos, (photo) => {
            return photo.url;
        }).map((photo, i) => {
            return (
                <img style={[styles.main]} key={`${photo.url}`} src={photo.processedFiles[0].url}/>
            );
        });


        var slider = <Slider>
                        {photos}
                    </Slider>;



        return (
            <Card style={{boxShadow: "0px"}}>

                <CardHeader
                    title={person.name}
                    subtitle=""
                    avatar={person.photos[0].url}/>

                <CardMedia>
                    {slider}
                </CardMedia>

                <CardText style={{marginBottom: "0px"}}>
                    <div style={[styles.list]}>
                        <p>
                            {person.bio}
                        </p>
                    </div>
                </CardText>

                <View style={{
                        marginTop: "0px",
                        paddingTop: "0px",
                        justifyContent: 'center',
                               alignItems: 'center'}}>

                        <FlatButton
                             style={{marginRight: "10px"}}
                             onClick={this.props.pass}
                             primary={true}
                             label="pass"/>

                        <FlatButton
                             style={{marginRight: "10px"}}
                             onClick={this.props.pass}
                             label="full profile"/>

                        <FlatButton
                            onClick={this.props.like}
                            secondary={true}
                            label="like"/>
                </View>
            </Card>
        );
    }
}
Profile.contextTypes = {router: React.PropTypes.func.isRequired}

export default Radium(Profile);
