import React from 'react';
import CancelButton from '../CancelButton/CancelButton.component';
import DeletionMessage from '../DeletionMessage/DeletionMessage.component';
import SaveButton from '../SaveButton/SaveButton.component';

export default function ConfirmDeletion() {
    
    return(
        <div>
            <DeletionMessage />
            <div>
                <CancelButton />
                <SaveButton />
            </div>
        </div>
    )
}