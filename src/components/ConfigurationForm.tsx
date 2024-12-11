import React from "react";

interface Props {
  inputFields: string[];
  onChange: (index: number, value: string) => void;
}

const ConfigurationForm = ({ inputFields, onChange }: Props) => {
  return (
    <div>
      <h2 className="text-center mb-4">Configuration Form</h2>
      {inputFields.map((field, index) => (
        <div className="form-floating mb-3" key={index}>
          <input
            type="text"
            className="form-control"
            id={`input-${index}`}
            placeholder={field}
            onChange={(e) => onChange(index, e.target.value)} // Call onChange with index and value
          />
          <label htmlFor={`input-${index}`}>{field}</label>
        </div>
      ))}
    </div>
  );
};

export default ConfigurationForm;
