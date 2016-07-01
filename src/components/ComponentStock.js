import React, { PropType } from 'react';

class ComponentStock extends React.Component {
  constructor(props) {
    super(props);

    this.state = { stock: 0 };
  }

  handleStockChange(e) {
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
};

export default ComponentStock;
