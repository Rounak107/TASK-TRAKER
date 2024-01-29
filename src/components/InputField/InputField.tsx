import React, { useRef, useState } from "react";
import "./InputField.css";

interface Props {
  handleAdd: (e: React.FormEvent, taskText: string) => void;
}

const InputField: React.FC<Props> = ({ handleAdd }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e, inputValue);
        setInputValue("");
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task..."
        className="box input__box"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="submit input__submit"
        type="submit"
        disabled={inputValue.length === 0}
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
