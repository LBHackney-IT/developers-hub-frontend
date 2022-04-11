import React from 'react';

export default function CancelButton() {
    
  const cancelButtonStyle = {
    marginLeft: '35%'
  }
  
  return (
      <button style={cancelButtonStyle} class="govuk-button govuk-secondary lbh-button lbh-button--secondary" data-module="govuk-button">
        Cancel
      </button> 
    )
}