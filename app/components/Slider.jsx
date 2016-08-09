import React from 'react';
import Radium from 'radium';
import View from 'react-flexbox';


class Slider extends React.Component {

    state = {currentIndex: 0}

    constructor(props) {
        super(props);
    }

    changePicture(i) {
        this.setState({currentIndex: i});
    }

    render() {


        var size = 0;
        React.Children.forEach(this.props.children, (child, i) => {
            size++;
        });

        var picture;
        React.Children.forEach(this.props.children, (child, i) => {
            if (i === this.state.currentIndex) {
                picture = child;
            }
        });


        if (this.state.currentIndex >= size) {
            this.changePicture(0);
        }


        var dots = React.Children.map(this.props.children, (child, i) => {
            var checked = i === this.state.currentIndex;

            return (
                <span style={[{marginRight: "5px"}]}>
                        <input
                            id={`carousel-item-${i}`}
                            onChange={this.changePicture.bind(this, i)}
                            checked={checked}
                            type="radio"
                            name="carousel-dots"/>
                        <label
                        onClick={this.changePicture.bind(this, i)}/>
                </span>
            );
        });

        return (
                <View column>
                    <View row
                        style={{justifyContent: 'center',
                                    alignItems: 'center'}}>
                        {picture}
                    </View>
                    <View row
                            style={{justifyContent: 'center',
                                    alignItems: 'center'}}>
                            <nav className="carousel">
                                {dots}
                            </nav>
                    </View>
                </View>
            );
    }


}

export default Radium(Slider);

