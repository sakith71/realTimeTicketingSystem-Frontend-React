import React from "react";

interface Props {
  inputFields: string[];
  onChange: (index: number, value: string) => void;
  errors: string[];
}

const ConfigurationForm = ({ inputFields, onChange, errors }: Props) => {
  return (
    <div>
      <h2 className="text-center mb-4">Configuration Form</h2>
      {inputFields.map((field, index) => (
        <div className="form-floating mb-3" key={index}>
          <input
            type="text"
            className={`form-control ${errors[index] ? "is-invalid" : ""}`}
            id={`input-${index}`}
            placeholder={field}
            onChange={(e) => onChange(index, e.target.value)}
          />
          <label htmlFor={`input-${index}`}>{field}</label>
          {errors[index] && (
            <div className="invalid-feedback">{errors[index]}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConfigurationForm;
