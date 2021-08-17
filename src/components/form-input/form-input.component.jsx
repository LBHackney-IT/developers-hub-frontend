import React from "react";

const FormInput = ({ label, ...props }) => {
  return (
    <div className="govuk-form-group lbh-form-group">
      <label className="govuk-label lbh-label" for={props.id}>
        {label}
      </label>
      <input
        className="govuk-input lbh-input"
        {...props}
      />
    </div>
  );
};

export default FormInput;
