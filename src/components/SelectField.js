import React from 'react';

const SelectField = ({ id, label, value, onChange, options, error, disabled }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}<span className="text-danger">*</span>
    </label>
    <select
      className={`form-select ${error ? 'is-invalid' : ''}`}
      id={id}
      value={value} // Ensure the value matches the expected type (index or option)
      onChange={onChange}
      disabled={disabled}
    >
      <option value="">Seleccione {label.toLowerCase()}</option>
      {options.map((option, index) => (
        <option key={index} value={id === 'userType' || id === 'userLevel' ? index : option}>
          {option}
        </option>
      ))}
    </select>
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default SelectField;