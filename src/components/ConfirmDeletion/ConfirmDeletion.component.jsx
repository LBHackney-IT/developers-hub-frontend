import React, {useState} from 'react';
import Announcement from '../announcement/announcment.component';
import CancelButton from '../CancelButton/CancelButton.component';
import DeletionMessage from '../DeletionMessage/DeletionMessage.component';
import SaveButton from '../SaveButton/SaveButton.component';

export default function ConfirmDeletion() {
    const [isDeleted, setIsDeleted] = useState(false);
    
    const onConfirmDelete = () => {
        // api call
        setIsDeleted(true)
    }
    
    // Create button with onclick here
    const confirmDeleteButton = (
        <button>
            dfkjdkdjikjf
        </button>
    )

    if(isDeleted){
        return(
            <Announcement
            category={""}
            title={"successful message here"}
            >
                {/* Add custom content here */}
            </Announcement>
        )
    } else {
        return(
            <Announcement
            category={"warning"}
            title={"delete message here"}
            buttons={[confirmDeleteButton]}
            >
                {/* Add custom content here */}
            </Announcement>
        )
    }

    // return(
    //     <div>
    //         <DeletionMessage />
    //         <div>
    //             <CancelButton onclick={onclick}/>
    //             <SaveButton />
    //         </div>
    //     </div>
    // )
}