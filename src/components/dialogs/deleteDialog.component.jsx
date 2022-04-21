import React, { useState } from "react"
import axios from "axios";

import Dialog from "./dialog.component"
import Announcement from '../announcement/announcement.component';
import apiUrl from '../../pages/apiInformation/apiInformation.page.jsx';

const DeleteDialog = ({onDelete, applicationName}) => {
    const [open, setOpen] = useState(false)

    const onConfirmDelete = () => {
        axios.delete(`${apiUrl}/${applicationName}`);

        const announcement = <Announcement title="Deletion successful!">
            You have successfully removed <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.
        </Announcement>

        onDelete(applicationName, announcement);
        setOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="lbh-link lbh-link--no-visited-state delete-link"
            >
                Delete<span className="govuk-visually-hidden"> application</span>
            </button>

            <Dialog
                title="Are you sure?"
                isOpen={open}
                onDismiss={() => setOpen(false)}
            >
                <p className="lbh-body">
                    You are about to permanently remove <b className='lbh-body lbh-!-font-weight-bold'>{applicationName}</b> from this API.<br/>
                </p>
                <div className="lbh-dialog__actions">
                    <button
                        onClick={onConfirmDelete}
                        className="govuk-button lbh-button"
                    >
                        Yes, remove
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="lbh-link lbh-link--no-visited-state"
                    >
                        No, cancel
                    </button>
                </div>
            </Dialog>
        </>
    )
}

export default DeleteDialog
