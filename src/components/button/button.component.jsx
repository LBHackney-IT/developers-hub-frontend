import React from "react";

const Button = ({ variant, ...props}) => {
  const pickButton = (variant) => {
    const BUTTON_TYPES = {
      primary: "govuk-button lbh-button",
      secondary: "govuk-button govuk-secondary lbh-button lbh-button--secondary"
    };

    if (!variant) return BUTTON_TYPES.primary;
    else return BUTTON_TYPES[variant];
  };

  return (
    <button
      className={pickButton(variant)}
      {...props}
      >{props.children}</button>
  );
};

export default Button;
