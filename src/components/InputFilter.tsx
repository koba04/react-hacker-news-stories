import React from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const InputFilter = (props: Props) => {
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
};
export default InputFilter;
