import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/componentStockActions';
import ComponentRow from '../../components/Component/Row';

class ComponentRowContainer extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      component: {},
      actions: props.actions.save,
      componentStock: props.componentStock
    };
  }
  render() {
    return (
      <ComponentRow
        component={this.props.component}
        save={this.props.actions.save}
        componentStock={this.props.componentStock}
      />
    );
  }
}

ComponentRowContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  componentStock: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    componentStock: state.componentStockReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentRowContainer);
