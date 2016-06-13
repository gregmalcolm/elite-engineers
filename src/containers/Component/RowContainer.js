import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/componentStockActions';
import ComponentRow from '../../components/Component/Row';

class ComponentRowContainer extends React.Component {
  constructor(props) {
    super(...arguments);
    let componentStock = props.componentStock;
    componentStock.componentName = props.component.name;
    this.props = {
      component: {},
      actions: props.actions.save,
      componentStock: componentStock
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
