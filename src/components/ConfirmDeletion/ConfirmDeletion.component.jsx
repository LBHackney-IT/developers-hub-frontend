import {React, useState} from 'react';
import Announcement from '../announcement/announcment.component';

const ConfirmDeletion = ({applicationName}) => {
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
        <button
            style={saveButtonStyle}
            onClick={onConfirmDelete} 
            className="govuk-button lbh-button" 
            data-module="govuk-button"
        >
            Save
        </button>
    )

    if(isDeleted){
        return(
            <Announcement
                category={""}
                title={"Deletion successful!"}
            >
                You have removed <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.
            </Announcement>
        )
    } else {
        return(
            <Announcement
                category={"warning"}
                title={"Warning!"}
                buttons={[confirmDeleteButton]}
            >
                You are about to permanently remove <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.<br/>
                Press ‘Save’ to confirm, otherwise press ‘Close message’ to cancel. 
            </Announcement>
        )
    }
}

export default ConfirmDeletion;