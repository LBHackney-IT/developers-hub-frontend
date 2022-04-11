import {React, useState} from 'react';

export default function SaveButton() {
    
  const saveButtonStyle = {
    marginLeft: '2%'
  } 

  const [isDeleted, setIsDeleted] = useState(true);

  return (

      <button onClick={() => setIsDeleted(isDeleted)} style={saveButtonStyle} class="govuk-button lbh-button" data-module="govuk-button">
        Save
      </button> 
      
    )
}