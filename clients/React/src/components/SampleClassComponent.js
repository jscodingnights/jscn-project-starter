import React, { Component } from 'react';

// Hint: Avoid using stateful components for presentation as much as possible.
// The only time they're useful (when using redux) is to store state that is
// nonsensical to the rest of the application (e.g. text input values before
// submit).

class SampleClassComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num: 0
        };

        this.increment = this.increment.bind(this);
    }

    /* Lifecycle Methods: https://facebook.github.io/react/docs/component-specs.html */

    componentDidMount() {
        setInterval(() => this.increment(), 1000);
    }

    /* Click handlers and custom methods */

    increment() {
        this.setState({ num: this.state.num + 1 });
    }

    /* Rendering */

    render() {
        const { num } = this.state;

        return (
            <div>
                Num: {num} <button className="btn btn-primary" onClick={this.increment}>+</button>
            </div>
        );
    }
}

SampleClassComponent.propTypes = {};

export default SampleClassComponent;
