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
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};
export default InputFilter;
