import React, { Component } from 'react';
import SampleStatelessComponent from '../components/SampleStatelessComponent';

// Hint: DO NOT PUT UI IN THIS COMPONENT

class SampleContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0
        };

        this.onClick = this.onClick.bind(this);
    }

    increment() {
        this.setState({ num: this.state.num + 1 });
    }

    render() {
        const { num } = this.state;

        return (
            <SampleStatelessComponent
                num={num}
                onClick={increment} />
        );
    }
}

SampleStatefulComponent.propTypes = {
    startingNum: React.PropTypes.number,
};

SampleStatefulComponent.defaultProps = {
    startingNum: 0,
};

export default SampleStatefulComponent;
