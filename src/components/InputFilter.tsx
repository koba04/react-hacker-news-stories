import React, { useState } from "react";

interface Props {
  className?: string;
  onChange: (value: string) => void;
}

const defer = requestAnimationFrame;

const InputFilter = (props: Props) => {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <input
        className={props.className}
        type="text"
        placeholder="input text for filtering"
        value={filterText}
        onChange={e => {
          const { value } = e.target;
          setFilterText(value);
          defer(() => props.onChange(value));
        }}
      />
    </div>
  );
};
export default InputFilter;
