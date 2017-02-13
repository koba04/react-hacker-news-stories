import React from 'react';

export default function InputFilter(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        onChange={e => props.handleFilter(e.target.value)}
      />
    </div>
  );
}
InputFilter.propTypes = {
  handleFilter: React.PropTypes.func.isRequired,
};
