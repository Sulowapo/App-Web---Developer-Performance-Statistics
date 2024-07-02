import React from 'react';

const TextField = ({ id, label, value, onChange, error, type = 'text' }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}<span className="text-danger">*</span>
    </label>
    <input
      type={type}
      className={`form-control ${error ? 'is-invalid' : ''}`}
      id={id}
      value={value}
      onChange={onChange}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default TextField;