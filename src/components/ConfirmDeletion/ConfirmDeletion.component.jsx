import {React, useState} from 'react';
import Announcement from '../announcement/announcment.component';

export default function ConfirmDeletion(props) {
    
    const applicationName = props.applicationName

    const [isDeleted, setIsDeleted] = useState(false);
    
    const onConfirmDelete = () => {
        // api call
        setIsDeleted(true)
    }

    const saveButtonStyle = {
        marginLeft: '1%',
        marginRight: '5%'
      }
    
    const confirmDeleteButton = (
        <button style={saveButtonStyle} onClick={onConfirmDelete} class="govuk-button lbh-button" data-module="govuk-button">
            Save
        </button>
    )

    if(isDeleted){
        return(
            <Announcement
            category={""}
            title={"Deletion successful!"}
            >
            You have removed {applicationName[0][0]}.
            </Announcement>
        )
    } else {
        return(
            <Announcement
            category={"warning"}
            title={"Warning!"}
            buttons={[confirmDeleteButton]}
            >
            {/* amend so that application name is rendered properly */}
            You are about to permanently delete {applicationName.map(application => application[0])}. Press ‘Save’ to confirm, otherwise press ‘Close message’ to cancel. 
            </Announcement>
        )
    }
}