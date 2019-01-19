import React from "react";

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const InputFilter = (props: Props) => {
  return (
    <div>
      <input
        className={props.className}
        type="text"
        placeholder="input text for filtering"
        value={props.value}
        onChange={e => {
          const { value } = e.target;
          props.onChange(value);
        }}
      />
    </div>
  );
};
export default InputFilter;
