import React from 'react';

class InputFilter extends React.Component {
  static get propTypes() {
    return {
      handleFilter: React.PropTypes.func.isRequired
    }
  }
  onInput(e) {
    this.props.handleFilter(e.target.value);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={this.onInput.bind(this)}
        />
      </div>
    )
  }
}

export default InputFilter;
