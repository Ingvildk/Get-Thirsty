import React from 'react';
import Radium from 'radium'
import mui from 'material-ui';
import data from '../mock/data';

var {Avatar, Card, CardHeader,
     RaisedButton,
     CardMedia, CardActions, FlatButton,
     CardText, CardTitle} = mui;

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({person: data.person});
    }

    render() {
        var person = this.state.person;
        return (
            <Card style={{boxShadow: "0px"}} className="MaxUser">
                <CardHeader
                    title={person.name}
                    subtitle="Subtitle"
                    avatar={person.photos[1].url}/>
                <CardMedia overlay={<CardTitle title="San Diego" subtitle={person.bio}/>}>
                    <img src={person.photos[0].url}/>
                </CardMedia>
                <CardActions>
                    <RaisedButton primary={true} label="pass"/>
                    <RaisedButton secondary={true} label="like"/>
                </CardActions>
            </Card>
        );
    }
}

export default Radium(Profile);
