import React from 'react';

export default function InputFilter(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="filter"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}
InputFilter.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
