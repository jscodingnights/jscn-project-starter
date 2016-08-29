import { connect } from 'react-redux';
import { getTodos } from '../redux/modules/sampleModule';
import SampleStatelessComponent from '../components/SampleStatelessComponent';

const mapStateToProps = (state) => {
    return {
        num: state.num
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: dispatch(increment());
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleStatelessComponent);
