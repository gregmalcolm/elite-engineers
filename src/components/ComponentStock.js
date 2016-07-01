import React, { PropTypes } from 'react';

class ComponentStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: (localStorage[props.componentId] || 0)
    };
  }

  handleStockChange(e) {
    localStorage[this.props.componentId] = e.target.value;
    this.setState({stock: e.target.value});
  }

  render() {
    return (
      <input className="form-control"
             value={this.state.stock}
             onChange={this.handleStockChange.bind(this)}
      />
    );
  }
}

ComponentStock.propTypes = {
  componentId: PropTypes.string.isRequired
};

export default ComponentStock;
