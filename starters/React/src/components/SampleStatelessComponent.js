import React from 'react';

const SampleStatelessComponent = ({ num, onClick }) => (
    <div>
        Num: {num}
        <button
            class="btn btn-primary"
            onClick={onClick}>
            +
        </button>
    </div>
);

SampleStatelessComponent.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default SampleStatelessComponent;
